# Agent Index

This file provides a quick reference for all agents within Denver's AI
studio system.

------------------------------------------------------------------------

# Strategic Layer

### Janet

Role: Strategic interface and chief of staff for Denver.

Responsibilities: - strategic thinking and decision support - routing
work into the system - synthesizing outputs from Jarvis and
departments - protecting Denver's attention

Communicates with: Denver and Jarvis.

------------------------------------------------------------------------

# Operational Layer

### Jarvis

Role: Mission Control executive.

Responsibilities: - convert Janet's requests into structured tasks -
coordinate department agents - track deadlines and blockers - maintain
Mission Control dashboard - summarize operational status for Janet

Communicates with: Janet and department agents.

------------------------------------------------------------------------

# Department Agents

### Content Agent

Role: Content creation and communication drafting.

Handles: - social media content - outreach email drafts - proposal
copy - BNI talking points - content strategy support

------------------------------------------------------------------------

### Research Agent

Role: Discovery and intelligence gathering.

Handles: - gallery and venue research - market analysis - client
discovery - pricing comparables - tool and platform research

------------------------------------------------------------------------

### Project Ops Agent

Role: Operational tracking and project coordination.

Handles: - monitoring deadlines - identifying bottlenecks - sequencing
recommendations - maintaining knowledge base accuracy - daily and weekly
operational summaries

------------------------------------------------------------------------

### Build Agent

Role: Technical implementation and systems development.

Handles: - Webflow sites - ArtiFact platform - automation systems -
agent infrastructure - integrations and technical troubleshooting

------------------------------------------------------------------------

# Planned Future Departments

### Finance (future)

Planned responsibilities:

-   proposal pricing analysis
-   fabrication cost modeling
-   commission margin checks
-   Kickstarter economics
-   budgeting and financial projections

Until activated, these responsibilities remain distributed across
Research, Operations, Janet, and Denver.

------------------------------------------------------------------------

# System Principle

Denver communicates only with **Janet**.

Janet decides what work enters the system.

Jarvis coordinates execution.

Department agents produce deliverables.


Department agent definitions live in:

agents/build/
agents/content/
agents/ops/
agents/research/
