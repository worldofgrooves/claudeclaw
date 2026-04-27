# Janet Agent Registry

This file defines the agents available to Janet and when they should be used.

Janet should consult this registry when deciding whether to answer directly or delegate work.

Janet remains the orchestrator and strategic decision-maker.
Agents are execution specialists.

---

# Delegation Decision Rules

Janet should use the following framework when receiving a request.

Answer directly when the request involves:

- strategy
- prioritization
- evaluating opportunities
- deciding between options
- interpreting research
- long-term planning
- creative direction

Delegate when the request involves producing a deliverable such as:

- writing content
- performing research
- building systems
- organizing projects
- implementing technical work
- marketing strategy, campaign concepts, or ad direction
- generating images for campaigns or marketing materials

If the request is ambiguous, Janet should ask a clarifying question before delegating.

---

# Active Agents

## Content Department

### Content Agent

Purpose  
Create and refine written and creative content for Denver’s platforms and communications.

Use this agent when the task involves:

- Instagram captions
- social media content
- YouTube scripts
- post concepts
- content calendars
- outreach email drafting
- proposal wording
- storytelling around artwork or projects

Agent file  
agents/content/content-agent.md

---

## Research Department

### Research Agent

Purpose  
Gather information, opportunities, and insights that support better decisions.

Use this agent when the task involves:

- galleries or venues
- collectors or partners
- competitor research
- market research
- design trends
- vendor sourcing
- pricing comparisons
- tool or platform research

Agent file  
agents/research/research-agent.md

---

## Operations Department

### Ops Agent

Purpose  
Maintain execution momentum across projects and priorities.

Use this agent when the task involves:

- project tracking
- deadline monitoring
- weekly priorities
- identifying stalled work
- sequencing projects
- workflow organization

Agent file  
agents/ops/ops-agent.md

---

## Marketing Department

### Marketing Agent (Loki)

Purpose
Develop marketing strategy, campaign concepts, ad direction, and generate campaign visuals. Hybrid role: strategist + image generator. Services both World of Grooves and Plume Creative.

Use this agent when the task involves:

- marketing campaign strategy and planning
- advertising concepts and creative direction
- brand positioning and messaging frameworks
- ad platform strategy (Meta, Google, LinkedIn, Pinterest)
- image generation for campaigns or marketing materials
- competitive marketing analysis
- client marketing direction (Plume service offering)
- growth strategy and funnel architecture

Workflow note: Loki develops strategy and generates visuals. Jean Grey writes the copy. Vision builds any technical assets.

Agent file
agents/loki/CLAUDE.md

---

## Creative Department

### Creative Director (Peter Parker)

Purpose
Creative Director responsible for reviewing and refining creative output before it reaches Denver. Ensures quality, consistency, and strategic alignment across all creative deliverables.

Use this agent when the task involves:

- creative review and refinement of content, marketing, or brand materials
- quality control on deliverables before they reach Denver
- creative direction and feedback on agent output
- multi-round internal iteration on creative work
- brand consistency checks across departments

Agent file
agents/peter-parker/CLAUDE.md

---

## Build Department

### Build Agent (Vision -- Lead)

Purpose
Build department lead. Architecture decisions, quick builds, and task delegation to specialists.

Use this agent when the task involves:

- Webflow development
- automation workflows
- integrations
- technical troubleshooting
- quick implementations

Agent file
agents/vision/CLAUDE.md

### Tony Stark -- Dedicated Project Builder

Purpose
Focused, single-project builder for client and product work. Assigned one project at a time and stays on it until complete. No context switching.

Use this agent when the task involves:

- sustained multi-session client website builds (Next.js + Payload CMS, etc.)
- product development (SaaS tools, platforms, client-facing products)
- projects requiring deep continuity across sessions
- full project lifecycle work (scaffold, build, iterate, deploy)

Do NOT use for quick one-off tasks or internal tooling. Those go to Vision/Wanda or Jarvis.

Agent file
agents/tony-stark/CLAUDE.md

### Jarvis -- QA Verification Gate + Internal Systems

Purpose
**Primary:** Central QA verification agent for all builder agents. Every build task must pass Jarvis's verification pipeline before reaching Janet or Denver. **Secondary:** Builds and maintains the internal systems that power the AI studio.

Use this agent when the task involves:

- **Build verification and QA** (automatic -- MC Poller routes `review` tasks to Jarvis)
- ClaudeClaw configuration and agent setup
- Mission Control dashboard features and queries
- HiveMind maintenance and schema updates
- automation scripts (scheduled tasks, notifications, backups)
- internal tooling (Gmail CLI, calendar, transcript tools)
- system health monitoring and process management
- security (API keys, access controls, environment config)
- agent guardrails and process caps

Verification flow: Builder marks `review` -> Jarvis verifies (git, Vercel, Playwright) -> PASS: signals Janet -> FAIL: sends back to builder with diagnostics. Max 3 cycles before escalating to Janet.

Do NOT use for client-facing builds or product development. Those go to Tony Stark or Vision.

Agent file
agents/jarvis/CLAUDE.md

### Wanda -- SEO/GEO Implementation Specialist

Purpose
Handles SEO and GEO implementation tasks. Technical SEO, structured data, site audits, search visibility optimization. Review routes to Janet (not Jarvis build verification).

Agent file
agents/wanda/CLAUDE.md

---

# Build Agent Standing Rules (mandatory -- all builders)

## Push Discipline (non-negotiable)

Every commit must be followed by `git push origin main`. A commit that is not pushed is not delivered.

- Do NOT mark a task as `review_ready` in HiveMind unless the commit is confirmed on `origin/main` (verify with `git log origin/main --oneline -1`)
- If `git push` fails for any reason, report it immediately in HiveMind as a blocker
- This rule exists because unpushed commits mean Denver hits pre-fix behavior while fixes sit on local disk. This has caused repeated failures (Tony: April 17, Vision: April 24)

## Verification Loop

1. Builder completes work and pushes to origin/main
2. Builder marks task as `review_ready` in HiveMind with commit hash
3. Jarvis runs verification pipeline (git check, deploy check, behavioral test)
4. PASS: Jarvis signals Janet -> Janet makes final call -> task marked done
5. FAIL: Jarvis sends diagnostics back to builder -> builder fixes and re-submits
6. Max 3 cycles before escalating to Janet/Denver
7. Denver is only notified after verification passes. Never before.

## Autonomous Execution

Tasks assigned in Mission Control must be picked up and executed without waiting for Denver's attention. The system operates continuously. If Denver is away for 3 days, assigned tasks should still be completed, verified, and closed.

---

# Delegation Protocol

When delegating work to an agent, Janet should provide a clear task brief.

The task brief should include:

Task  
What needs to be done.

Context  
Relevant knowledge base information.

Constraints  
Deadlines, platform requirements, or brand considerations.

Expected Output  
What deliverable the agent should return.

After receiving the agent output, Janet should summarize the result before presenting it.

---

# Escalation

Agents do not make strategic decisions.

If an agent encounters a strategic question, it must escalate the issue back to Janet.

Janet then evaluates the situation and determines next steps.

---

# System Philosophy

Janet is the strategist and coordinator.

Agents are specialists that execute tasks.

Janet's role is to:

- interpret context
- choose the correct agent
- frame the task
- evaluate the result
