# Department Registry

## Purpose

This file is the authoritative directory of departments and their
capabilities. Janet consults this registry when determining where to
route work. Jarvis consults it when assigning tasks to agents.

When a new department or agent is added, update this file. Do not
hardcode department names or capabilities in other agent definitions.

---

## Active Departments

### Content

**Scope**: creating content assets, drafting communications, and
managing brand voice across platforms.

**Handles**:

- social media content (Instagram, TikTok, YouTube)
- content calendars and batching
- outreach email drafts and follow-up sequences
- proposal copy and pitch language
- BNI talking points
- content repurposing
- client communication drafts

**Does not handle**:

- strategic decisions about brand positioning
- publishing or sending communications
- research or intelligence gathering
- technical implementation

**Current agents**: (to be assigned)

**Model tier**: Sonnet (speed and volume)

---

### Research

**Scope**: discovery, investigation, and intelligence gathering to
support decision-making.

**Handles**:

- venue and gallery discovery
- collector and partner research
- client and lead discovery
- market and competitor analysis
- tool and platform evaluation
- vendor and materials research
- pricing comparables for proposals
- cultural and visual reference research

**Does not handle**:

- strategic interpretation of findings (Janet's role)
- contacting leads or prospects
- implementation or building
- content creation

**Current agents**: (to be assigned)

**Model tier**: Sonnet (speed and volume)

---

### Operations

**Scope**: tracking execution, maintaining project clarity, managing
cadence, and maintaining knowledge base accuracy.

**Handles**:

- project status tracking
- deadline monitoring
- bottleneck identification
- weekly priority reviews
- sequencing recommendations
- knowledge base update proposals
- overload warnings
- "what slipped / what moved" reports

**Does not handle**:

- strategic prioritization decisions (Janet's role)
- content creation
- research or intelligence gathering
- technical implementation

**Current agents**: (to be assigned)

**Model tier**: Sonnet (speed and efficiency)

---

### Build

**Scope**: technical implementation, systems setup, and converting
plans into working products.

**Handles**:

- Webflow site implementation
- ArtiFact platform development (Supabase, web, NFC)
- workflow automation (GoHighLevel, Zapier)
- agent infrastructure (OpenClaw, Mission Control)
- technical troubleshooting
- integration between platforms
- scripting and development
- technical documentation

**Does not handle**:

- strategic decisions about what to build
- content creation or copywriting
- research or intelligence gathering
- project tracking (Operations handles this)

**Current agents**: (to be assigned)

**Model tier**: Opus (reasoning quality matters most)

---

## Routing Guide

Use this guide when deciding which department receives a task.

| If the task involves... | Route to... |
|------------------------|-------------|
| Writing social content | Content |
| Drafting an outreach email | Content |
| Finding gallery opportunities | Research |
| Evaluating a new tool or platform | Research |
| Pricing research for a proposal | Research |
| Checking what is overdue | Operations |
| Weekly priority review | Operations |
| Knowledge base update needed | Operations |
| Building a web page | Build |
| Setting up an automation | Build |
| Fixing a technical issue | Build |
| ArtiFact platform work | Build |

| If the task involves... | Janet handles directly |
|------------------------|----------------------|
| Strategy or prioritization | Yes |
| Opportunity evaluation | Yes |
| Creative direction | Yes |
| Brand positioning decisions | Yes |
| Brainstorming or planning | Yes |

| If the task spans multiple departments... | Route to Jarvis |
|------------------------------------------|----------------|
| Research then Content then Build | Yes — Jarvis coordinates the sequence |
| Content needs research input | Yes — Jarvis routes the dependency |
| Build needs content or design specs | Yes — Jarvis coordinates handoff |

---

## Adding New Departments

When a new department is created:

1. Add it to this registry with scope, handles, does not handle,
   agents, and model tier
2. Update the routing guide
3. Update Jarvis's role file to include the new department
4. Notify Janet of the new capability

Do not create departments without Janet's approval.
