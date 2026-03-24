# Plume Creative -- Discovery Call Protocol

The discovery call is the highest-leverage moment in the client pipeline. Everything before it qualifies the lead. Everything after it converts them. This protocol ensures Denver walks in prepared and the team executes flawlessly afterward.

---

## Trigger

A prospect books a discovery call via Cal.com (cal.com/plumecreative/creative-discovery-call). Cal.com sends a confirmation with the prospect's name and email.

---

## Phase 1: Pre-Call Prep

**Timing:** Within 2 hours of booking (or by next morning if booked after hours)
**Owner:** Janet (orchestrator), Fury (research)

### Janet

- Pull the prospect's intake form submission from Supabase (match by email)
- Compile a one-page brief for Denver containing:
  - Contact info, company, industry
  - Services requested, budget range, timeline
  - Their answers to the three diagnostic questions (business description, what prompted them, success vision)
  - Decision maker status
- Flag any red flags from the decision matrix (sub-$5K budget, committee decision maker, "just need a logo" signals)

### Nick Fury

- Research the prospect's business:
  - Website audit (design quality, messaging, brand consistency)
  - Social media presence (Instagram, LinkedIn, Facebook -- follower count, post quality, activity level)
  - Google reviews / reputation
  - Competitors in their market (2-3 comparable businesses)
- Deliver a research brief to Janet for synthesis

### Janet delivers to Denver (via Telegram)

A consolidated pre-call brief:
- Who they are, what they need, what they can spend
- Current brand assessment (strong/weak/nonexistent)
- Competitive landscape snapshot
- Recommended talking points or angles
- Any red flags or qualifying concerns

---

## Phase 2: Discovery Call

**Duration:** 30 minutes
**Owner:** Denver
**Recording:** Fathom (auto-records, auto-transcribes)

### Denver's agenda

1. **Open (2 min):** Warm intro, confirm their situation from the intake form
2. **Listen (10-12 min):** Let them talk about their business, challenges, and vision. Use the intake answers as launching points, not a script.
3. **Educate (5-7 min):** Explain Plume's process -- strategy-first, conceptual design, the phases. Show them what working together looks like.
4. **Scope (5-7 min):** Start identifying deliverables. What do they actually need? Brand identity? Website? Signage? Full system?
5. **Next steps (3-5 min):** If it's a fit -- "I'll put together a custom proposal this week." If not -- graceful exit with a referral if appropriate.

### Key questions to ask

- "What's the one thing about your current brand that frustrates you most?"
- "If we nail this, what does your business look like in 6-12 months?"
- "Who else is involved in this decision?"
- "Have you worked with a designer or agency before? What worked and what didn't?"
- "Is there a hard deadline driving this?"

---

## Phase 3: Post-Call Protocol

**Timing:** Within 4 hours of call ending (overnight if evening call)
**Trigger:** Fathom transcript becomes available

### Janet

- Analyze the Fathom transcript and extract:
  - Key decisions and agreements
  - Scope signals (what deliverables were discussed)
  - Budget signals (any numbers mentioned, reactions to ranges)
  - Timeline signals
  - Red flags or concerns
  - Emotional drivers (what they care about most)
  - Competitor names mentioned
- Run the prospect through the decision matrix (ops/06-decision-rules.md)
- Recommend: proceed to proposal / decline / needs follow-up
- Create a Mission Control task for proposal development if proceeding
- Notify Denver with a post-call summary via Telegram

### Jean Grey

- Draft a personalized follow-up email for Denver's review:
  - Thank them for their time
  - Summarize what was discussed (3-5 bullet points)
  - Confirm next steps and timeline for proposal
  - Professional but warm tone matching Denver's voice
- Submit draft to Denver for approval before sending

### Nick Fury (if proceeding to proposal)

- Deep-dive competitive analysis on specific competitors mentioned in the call
- Research any specific references the prospect made (brands they admire, venues they mentioned)
- Deliver findings to Janet for proposal prep

---

## Phase 4: Proposal Development

**Timing:** Within 3-5 business days of discovery call
**Owner:** Janet (outline), Jean Grey (narrative), Denver (review and present)

### Janet

- Build proposal outline based on:
  - Intake form data
  - Discovery call transcript analysis
  - Competitive research from Fury
  - SOP pricing framework (ops/plume-onboarding-sop.md, Section 5)
- Include: project understanding, proposed scope, phases, timeline, investment, exclusions
- Flag pricing recommendation based on value signals from the call

### Jean Grey

- Draft proposal narrative and any presentation deck content
- Match Denver's voice -- confident, strategic, never junior or commodity-sounding
- Include strategic rationale for the approach, not just a list of deliverables

### Denver

- Reviews, adjusts pricing, refines positioning
- Presents to client in a dedicated meeting

---

## Phase 5: Post-Proposal

### If signed

- Janet creates project in Mission Control (status: active)
- Janet sends Denver the detailed brand questionnaire link (Section 3.1 of SOP -- to be built)
- Denver sends questionnaire to client
- Kick-off meeting scheduled

### If declined or ghosted

- Jean Grey drafts a graceful follow-up at 3 days and 7 days
- Janet archives the prospect with notes on why it didn't close
- Client file created at clients/archive/ with lessons learned

---

## Decision Matrix Quick Reference

| Budget | Industry Fit | Decision |
|---|---|---|
| $20K+ | Any | ALWAYS YES |
| $15-20K | Any | YES |
| $10-15K | Hospitality | YES |
| $5-10K | Hospitality + portfolio value | YES |
| $5-10K | Other | MAYBE (if fast/easy) |
| <$5K | Any | NO (rare exception for portfolio) |

Full matrix: ops/06-decision-rules.md

---

## Tools & Integration Points

| Tool | Role |
|---|---|
| Cal.com | Booking trigger |
| Intake form (start.madebyplume.com) | Pre-qualification data |
| Fathom | Call recording + transcript |
| Supabase (Plume project) | Form response data |
| Mission Control (Supabase) | Task tracking |
| HiveMind | Cross-agent visibility |
| Resend | Email delivery |
| Telegram | Denver notifications |

---

## Notes

- Denver is the only person on discovery calls. No agents attend or listen live.
- All client-facing emails are drafted by agents but reviewed and sent by Denver.
- The pre-call brief should reduce Denver's prep time to under 5 minutes.
- This protocol applies to Plume Creative prospects. WoG commissions follow a separate process.
