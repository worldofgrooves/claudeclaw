# System Architecture Overview

## Purpose

This document provides a high-level map of Denver's AI studio system,
its hierarchy, communication flows, and governing documents. It serves
as the entry point for understanding how the system operates.

------------------------------------------------------------------------

## Hierarchy

    Denver (human — founder, artist, creative director)
      │
      └── Janet (strategic interface / chief of staff)
            │
            └── Jarvis (Mission Control / operations executive)
                  │
                  ├── Content Agent
                  ├── Research Agent
                  ├── Project Ops Agent
                  └── Build Agent

### Communication Flow

-   Denver communicates only with Janet
-   Janet communicates with Jarvis when operational work is needed
-   Jarvis communicates with department agents to assign and coordinate
    work
-   Department agents communicate with Jarvis (never directly with each
    other or with Denver)
-   Jarvis reports back to Janet
-   Janet surfaces relevant information to Denver

### Decision Flow

-   Strategic decisions: Denver → Janet (or Janet proposes, Denver
    approves)
-   Operational decisions: Janet → Jarvis (within defined boundaries)
-   Task execution: Jarvis → Department Agents
-   Escalations flow upward: Agent → Jarvis → Janet → Denver (if Tier 2)

------------------------------------------------------------------------

## Governing Documents

### System Orientation

  -----------------------------------------------------------------------
  Document                              Defines
  ------------------------------------- ---------------------------------
  architecture/system-map.md            Fastest possible map of the
                                        system hierarchy, communication
                                        flow, and core principles

  -----------------------------------------------------------------------

### Role Definitions

  ---------------------------------------------------------------------
  Document                             Defines
  ------------------------------------ --------------------------------
  janet-role.md                        Janet's responsibilities,
                                       operating modes, routing logic,
                                       and boundaries

  jarvis-role.md                       Jarvis's responsibilities,
                                       communication protocols,
                                       tracking duties, and guardrails

  content-agent.md                     Content department scope, voice
                                       guidelines, and output types

  research-agent.md                    Research department scope,
                                       priority framework, and source
                                       standards

  project-ops-agent.md                 Operations department scope,
                                       cadence, and KB maintenance

  build-agent.md                       Build department scope,
                                       readiness checks, and technical
                                       domains
  ---------------------------------------------------------------------

### Operational Protocols

  ---------------------------------------------------------------------
  Document                             Defines
  ------------------------------------ --------------------------------
  escalation-protocol.md               Standard format for escalating
                                       issues upward

  inter-department-protocol.md         How departments request inputs
                                       from each other

  department-registry.md               Authoritative directory of
                                       departments, capabilities, and
                                       routing guide

  mission-control-roadmap-v2.md        Phased build plan for the
                                       operational dashboard
  ---------------------------------------------------------------------

### Knowledge Base (maintained separately)

  ------------------------------------------------------------------------
  File                             Contains
  -------------------------------- ---------------------------------------
  01-identity.md                   Who Denver is and what the studio
                                   represents

  02-operating-principles.md       How the studio operates

  03-goals-and-vision.md           Long-term vision and current goals

  04-current-state.md              Active projects, status, and capacity

  05-blind-spots-and-patterns.md   Known tendencies to watch for

  06-decision-rules.md             Standing rules for recurring decisions

  decision-framework.md            How to evaluate opportunities and
                                   priorities

  focus-protection.md              Rules for protecting focus and
                                   preventing overload

  weekly-update.md                 Rolling weekly status document

  creative-pipeline.md             Artwork in progress and planned

  world-of-grooves.md              WoG brand context and strategy

  plume-creative.md                Plume Creative brand context and
                                   strategy

  groove-dwellers.md               Groove Dwellers brand context (if
                                   active)

  content-system.md                Content strategy and platform approach

  wog-voice.md                     World of Grooves voice and tone guide

  plume-voice.md                   Plume Creative voice and tone guide

  content-performance.md           What content has performed well and why

  key-contacts.md                  Important contacts and relationships
  ------------------------------------------------------------------------

------------------------------------------------------------------------

## Brands Managed

  ---------------------------------------------------------------------
  Brand                  Type                Status
  ---------------------- ------------------- --------------------------
  World of Grooves       Fine art (vinyl     Active --- primary
                         record sculptures   creative focus
                         and portraits)      

  Plume Creative         Brand development   Active
                         and graphic design  
                         studio              

  Groove Dwellers        (Define when        Planned
                         activated)          

  ArtiFact               Digital             In development --- web
                         authentication      platform active, mobile
                         platform for        paused
                         artwork             
  ---------------------------------------------------------------------

------------------------------------------------------------------------

## Technology Stack

  Layer                  Tools
  ---------------------- -----------------------------------------
  Agent infrastructure   OpenClaw, Mission Control dashboard
  Websites               Webflow
  ArtiFact backend       Supabase (database, auth, storage)
  ArtiFact mobile        React Native / Expo SDK 54 (paused)
  CRM and automation     GoHighLevel, Zapier
  Invoicing              FreshBooks
  Design                 Adobe Creative Cloud, Blender
  AI illustration        Nan Banana / Higgs Field
  Communication          Telegram or Slack (agent interface)
  Version control        GitHub (worldofgrooves/artifact-mobile)

------------------------------------------------------------------------

## Key Principles

1.  **Janet decides, Jarvis executes.** Strategic decisions never happen
    at the operational layer.

2.  **Build in phases.** No system component should be built beyond what
    is currently needed. Validate before expanding.

3.  **Simplest viable approach first.** Test demand before investing in
    complex infrastructure.

4.  **Deliverables required.** Tasks are not done until they produce a
    tangible output.

5.  **Knowledge base is the source of truth.** Agents consult it before
    acting. Updates go through Janet.

6.  **Escalate with context.** No bare escalations. Every handoff
    includes what was done and suggested next steps.

7.  **Protect Denver's attention.** Janet filters operational noise.
    Denver only sees what requires his judgment.

8.  **All automation has an off switch.** Manual operation must always
    remain possible.

------------------------------------------------------------------------

## Marvel Character Mapping (Agent Naming)

When assigning Marvel character names to agents, map character traits to
department functions:

-   Choose characters whose known attributes align with the agent's role
-   Jarvis is already named (fitting --- loyal operational coordinator)
-   Janet is already named (fitting --- strategic, composed, protective)
-   Department agents should receive names as they are activated

The naming convention supports dashboard readability and gives each
agent a distinct identity as the system scales.

### Planned Future Department

A **Finance Department** may be added later as the system scales.

This department would support:

-   proposal pricing analysis
-   fabrication cost modeling
-   commission margin checks
-   Kickstarter and reward economics
-   budgeting and financial projections

Until a dedicated Finance department exists, these responsibilities are
handled by: - **Research** (pricing comparables and market data) -
**Operations** (budget visibility and project tracking) - **Janet and
Denver** (final financial decisions)
