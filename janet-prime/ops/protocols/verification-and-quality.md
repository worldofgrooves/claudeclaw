# Verification and Quality Protocol

**Effective:** 2026-04-05
**Last Updated:** 2026-04-05
**Scope:** All agents (Janet, department agents)
**Purpose:** Prevent verification gaps, incomplete task tracking, and unverified agent output from reaching Denver

---

## Core Principle

**Never claim anything without verification.** "I routed this to X" without creating the MC task is not acceptable. "X doesn't exist in the database" without checking what does exist is not acceptable. "Agent completed the task" without verifying the output is not acceptable.

---

## 1. Database Query Protocol

### Rule
When querying databases by name, identifier, or any text field:
- **Always use case-insensitive matching** (`ILIKE`, `LOWER()`, or equivalent)
- **Before claiming "X doesn't exist"**: query to see what DOES exist in that table
- If a narrow query returns empty, the problem is usually the query, not the data

### Example
**Wrong:**
```sql
SELECT * FROM mc_agents WHERE name = 'Vision';  -- returns empty
-- Conclusion: "Vision doesn't exist"
```

**Right:**
```sql
SELECT * FROM mc_agents WHERE name = 'Vision';  -- returns empty
-- Next step: SELECT name FROM mc_agents ORDER BY name;
-- Discover: stored as lowercase 'vision'
-- Conclusion: "Query was case-sensitive, Vision exists as 'vision'"
```

### Enforcement
- Added to MEMORY.md as standing rule
- Janet reviews own query patterns weekly
- Any "doesn't exist" claim triggers verification step

---

## 2. Task Completion Gate

### Rule
Tasks cannot be marked `status = 'done'` unless:
- **(A)** A deliverable is attached in `mc_task_deliverables`, OR
- **(B)** A comment in `mc_task_comments` explicitly states why no deliverable exists

### What Counts as a Deliverable
- Document/file uploaded to deliverables table
- URL to deployed work (website, app, proposal)
- Written report or analysis
- Code committed to repo with link

### What Does NOT Count
- Agent self-report ("I finished it")
- Telegram message saying "done"
- Verbal confirmation without artifact

### Exceptions
Some tasks legitimately have no deliverable:
- "Cancel subscription" (outcome: subscription cancelled, no document)
- "Delete outdated file" (outcome: file gone, no artifact)
- "Update calendar" (outcome: calendar updated, no export needed)

**For these:** Add comment explaining why no deliverable: "No deliverable -- calendar event created, no export needed."

### Enforcement
- Overnight review: Flag all `done` tasks from last 24 hours with zero deliverables
- Janet verifies each flagged task: either deliverable exists or comment explains why not
- If neither exists: task reopened or comment added

---

## 3. Task Blocking Requirement

### Rule
Any task with `status = 'blocked'` MUST have:
- Non-null `blocked_reason` field
- Reason must explain: what is blocking progress, what needs to happen to unblock

### Invalid Blocked States
- `blocked_reason = NULL` -- not allowed
- `blocked_reason = ""` (empty string) -- not allowed
- Vague reasons like "waiting" (waiting for what?)

### Valid Blocked Reasons
- "Waiting on trademark filing -- do not proceed until filed"
- "Higgsfield out of credits -- need Denver to top up"
- "Blocked per Denver: not a priority right now"
- "Missing API credentials -- need Denver to provide Formspree key"

### Enforcement
- Overnight review: Flag all `blocked` tasks with NULL or empty `blocked_reason`
- Janet either adds reason or changes status
- If blocked reason is unclear, escalate to Denver for clarification

---

## 4. Delegation Integrity

### Rule
When delegating work to a department agent:
- **Create the MC task in the same action as the delegation message**
- Do NOT say "I'm routing this to Vision" and then create the task later
- Do NOT assume the task will be created eventually

### Process
1. Draft the delegation message (Telegram brief to agent)
2. Create the MC task record (with title, description, assignee, priority)
3. Send the delegation message
4. Confirm to Denver: "Task #XXX created and Vision notified"

**Never:** "Routing this to Vision" without the MC task existing.

### Why This Matters
- If the task isn't in MC, it's invisible to the system
- Denver can't see it in the dashboard
- Overnight reviews won't catch it if it stalls
- The task can fall through the cracks entirely

### Enforcement
- Before saying "routed to [Agent]," verify MC task exists
- Janet checks: did I create the MC record before sending the Telegram message?
- If task was delegated but MC record is missing: create it immediately, flag the gap

---

## 5. Agent Output Verification

### Rule
When a department agent reports a task as complete:
- **Do NOT immediately relay "task complete" to Denver**
- **Verify the actual output first:**
  - If it's a deployment: check the URL, confirm it loads
  - If it's a document: read it, confirm it matches the brief
  - If it's code: check the repo, verify the feature works
  - If it's research: review the deliverable, confirm it answers the question

### Common Failure Pattern
1. Agent marks task `done` in MC
2. Janet sees status change, assumes it's done
3. Janet tells Denver "Task complete"
4. Denver checks the output: not actually done

**This is not acceptable.** Agent self-report is not verification.

### Verification Steps
1. Agent updates task to `done` and attaches deliverable
2. **Janet verifies:**
   - Read the deliverable
   - Check the deployed URL (if applicable)
   - Confirm the output matches the original brief
   - If it's a fix: test that the bug is actually fixed
3. **Only then:** Confirm to Denver or include in overnight summary

### When Verification Fails
- Reopen the task immediately
- Add comment: "Reopened -- [specific issue found during verification]"
- Notify agent: what's missing, what needs to be fixed
- Do NOT tell Denver it's done if it's not done

### Example (from April 1)
- Task #419: Vision marked "done" (Services section with Learn More buttons)
- Janet verified: Learn More buttons were NOT implemented
- Janet reopened task with clarified requirements
- Pattern note added to HiveMind: "Agent self-reported completion without delivering required functionality"

**This is the correct response.** Catch it before Denver sees it.

### Enforcement
- Janet verifies ALL agent-completed tasks before confirming to Denver
- Overnight review: sample 3 recent "done" tasks, verify deliverables match descriptions
- If pattern emerges (agent frequently marks tasks done prematurely): escalate to Denver

---

## 6. Claim Verification Checklist

Before making any claim to Denver, verify:

- [ ] **"X doesn't exist in database"** -- Did I check what DOES exist?
- [ ] **"Task routed to Agent"** -- Does the MC task record exist?
- [ ] **"Task complete"** -- Did I verify the actual output?
- [ ] **"Deployed at URL"** -- Did I check the URL loads?
- [ ] **"Agent is working on X"** -- Is the task status actually `in_progress`?

If any box is unchecked: verify before claiming.

---

## System-Level Enforcement

### Janet's Responsibilities
- Run verification checklist before making claims to Denver
- Verify agent output before relaying "task complete"
- Review overnight completed tasks for deliverable compliance
- Flag tasks with missing blocked_reasons
- Maintain this protocol document

### Overnight Review Additions
Check for:
1. Tasks marked `done` with zero deliverables (flag for verification)
2. Tasks marked `blocked` with NULL/empty `blocked_reason` (add reason or unblock)
3. Sample 3 recent completed tasks: verify deliverables match task descriptions

### Agent Instructions
All department agents to be notified:
- Tasks marked `done` must have deliverables attached
- If no deliverable is possible, add comment explaining why
- Self-reporting completion without deliverable is not acceptable

### Quarterly Review
Every 3 months:
- Review this protocol for gaps
- Check compliance patterns across agents
- Update enforcement mechanisms as needed

---

## Rationale

**Why these protocols exist:**

On 2026-04-05, a diagnostic review revealed:
- Janet claimed "Vision doesn't exist in MC" due to case-sensitive query (Vision exists, stored as lowercase 'vision')
- Janet claimed "routing to Vision" but never created the MC task
- 15 tasks marked `done` in the last week with no deliverables attached
- Task #11 blocked for 108+ hours with NULL `blocked_reason`
- Task #419 (April 1): Vision marked complete without delivering required functionality

**Common thread:** Verification gaps. Claims made without verification. Output accepted without checking.

**Solution:** Mandatory verification steps at every claim, every delegation, every completion.

This protocol prevents those gaps from happening again.

---

## 7. Manuvi Behavioral Verification Gate (MANDATORY -- effective April 14, 2026)

**This overrides the automated HTTP 200 check for ALL Manuvi build tasks.**

### Rule

No Manuvi build task gets marked `done` until it passes a behavioral test against the real workflow. "Does the page load" is NOT verification. "Does the code compile" is NOT verification.

### The Behavioral Test (all steps must pass)

1. Create a new project from the dashboard
2. Enter a prompt
3. Code generates, files appear in editor
4. npm install completes without errors in terminal
5. Dev server boots without errors in terminal
6. Preview renders a working page
7. Deploy fires the cascade (when cascade is implemented)

If ANY step fails, the task is NOT done. The automated check is supplementary -- it catches regressions in the host app. It does not test the generation/build workflow.

### Who Runs This Test

- **Denver** runs this test manually for critical path items (generation pipeline, deploy cascade, editor initialization changes)
- **Janet** runs automated verification as a first-pass filter only
- A task passing automated verification but failing Denver's behavioral test is NOT done

### When This Applies

Any task that touches:
- Chat.client.tsx (editor initialization, message handling)
- The generation pipeline (system prompt, streaming parser, action runner)
- WebContainer initialization or npm install sequencing
- Template scaffolding
- Deploy cascade
- Editor mode detection (sandbox vs deployed)

### Enforcement

- Janet must flag tasks in these areas as requiring Denver's manual verification
- Do NOT auto-mark done based on Playwright HTTP 200 check
- Mark as `review` with comment: "Automated check passed. Awaiting Denver behavioral verification."

---

## 8. Automated Build Verification (Jarvis QA Pipeline)

**Added:** 2026-04-10
**Updated:** 2026-04-15 -- Rewired from Janet-side to Jarvis-side. Jarvis is now the central QA verification agent.
**Purpose:** Remove Denver from the build verification loop entirely. Jarvis verifies builds using headless browser automation and handles re-assignment autonomously. Janet gives final approval.

### Architecture

**Three-layer pipeline: Builder -> Jarvis (QA) -> Janet (approval) -> Denver**

Jarvis is the technical QA gate. Janet is the strategic approval gate. Denver only sees fully verified work.

### How It Works

When a build agent (Vision, Tony) marks a task as `review` in Mission Control:

1. **Builder marks task `review`** and sets the deploy URL in the task description or comment
2. **Builder updates task status to `review`** in MC:
   ```sql
   UPDATE mc_tasks SET status = 'review', updated_at = now() WHERE task_number = [N];
   INSERT INTO mc_task_comments (task_id, author_type, author_name, comment_type, body)
   VALUES ((SELECT id FROM mc_tasks WHERE task_number = [N]), 'agent', '[AGENT_NAME]', 'status_update',
   'Ready for verification. Deploy URL: [URL]. Commit: [HASH]. What to verify: [BEHAVIORAL DESCRIPTION]');
   ```
3. **Builder writes to HiveMind** with action `review_ready`:
   ```bash
   sqlite3 ~/Documents/Dev/SynologyDrive/Dev/Workspace/janet/hivemind/hivemind.db \
     "INSERT INTO activity_log (agent_id, action, summary, created_at) VALUES ('[AGENT_ID]', 'review_ready', 'Task #[N] ready for verification: [URL] -- [what to verify]', strftime('%s','now'));"
   ```

4. **MC Poller routes to Jarvis automatically:**
   - MC Poller (runs every 30s in main Janet process) detects `status = 'review'` on `department = 'build'` tasks
   - Creates a one-time scheduled wake task assigned to `agent_id = 'jarvis'`
   - Sends SIGUSR1 instant-wake signal to Jarvis for near-instant pickup (~5s vs ~60s polling)
   - Jarvis wakes and receives a structured verification prompt

   Manual fallback (if poller misses it):
   ```bash
   bash ~/Documents/Dev/SynologyDrive/Dev/Workspace/janet/scripts/handle-build-review.sh [TASK_NUMBER] [DEPLOY_URL] [REPO_PATH]
   ```

5. **Jarvis's verification pipeline runs:**
   - Git: Is the commit on `origin/main`? If not: REJECT immediately, send back to builder
   - Vercel: Is production deployment READY? Wait up to 5 min if needed
   - Browser (Playwright): loads the URL headlessly, captures console errors, network failures, HTTP status, load time, screenshot
   - Checks for common error states (500s, hydration failures, module errors)

6. **If PASS:**
   - Add VERIFICATION PASS comment to MC with evidence (commit, HTTP status, load time, screenshot)
   - Log `verification_pass` to HiveMind
   - Send screenshot to deliverables channel
   - Signal Janet via HiveMind for final approval
   - **Janet reviews Jarvis's report, stamps approval, marks task done, notifies Denver**

7. **If FAIL:**
   - Add VERIFICATION FAIL comment to MC with full diagnostics (console errors, network failures, screenshot)
   - Reset task to `assigned` status for the original builder
   - Log `verification_fail` to HiveMind
   - Builder gets re-woken by MC Poller on next cycle
   - **Denver is NOT notified.** Iteration happens between Jarvis and the builder.
   - Do NOT mark original task done

### Tools

| Script | Purpose | Location |
|--------|---------|----------|
| `verify-deploy.js` | Playwright headless browser verification | `tools/verify/verify-deploy.js` |
| `verify-build.sh` | Full verification (git + Vercel + browser) | `scripts/verify-build.sh` |
| `handle-build-review.sh` | Jarvis review handler (verify + structured output for pass/fail routing) | `scripts/handle-build-review.sh` |

### Re-Assignment Rules

- Jarvis autonomously sends failed tasks back to the builder without Denver's involvement
- Maximum 3 verification-fix cycles before Jarvis escalates to Janet
- If the same issue persists across 2 cycles, the diagnostic approach must change (not just re-assign the same brief)
- After 3rd failure: Janet decides whether to reassign, descope, or involve Denver
- All fix iterations reference the original task number for traceability

### Infrastructure

| Component | Type | Location/Name | Status |
|-----------|------|---------------|--------|
| MC Poller review routing | TypeScript | `src/mc-poller.ts` (pollReviewTasks) | LIVE |
| SIGUSR1 instant-wake handler | TypeScript | `src/index.ts` + `src/scheduler.ts` | LIVE |
| Jarvis QA instructions | Markdown | `agents/jarvis/CLAUDE.md` | LIVE |
| Playwright browser | Local install | `~/Library/Caches/ms-playwright/chromium-*` | INSTALLED |
| Verification script | Node.js | `tools/verify/verify-deploy.js` | TESTED |
| Build verifier | Bash | `scripts/verify-build.sh` | TESTED |
| Review handler | Bash | `scripts/handle-build-review.sh` | TESTED |
| Supabase trigger (legacy) | PL/pgSQL | `mc_trg_review_verification` | SUPERSEDED by MC Poller |

### Verification Chain

```
Builder commits to main, marks task 'review' in MC
  -> MC Poller (every 30s) detects review status
  -> Creates wake task for Jarvis + sends SIGUSR1
  -> Jarvis picks up within seconds
  -> Jarvis runs: handle-build-review.sh (Playwright verification)
  -> PASS:
     -> Jarvis adds VERIFICATION PASS to MC, logs to HiveMind
     -> Janet reviews report, stamps approval
     -> Janet marks done, notifies Denver
  -> FAIL:
     -> Jarvis adds VERIFICATION FAIL to MC with diagnostics
     -> Resets task to 'assigned' for builder
     -> Builder re-woken by MC Poller, fixes, re-submits
     -> Jarvis re-verifies (max 3 cycles)
     -> Denver never hears about it
```

### What This Replaces

**Original flow (before April 2026):**
```
Builder pushes -> Denver tests in browser -> Denver screenshots console ->
Denver pastes to Opus -> Opus diagnoses -> Denver writes directive for builder
(4+ handoffs per cycle, Denver involved in every iteration)
```

**V1 flow (April 10-15):**
```
Builder marks review -> Janet verifies automatically ->
  PASS: mark done, notify Denver
  FAIL: create fix task, assign to builder, iterate
(0 Denver handoffs, but Janet doing technical QA wasn't ideal)
```

**Current flow (April 15+):**
```
Builder marks review -> Jarvis verifies (QA specialist) ->
  PASS: signal Janet -> Janet approves -> notify Denver
  FAIL: send back to builder with diagnostics -> iterate autonomously
(0 Denver handoffs, technical QA by Jarvis, strategic approval by Janet)
```

---

**Document Status:** Active
**Next Review:** 2026-07-05 (quarterly)
**Maintained by:** Janet Prime
