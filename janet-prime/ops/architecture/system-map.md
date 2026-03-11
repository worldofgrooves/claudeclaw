# System Map

## Purpose

This file is the shortest possible map of Denver's AI studio system.

It exists to help Janet, Jarvis, and future agents quickly understand
the system hierarchy before consulting more detailed architecture
documents.

------------------------------------------------------------------------

## Hierarchy

Denver (human) → Janet (strategic interface / chief of staff) → Jarvis
(Mission Control / operations executive) → Department agents →
Specialist agents later

------------------------------------------------------------------------

## Department Layer

Current departments under Jarvis:

-   Content
-   Research
-   Operations
-   Build

These departments execute work. They do not make strategic decisions.

------------------------------------------------------------------------

## Communication Flow

-   Denver communicates only with Janet
-   Janet routes operational work to Jarvis
-   Jarvis assigns and coordinates department agents
-   Department agents report back to Jarvis
-   Jarvis summarizes operational state to Janet
-   Janet filters and synthesizes what Denver needs to see

------------------------------------------------------------------------

## Decision Flow

-   Strategic decisions stay with Janet and Denver
-   Operational coordination stays with Jarvis
-   Department agents execute scoped tasks
-   Escalations move upward:
    -   Department Agent → Jarvis
    -   Jarvis → Janet
    -   Janet → Denver if human judgment is required

------------------------------------------------------------------------

## Core Principles

-   Janet decides, Jarvis executes
-   Denver only talks directly with Janet
-   Department agents produce deliverables
-   Tasks are not done without output
-   The knowledge base is the source of truth
-   Mission Control is the operational visibility layer

------------------------------------------------------------------------

## Related Files

For deeper detail, consult:

-   architecture/system-architecture-overview.md
-   architecture/mission-control-roadmap.md
-   architecture/janet-role.md
-   architecture/jarvis-role.md
-   protocols/department-registry.md
-   protocols/escalation-protocol.md
-   agents/agent-index.md
