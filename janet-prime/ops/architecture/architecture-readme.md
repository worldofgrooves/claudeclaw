# Architecture README

## Purpose

This folder defines the structural design of Denver's AI studio system.

Files here explain how the system is organized, how authority flows, and
how Mission Control should be built.

This folder is for **system design**, not day-to-day project execution.

------------------------------------------------------------------------

## What This Folder Contains

Architecture files describe:

-   the hierarchy of Denver → Janet → Jarvis → departments
-   the purpose and boundaries of Janet and Jarvis
-   the phased Mission Control roadmap
-   the high-level system map
-   how the overall agent ecosystem is intended to scale

------------------------------------------------------------------------

## File Guide

### system-map.md

The fastest possible overview of the system hierarchy, communication
flow, and core principles.

### system-architecture-overview.md

The full structural map of the AI studio system, including hierarchy,
governing documents, departments, and technology stack.

### mission-control-roadmap.md

The phased implementation roadmap for building Mission Control safely
and incrementally.

### janet-role.md

Defines Janet's role as strategic interface, chief of staff, and primary
conversational partner for Denver.

### jarvis-role.md

Defines Jarvis's role as Mission Control executive and internal
operational coordinator.

------------------------------------------------------------------------

## What This Folder Does Not Contain

This folder does not contain:

-   active project work
-   daily priorities
-   task execution data
-   deliverables
-   department operating rules
-   protocol files
-   general knowledge base context

Those belong elsewhere in the system.

------------------------------------------------------------------------

## Related Folders

### agents/

Contains the agent definitions for departments and future specialists.

### protocols/

Contains escalation rules, department routing rules, and
inter-department coordination standards.

### root knowledge base files

Contain Denver's goals, priorities, current state, operating rules, and
project context.

------------------------------------------------------------------------

## Operating Rule

Agents should read this folder when they need to understand **how the
system is designed**.

Agents should not treat architecture documents as active task
instructions unless Janet or Jarvis explicitly routes work based on
them.

------------------------------------------------------------------------

## Core Principle

Architecture files describe how the system works.

Protocol files describe how the system behaves.

Agent files describe who does the work.

Knowledge base files describe what matters right now.
