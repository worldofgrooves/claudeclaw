# Inter-Department Communication Protocol

## Purpose

This document defines how department agents request inputs from other
departments and how cross-department workflows are coordinated.

Department agents do not communicate directly with each other. All
cross-department communication is routed through Jarvis.

------------------------------------------------------------------------

## Principles

1.  **No direct agent-to-agent communication** --- all requests go
    through Jarvis
2.  **Structured handoffs** --- when one department's output feeds into
    another's input, the handoff must include clear context
3.  **Dependency tracking** --- cross-department dependencies are
    tracked in Mission Control
4.  **No silent waiting** --- if an agent needs input from another
    department, it flags the need immediately rather than waiting

------------------------------------------------------------------------

## Requesting Input from Another Department

When a department agent needs information or output from another
department to proceed, it submits a dependency request to Jarvis.

### Dependency Request Format

-   **Requesting agent**: who needs the input
-   **Requesting task**: the task ID that is blocked
-   **Needed from**: which department should provide the input
-   **What is needed**: specific description of the required output
-   **Why it is needed**: how it will be used
-   **Deadline**: when it is needed to keep the requesting task on track
-   **Blocking status**: whether the requesting task is fully blocked or
    can proceed partially

### What Jarvis Does

1.  Reviews the dependency request
2.  Creates a task in Mission Control for the providing department
3.  Links the two tasks with a dependency relationship
4.  Assigns the providing task with appropriate priority
5.  Monitors progress and notifies the requesting agent when input is
    ready

------------------------------------------------------------------------

## Cross-Department Workflow Sequences

Some tasks naturally flow through multiple departments in sequence.

### Common Sequences

**Research → Content → Build**

Example: Hard Rock outreach campaign

1.  Research gathers venue intelligence and contact information
2.  Content drafts outreach emails and pitch language
3.  Build creates or updates the relevant landing page

**Research → Operations → Janet**

Example: opportunity evaluation

1.  Research gathers information about a potential opportunity
2.  Operations checks current capacity and project load
3.  Janet evaluates whether to pursue

**Content → Build**

Example: website content update

1.  Content produces copy for a new page or section
2.  Build implements the content in Webflow

**Operations → Janet → Jarvis**

Example: priority conflict resolution

1.  Operations identifies a conflict between deadlines
2.  Janet decides the priority
3.  Jarvis resequences the affected tasks

### Sequence Management

For multi-department workflows, Jarvis:

-   creates linked tasks for each step
-   sets dependencies so downstream tasks show as "waiting"
-   passes output from each step to the next department
-   monitors the full sequence for bottlenecks
-   escalates if any step is blocked for more than 48 hours

------------------------------------------------------------------------

## Handoff Format

When one department passes its output to the next department in a
sequence, the handoff should include:

-   **Deliverable**: the actual output (document, research summary,
    draft, etc.)
-   **Context**: what the next department needs to know about how this
    output was produced
-   **Constraints**: any limitations, caveats, or unresolved questions
-   **What to do with it**: clear instructions on how the next
    department should use this input

------------------------------------------------------------------------

## What Is Not Cross-Department Communication

The following do not require the inter-department protocol:

-   an agent asking Jarvis for task clarification (normal Jarvis
    communication)
-   an agent escalating to Janet through Jarvis (use escalation
    protocol)
-   an agent completing a task and submitting a deliverable (normal task
    workflow)

The inter-department protocol is specifically for cases where one
department needs another department's output to proceed with its own
work.

------------------------------------------------------------------------

## Handling Deferred Work (Parked Status)

If a cross‑department workflow must pause intentionally (not due to a
blocker), Jarvis may move the associated tasks to **Parked** status in
Mission Control.

Use Parked when:

-   the work is strategically deferred
-   another priority temporarily replaces the workflow
-   external timing makes continuation unnecessary for now

Parked tasks are **not considered blocked**. They are intentionally
paused and may be resumed later by Janet or Jarvis.

------------------------------------------------------------------------

## Escalation Visibility

If a dependency request between departments remains unresolved for more
than **48 hours**, Jarvis should:

1.  Flag the dependency as **Blocked** in Mission Control.
2.  Include the issue in the next **operational summary sent to Janet**.
3.  Recommend whether the workflow should continue, reroute, or pause.

This ensures cross‑department dependencies do not stall silently.
