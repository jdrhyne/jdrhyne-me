---
title: "Speed Is Cheap. Error Is Expensive."
description: "Most teams ask if AI can automate a workflow. The better question: how much error can you tolerate, and what happens when you're wrong?"
date: 2026-03-09
tags: ["ai", "agents", "workflow", "enterprise", "accountability", "documents"]
author: "Jonathan D. Rhyne"
---

# Speed Is Cheap. Error Is Expensive.

If you spend enough time in AI circles, you hear the same question on repeat:

> “Can we automate this?”

It sounds reasonable.

It’s also the wrong first question for enterprise systems.

The first question should be:

> **What variance is acceptable, and what’s the blast radius when we’re wrong?**

That framing has saved us from a lot of expensive mistakes.

Because speed is easy to buy now. You can buy it with APIs, models, wrappers, orchestration, and brute force.

But when an AI-driven workflow fails in production, you don’t pay in latency.
You pay in rework, escalations, compliance incidents, and liability.

## The pattern I keep seeing

I run a company in the document and workflow layer, so we sit inside a lot of real production systems.

Not sandbox demos. Real systems with approvals, audits, contracts, invoices, claims, regulated records, and people whose names go on final decisions.

The pattern is consistent:

- Teams get early wins from agent speed.
- They generalize that win too broadly.
- They hit a risk boundary.
- Humans quietly become the cleanup crew.

At that point, you don’t have “autonomy.”

You have a fast error generator upstream of a manual operations queue.

## My working model: Automate / Assist / Avoid

I keep this deliberately simple.

Every workflow goes into one of three buckets:

1. **Automate**
   - High error tolerance
   - Low blast radius
   - Easy rollback

2. **Assist**
   - Medium error tolerance
   - Moderate blast radius
   - Human must approve before external impact

3. **Avoid full autonomy**
   - Low error tolerance
   - High blast radius
   - Deterministic execution + explicit human accountability

That’s the model.

Not perfect. Not academic. Just operational.

And yes, buckets can change over time as systems improve.

## The “98% trap” in one sentence

A system that is 98% accurate can still be unusable in high-consequence workflows.

Average accuracy is a vanity metric when tail risk is what hurts you.

If your 2% failure lands in legal obligations, payment release, disclosure handling, or regulated reporting, the “average” no longer matters.

One wrong output in the wrong place can wipe out months of productivity gains.

## ACP is a good step. It doesn’t remove accountability.

ACP is directionally right.

Interoperability and traceability across agents/tools matters a lot. We should want that.

But there’s a category error I keep hearing:

“Now that we can trace agent actions, we’ve solved trust.”

Not quite.

Protocol traceability tells you how systems interacted.
It does **not** automatically create enterprise-grade accountability artifacts.

Auditors, legal teams, finance teams, and counterparties ask different questions:

- Who approved this specific decision?
- What evidence did they approve against?
- Under what policy?
- Was the record altered after approval?

Those are document/accountability questions, not just orchestration questions.

## Why documents still matter (more than people think)

People keep predicting the death of documents.

In enterprise workflows, that prediction keeps being wrong.

Documents are still where humans review, challenge, approve, sign, and assume responsibility.

That’s not nostalgia. That’s governance.

As long as humans are accountable, you need artifacts that are reviewable by non-engineers and defensible under scrutiny.

Logs are useful.
Dashboards are useful.

But a dashboard is not an approval artifact.

## Document reliability is bidirectional

This is where a lot of AI strategy discussions stay too shallow.

“Document reliability” is not just extraction quality.

You need both sides to be reliable:

### 1) Inbound reliability
- OCR works across messy, real-world source docs
- Extraction is stable across templates/vendors
- Field-level confidence + provenance is explicit

### 2) Outbound reliability
- Generated docs are correct and policy-conformant
- Routing and delivery are controlled
- Approvals/signatures are auditable and verifiable

If either side breaks, humans end up rechecking everything manually.

Which means speed gains disappear exactly where you thought you had leverage.

## A practical way to score workflows

You don’t need a giant framework to start.

Score each workflow 1–5 on:

- **Error tolerance** — how wrong can this be before harm?
- **Blast radius** — how far does a bad decision propagate?
- **Reversibility** — how easy is rollback/remediation?
- **Regulatory exposure** — external audit/compliance consequences?
- **Financial impact per failure** — direct and indirect cost

Then map mode:

- **Low combined risk** → Automate (with monitoring)
- **Medium risk** → Assist (human gate required)
- **High risk** → Avoid full autonomy (deterministic + accountable sign-off)

Can you overfit this? Sure.

Can you skip it? Not if you care about production reliability.

## Concrete examples

### Support triage
- High volume, reversible, low external liability
- **Mode:** Automate heavily + periodic QA sampling

### Contract lifecycle
- Clause extraction and categorization can be automated/assisted
- Acceptance, obligation commitments, and signatures need accountable control
- **Mode:** Hybrid (Automate/Assist + strict approval/signature gates)

### AP invoice processing
- Data capture/matching can be automated with confidence thresholds
- Exception handling and high-value payment release cannot be blind automation
- **Mode:** Automate + Assist + explicit human release checkpoints

Same AI stack. Different risk profile. Different operating mode.

That’s the whole point.

## What robust systems look like in practice

If you want this to survive enterprise reality, you need five layers working together:

1. **Coordination layer**
   - Agents, tools, orchestration protocols (ACP and similar)

2. **Deterministic operations layer**
   - OCR, extraction, redaction, conversion, generation, signing
   - This is where correctness constraints live

3. **Policy layer**
   - Confidence thresholds
   - Routing rules
   - Exception and escalation logic

4. **Human accountability layer**
   - Explicit decision checkpoints
   - Clear signer identity
   - Tamper-evident audit trail

5. **Feedback/control layer**
   - Drift monitoring
   - Override/exception metrics
   - rollback playbooks

Most teams over-invest in layer 1 because it’s visible and exciting.

Most failures I’ve seen come from under-investment in layers 2–4.

## What to do this week (not next quarter)

If your team is actively building agentic workflows, do this now:

1. List your top 10 workflows by volume or business impact.
2. Score each workflow on variance tolerance + blast radius.
3. Assign each to Automate / Assist / Avoid full autonomy.
4. Add approval checkpoints where accountability is externalized.
5. Move critical document operations out of prompt-only flows into deterministic tooling.
6. Track confidence, exception rates, override rates, and rework time.

Do this once and your roadmap gets clearer.

Do it continuously and your system gets faster without becoming more fragile.

## Bottom line

I’m bullish on agentic systems.

I’m also very bearish on “just let it run” as an enterprise operating model.

Autonomy can be delegated.

Accountability can’t.

So yes, push speed hard.

Just make sure you’re pushing speed inside risk boundaries that your business can actually afford.
