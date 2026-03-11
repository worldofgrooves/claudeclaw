# Mission Control Roadmap

## Purpose

Mission Control is the operational dashboard used by Jarvis to
coordinate tasks, agents, and workflows across Denver's AI system.

The system will be built in phases to prevent complexity and ensure
stability.

------------------------------------------------------------------------

## Build Principles

1.  Build in phases
2.  Validate each phase before continuing
3.  Prefer simple working systems over complex prototypes
4.  Escalate architectural decisions before implementing them
5.  Stop after each phase and report results
6.  All automation must have an off switch
7.  Manual operation must always remain possible

------------------------------------------------------------------------

# Phase 1 --- Mission Control MVP

## Objective

Create a simple dashboard for task visibility and agent coordination.

## Task Data Model

Every task in Mission Control follows this schema:

  ---------------------------------------------------------------------------
  Field            Type         Required            Description
  ---------------- ------------ ------------------- -------------------------
  task_id          string       yes                 unique identifier

  title            string       yes                 concise task description

  description      text         yes                 detailed scope of work

  status           enum         yes                 inbox / assigned /
                                                    in_progress / blocked /
                                                    review /
                                                    waiting_on_denver /
                                                    parked / done

  priority         enum         yes                 immediate / this_week /
                                                    when_capacity

  assignee         string       no                  department agent assigned

  department       enum         no                  content / research /
                                                    operations / build

  created_by       string       yes                 janet or jarvis

  created_at       timestamp    yes                 when the task was created

  updated_at       timestamp    yes                 last status change

  deadline         timestamp    no                  if applicable

  blocked_by       string       no                  task_id of blocking task
                                                    or text description

  blocked_reason   text         no                  required when status is
                                                    blocked

  deliverable      attachment   no                  required before status
                                                    can be set to done

  brand            enum         no                  wog / plume /
                                                    groove_dwellers / shared

  comments         array        yes                 activity and comment log

  urgency_signal   computed     auto                overdue / due_24h /
                                                    due_72h / due_week / none
  ---------------------------------------------------------------------------

## Agent Directory Model

Each agent in Mission Control has:

  Field               Type     Description
  ------------------- -------- -----------------------------------------
  agent_id            string   unique identifier
  name                string   display name (Marvel character)
  department          enum     content / research / operations / build
  role                string   brief role description
  status              enum     idle / active / blocked
  active_task_count   number   tasks currently assigned
  skills              array    capabilities and specialties
  model_tier          string   opus / sonnet / haiku

## In Scope

-   agent directory with status and workload
-   task board with columns:
    -   Inbox
    -   Assigned
    -   In Progress
    -   Blocked
    -   Review
    -   Waiting on Denver
    -   Parked
    -   Done
-   task detail page with full data model fields
-   task assignment to agents
-   priority and deadline fields
-   urgency signals (overdue, 24h, 72h, week)
-   activity/comment log per task
-   basic filtering by agent, status, department, or brand
-   deliverable attachment support
-   blocked reason display

## Operational Visibility Requirements

Mission Control must provide operational signals so Janet and Jarvis can
manage the system effectively.

### Agent Status

Each agent should display:

-   current workload
-   active task count
-   availability status (idle, active, blocked)

### Task Queue Visibility

Jarvis must be able to see:

-   tasks assigned per agent
-   tasks waiting in queue
-   tasks currently executing
-   tasks requiring review
-   tasks waiting on Denver (with age of wait)

### Task Status Signals

Tasks must clearly show:

-   inbox (unassigned)
-   assigned (not yet started)
-   in progress
-   blocked (with reason displayed)
-   review (deliverable submitted)
-   waiting on Denver (requires human input)
-   done (deliverable attached)

### Deadline Awareness

Tasks should display:

-   deadline timestamp
-   urgency signals (overdue / 24h / 72h / week)

This helps Janet decide when to escalate.

### Failure Tracking

The system should track:

-   failed executions
-   retry attempts
-   last failure reason

This allows Jarvis to monitor operational health.

### Executive Summary Feed

Mission Control should generate an operational summary for Janet
including:

-   tasks dispatched since last summary
-   tasks completed with deliverable links
-   failures and retry status
-   queue depth per department
-   items waiting on Denver (with age)
-   blockers requiring decisions
-   next 24h priorities
-   cost summary if significant

Summary is capped at 20 items, prioritized by urgency and recency.

------------------------------------------------------------------------

## Out of Scope for Phase 1

-   automations
-   advanced analytics
-   autonomous task pickup
-   complex permissions
-   cross-system integrations
-   token/cost tracking (deferred to Phase 3)

------------------------------------------------------------------------

## Definition of Done --- Phase 1

Phase 1 is complete when:

-   tasks can be created with all required fields
-   tasks can be assigned to agents
-   tasks move across all seven statuses
-   blocked tasks display their reason
-   tasks cannot be marked done without a deliverable
-   comments and updates are visible per task
-   agents are visible in the directory with status and workload
-   tasks can be filtered by agent, status, department, and brand
-   deadline urgency signals display correctly
-   Waiting on Denver column is functional
-   dashboard is stable for manual use

Stop and report when these conditions are met.

------------------------------------------------------------------------

# Phase 2 --- Janet and Jarvis Integration

## Objective

Allow Janet and Jarvis to interact with Mission Control
programmatically.

## In Scope

-   Janet can create tasks via structured brief
-   Jarvis can assign tasks to department agents
-   Jarvis can update task status
-   Jarvis can attach deliverables
-   task ownership reflects the correct agent
-   Janet receives formatted operational summaries from Mission Control
    data
-   Jarvis can flag tasks as escalated to Janet
-   cross-department dependency chains are visible (task A blocks task
    B)

## Definition of Done --- Phase 2

Phase 2 is complete when:

-   Janet can create a task and it appears in Mission Control
-   Jarvis can assign, update, and complete tasks
-   deliverables can be attached programmatically
-   dependency chains between tasks are visible
-   Janet receives a formatted summary on request
-   the system handles at least 20 concurrent tasks without issues

Stop when Janet and Jarvis can reliably use the system.

------------------------------------------------------------------------

# Phase 3 --- Department Workflows

## Objective

Integrate department agents into Mission Control workflows.

Departments include:

-   Content
-   Research
-   Operations
-   Build

## In Scope

-   department agents can receive task assignments from Jarvis
-   department agents can update their own task status
-   department agents can submit deliverables
-   department agents can flag blockers with reasons
-   department agents can request input from other departments (routed
    through Jarvis)
-   token usage tracking per department is active
-   each department completes at least one full workflow through the
    system

## Definition of Done --- Phase 3

Phase 3 is complete when each department has successfully:

-   received a task from Jarvis
-   updated status through the workflow
-   submitted a deliverable
-   had the deliverable reviewed

------------------------------------------------------------------------

# Phase 4 --- Review Layer

## Objective

Add structured review workflows for quality control and human approval.

## In Scope

Add states and workflows for:

-   Needs Review (deliverable submitted, awaiting quality check)
-   Needs Human Input (requires Denver's decision)
-   Blocked (dependency or information missing)
-   Revision Requested (sent back with feedback)

Allow Denver to:

-   review deliverables in Mission Control
-   approve or request revisions
-   add comments to any task
-   see a personal queue of items waiting for his input

## Definition of Done --- Phase 4

Phase 4 is complete when:

-   Denver can review and approve deliverables
-   revision requests return tasks to the correct agent
-   Denver's personal review queue is functional
-   the review cycle works for all four departments

------------------------------------------------------------------------

# Phase 5 --- Automation

## Objective

Introduce operational automation to reduce manual overhead.

## In Scope

-   stalled task detection (flag tasks with no update in 48+ hours)
-   daily operational summaries generated automatically
-   recurring task support (weekly, biweekly, monthly)
-   system health monitoring (agent uptime, failure rates)
-   cost alerts when token spend exceeds thresholds

## Rollback Plan

All automation must have an off switch. If any automated behavior
produces unintended results:

1.  Jarvis can disable the specific automation
2.  the system reverts to manual operation for that function
3.  the rest of the system continues unaffected
4.  Jarvis logs the automation state change

No automation should be introduced that cannot be safely disabled.

## Definition of Done --- Phase 5

Phase 5 is complete when:

-   stalled tasks are automatically flagged
-   daily summaries generate without manual triggering
-   at least one recurring task completes a full cycle
-   health monitoring is active and reporting
-   all automations have been tested with their off switches

------------------------------------------------------------------------

# Escalation Triggers

Stop and escalate when:

-   database structure changes affect previous phases
-   authentication or permissions are impacted
-   financial or legal actions are involved
-   requirements become unclear
-   any phase requires rework of a previous phase's core structure

------------------------------------------------------------------------

# Dashboard Layout Concept (Reference)

Mission Control should visually resemble three coordinated layers:

1.  **Agent Panel** --- shows agents, availability, workload, and
    department
2.  **Task Board** --- shows task workflow from inbox to completion with
    all seven status columns
3.  **Activity Feed** --- shows dispatches, completions, failures,
    escalations, and items waiting on Denver

This structure mirrors the operational dashboard pattern used in the
SiteGPT reference system.

The Marvel character naming convention should be reflected in agent
avatars and profiles within the dashboard, with character traits mapped
to department functions.
