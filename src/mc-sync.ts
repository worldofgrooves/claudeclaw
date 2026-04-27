/**
 * MC Sync -- Automatic synchronisation between Telegram conversations and Mission Control.
 *
 * When Denver messages an agent directly via Telegram (bypassing the MC scheduler),
 * this module ensures that:
 *
 * 1. If the message references an existing MC task, that task is auto-updated to in_progress.
 * 2. Every agent response is logged to the shared HiveMind activity_log.
 * 3. If no MC task was referenced, a lightweight activity record is created in MC
 *    so the work is visible on the dashboard.
 *
 * Called from bot.ts handleMessage() at two hook points: pre-agent and post-agent.
 */

import Database from 'better-sqlite3';
import path from 'path';

import { AGENT_ID } from './config.js';
import { readEnvFile } from './env.js';

const _env = readEnvFile(['SUPABASE_URL', 'SUPABASE_ANON_KEY']);
const SUPABASE_URL = process.env.SUPABASE_URL || _env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || _env.SUPABASE_ANON_KEY || '';
import { logToHiveMind } from './db.js';
import { logger } from './logger.js';

// ── ClaudeClaw agent ID -> MC agent name ────────────────────────────
// Only entries where the IDs differ between systems.
const CLAW_TO_MC_NAME: Record<string, string> = {
  'nick-fury': 'fury',
  'happy-hogan': 'happy',
  'jean-grey': 'jean',
  'black-widow': 'natasha',
};

// ── Agent department map (for auto-created activity tasks) ──────────
const AGENT_DEPARTMENT: Record<string, string> = {
  jarvis: 'build',
  'tony-stark': 'build',
  vision: 'build',
  wanda: 'seo',
  'nick-fury': 'research',
  'jean-grey': 'content',
  'peter-parker': 'creative',
  loki: 'marketing',
  pepper: 'accounts',
  'black-widow': 'operations',
};

// ── Shared HiveMind database ────────────────────────────────────────
// This is the cross-agent HiveMind DB that all agents and Janet read.
// Separate from ClaudeClaw's internal hive_mind table in claudeclaw.db.
const HIVEMIND_DB_PATH = path.resolve(
  process.env.HOME || '/tmp',
  'Documents/Dev/SynologyDrive/Dev/Workspace/janet/hivemind/hivemind.db',
);

let hivemindDb: Database.Database | null = null;

function getHiveMindDb(): Database.Database | null {
  if (hivemindDb) return hivemindDb;
  try {
    hivemindDb = new Database(HIVEMIND_DB_PATH);
    hivemindDb.pragma('journal_mode = WAL');
    return hivemindDb;
  } catch (err) {
    logger.warn({ err, path: HIVEMIND_DB_PATH }, 'mc-sync: could not open shared HiveMind DB');
    return null;
  }
}

// ── MC agent UUID cache ─────────────────────────────────────────────
// Maps MC agent name -> Supabase UUID. Lazily populated.
let agentUUIDCache: Map<string, string> | null = null;

async function fetchAgentUUIDs(): Promise<Map<string, string>> {
  if (agentUUIDCache) return agentUUIDCache;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return new Map();

  try {
    const url = `${SUPABASE_URL}/rest/v1/mc_agents?select=id,name`;
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const agents = (await res.json()) as Array<{ id: string; name: string }>;
    agentUUIDCache = new Map(agents.map((a) => [a.name, a.id]));
    return agentUUIDCache;
  } catch (err) {
    logger.warn({ err }, 'mc-sync: failed to fetch agent UUIDs');
    return new Map();
  }
}

function getMCName(clawId: string): string {
  return CLAW_TO_MC_NAME[clawId] ?? clawId;
}

// ── Public API ──────────────────────────────────────────────────────

/**
 * Extract MC task number from a user message.
 * Matches: "task #275", "Task 275", "#275", "task-275", "MC-275", "MC #275"
 */
export function extractMCTaskRef(message: string): number | null {
  const patterns = [
    /\btask\s*#?\s*(\d+)\b/i,
    /\bMC[-\s]*#?\s*(\d+)\b/i,
    /(?:^|\s)#(\d+)\b/,
  ];
  for (const pat of patterns) {
    const match = message.match(pat);
    if (match) {
      const num = parseInt(match[1], 10);
      // Sanity: task numbers are positive and unlikely to exceed 10000 in near term
      if (num > 0 && num < 100000) return num;
    }
  }
  return null;
}

/**
 * Pre-message hook: if the incoming message references an MC task,
 * update it to in_progress via Supabase REST.
 *
 * Returns the task number if one was detected (so post-hook can skip activity creation).
 */
export async function preMessageSync(
  agentId: string,
  userMessage: string,
): Promise<{ taskNumber: number | null }> {
  const taskNumber = extractMCTaskRef(userMessage);

  if (taskNumber && SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      // Only update if the task is currently assigned (not already in_progress or done)
      const url =
        `${SUPABASE_URL}/rest/v1/mc_tasks?task_number=eq.${taskNumber}&status=eq.assigned`;
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          status: 'in_progress',
          started_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        logger.info({ taskNumber, agentId }, 'mc-sync: task set to in_progress');
      } else {
        logger.warn({ taskNumber, status: res.status }, 'mc-sync: failed to update task status');
      }
    } catch (err) {
      logger.warn({ err, taskNumber }, 'mc-sync: error updating task status');
    }
  }

  return { taskNumber };
}

/**
 * Post-message hook: log activity to both HiveMinds and optionally create MC activity.
 *
 * @param agentId     ClaudeClaw agent ID (e.g. 'jarvis', 'nick-fury')
 * @param chatId      Telegram chat ID
 * @param userMessage The original user message
 * @param response    The agent's response text
 * @param taskNumber  MC task number from pre-hook (null if none detected)
 */
export async function postMessageSync(
  agentId: string,
  chatId: string,
  userMessage: string,
  response: string,
  taskNumber: number | null,
): Promise<void> {
  // Skip for main Janet (she has her own MC integration) and system interactions
  if (agentId === 'main') return;

  const mcName = getMCName(agentId);
  const summaryInput = userMessage.length > 120 ? userMessage.slice(0, 120) + '...' : userMessage;
  const summaryOutput = response.length > 200 ? response.slice(0, 200) + '...' : response;

  // 1. Log to ClaudeClaw's internal hive_mind table (dashboard visibility)
  try {
    logToHiveMind(
      agentId,
      chatId,
      taskNumber ? 'task_response' : 'telegram_direct',
      taskNumber
        ? `Task #${taskNumber} -- responded to Denver via Telegram`
        : `Direct Telegram: "${summaryInput}"`,
    );
  } catch (err) {
    logger.warn({ err }, 'mc-sync: failed to log to internal hive_mind');
  }

  // 2. Log to shared HiveMind DB (cross-agent visibility for Janet)
  try {
    const db = getHiveMindDb();
    if (db) {
      db.prepare(
        `INSERT INTO activity_log (agent_id, action, summary, created_at)
         VALUES (?, ?, ?, strftime('%s', 'now'))`,
      ).run(
        agentId,
        taskNumber ? 'task_response' : 'telegram_direct',
        taskNumber
          ? `Task #${taskNumber} -- responded to Denver via Telegram`
          : `Direct Telegram from Denver: "${summaryInput}" -> "${summaryOutput}"`,
      );
    }
  } catch (err) {
    logger.warn({ err }, 'mc-sync: failed to log to shared HiveMind');
  }

  // 3. If a task was referenced and agent gave a real response, mark it done
  //    and log a deliverable. Only transitions tasks currently in_progress to
  //    prevent double-completion if the same task is mentioned multiple times.
  if (taskNumber && response.length > 100 && SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const doneUrl =
        `${SUPABASE_URL}/rest/v1/mc_tasks?task_number=eq.${taskNumber}&status=eq.in_progress`;
      const doneRes = await fetch(doneUrl, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          status: 'done',
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      });

      if (doneRes.ok) {
        const doneTasks = (await doneRes.json()) as Array<{ id: string }>;
        const taskId = doneTasks?.[0]?.id;

        if (taskId) {
          // Log a deliverable with the agent's response summary
          await fetch(`${SUPABASE_URL}/rest/v1/mc_task_deliverables`, {
            method: 'POST',
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
              Prefer: 'return=minimal',
            },
            body: JSON.stringify({
              task_id: taskId,
              title: `Telegram response from ${mcName}`,
              type: 'document',
              content: summaryOutput,
              summary: `Completed via direct Telegram conversation`,
              created_by: mcName,
            }),
          });
          logger.info({ taskNumber, agentId: mcName }, 'mc-sync: task marked done via Telegram');
        }
      }
    } catch (err) {
      logger.warn({ err, taskNumber }, 'mc-sync: error marking task done');
    }
  }

  // 4. If no MC task was referenced, create a lightweight activity record in MC
  //    so the work shows up on the dashboard.
  //    Skip for trivial interactions (very short responses, likely status checks).
  if (!taskNumber && response.length > 150 && SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const agentUUIDs = await fetchAgentUUIDs();
      const assigneeId = agentUUIDs.get(mcName);
      const department = AGENT_DEPARTMENT[agentId] ?? null;

      // Derive a title from the user message
      const rawTitle = userMessage
        .replace(/\[Voice transcribed\]:\s*/i, '')
        .replace(/\n/g, ' ')
        .trim();
      const title = rawTitle.length > 80 ? rawTitle.slice(0, 77) + '...' : rawTitle || 'Direct Telegram task';

      const url = `${SUPABASE_URL}/rest/v1/mc_tasks`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          title: `[Auto] ${title}`,
          description: `Auto-created from direct Telegram conversation.\n\nDenver said: "${summaryInput}"\n\nAgent response preview: "${summaryOutput}"`,
          status: 'done',
          priority: 'when_capacity',
          department,
          assignee_agent_id: assigneeId ?? null,
          created_by: mcName,
          brand: 'shared',
          tags: JSON.stringify(['telegram-direct']),
          completed_at: new Date().toISOString(),
          started_at: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        const tasks = (await res.json()) as Array<{ task_number: number }>;
        const num = tasks?.[0]?.task_number;
        logger.info({ taskNumber: num, agentId }, 'mc-sync: created activity record in MC');
      } else {
        const body = await res.text();
        logger.warn({ status: res.status, body }, 'mc-sync: failed to create activity record');
      }
    } catch (err) {
      logger.warn({ err }, 'mc-sync: error creating activity record');
    }
  }
}

/**
 * Cleanup: close the shared HiveMind database connection.
 * Called during graceful shutdown.
 */
export function closeMCSyncDb(): void {
  if (hivemindDb) {
    try {
      hivemindDb.close();
    } catch {
      // Ignore close errors during shutdown
    }
    hivemindDb = null;
  }
}
