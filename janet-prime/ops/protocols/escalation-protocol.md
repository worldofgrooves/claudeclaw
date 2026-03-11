# Escalation Protocol

## Purpose

This document defines the standard escalation format used by all agents
in Denver's AI studio system. Every agent references this protocol when
returning work to Janet or flagging issues to Jarvis.

---

## When to Escalate

An agent should escalate when:

- the request requires a strategic decision beyond the agent's scope
- the task involves financial commitments or pricing decisions
- the task crosses brand boundaries (WoG / Plume / Groove Dwellers)
- requirements are ambiguous and cannot be resolved with existing
  context
- the task has been blocked for more than 48 hours
- the output could affect client relationships or external
  communication
- the agent identifies a conflict between the task and documented
  priorities

---

## Standard Escalation Format

Every escalation must include:

### 1. What Was Requested

The original task or instruction as received.

### 2. Why It Is Being Escalated

The specific reason this cannot be completed at the department level.

Use one of these categories:

- **Strategic decision needed** — the task requires judgment about
  priorities, direction, or positioning
- **Financial impact** — the task involves pricing, budget, or
  commitment
- **Brand boundary** — the task touches multiple brands and needs
  coordination
- **Ambiguous requirements** — the scope or expected output is unclear
- **Blocked dependency** — another task or input is needed first
- **Conflict detected** — the task conflicts with documented priorities
  or active work
- **Quality concern** — the agent is not confident the output meets
  the required standard

### 3. What Has Been Done So Far

Any progress, research, drafts, or findings completed before the
escalation. This prevents the receiving party from starting over.

### 4. Suggested Options

When possible, present 2-3 paths forward with tradeoffs noted for each.
This is not always required but is strongly preferred.

### 5. Recommended Action

If the agent has a recommendation, state it clearly along with the
reasoning.

---

## Escalation Flow

```
Department Agent → Jarvis → Janet → Denver (if Tier 2)
```

### Department Agent to Jarvis

Department agents escalate to Jarvis when they cannot complete a task.
Jarvis evaluates whether he can resolve it operationally or whether it
needs to go to Janet.

### Jarvis to Janet

Jarvis escalates to Janet when strategic input is required. Jarvis
includes his own assessment and recommendation when possible.

### Janet to Denver (Tier 2 only)

Janet escalates to Denver only when human judgment is required:

- financial commitments
- client-facing communication approval
- brand positioning decisions
- strategic tradeoffs between competing priorities
- anything involving external relationships or contracts

Janet never forwards a bare escalation. She includes a summary and
recommended action.

---

## What Is Not an Escalation

The following are not escalations and should be handled within the
department or by Jarvis:

- requesting clarification on task details (ask Jarvis)
- requesting input from another department (route through Jarvis)
- reporting task completion (update status in Mission Control)
- submitting a deliverable for review (move task to Review status)

---

## Anti-Patterns

- **Bare escalation**: "This is strategic, returning to Janet." This
  is not acceptable. Always include the full escalation format.
- **Premature escalation**: escalating before attempting to resolve
  with available context. Check the knowledge base first.
- **Escalation as avoidance**: using escalation to avoid difficult
  work. If the task is within scope, attempt it first.
- **Chain escalation**: department agent escalates to Jarvis, Jarvis
  immediately escalates to Janet without adding value. Jarvis should
  always evaluate whether he can resolve it first.
