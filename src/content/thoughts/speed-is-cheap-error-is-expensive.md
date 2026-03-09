---
title: "Speed Is Cheap. Error Is Expensive."
description: "Most teams ask if AI can automate a workflow. The better question: how much error can you tolerate, and what happens when you're wrong?"
date: 2026-03-09
tags: ["ai", "agents", "workflow", "enterprise", "accountability", "documents"]
author: "Jonathan D. Rhyne"
---

# Speed Is Cheap. Error Is Expensive.

Everyone is asking the same thing right now:

> Can we automate this with AI?

Reasonable question. Wrong first question.

The first question in an enterprise should be:

> **How much variance can we tolerate, and what’s the blast radius when we’re wrong?**

That framing sounds less exciting. It is also the difference between a cool demo and a system you can actually run.

Speed is cheap now. You can buy speed from ten vendors before lunch.

Error is not cheap. Error shows up later as rework, escalations, angry customers, audit pain, and sometimes legal liability.

## What I keep seeing in the wild

I run a company in document and workflow infrastructure, so we see the real plumbing behind "autonomous" systems.

Not the polished videos. Actual production flows: approvals, claims, invoices, contracts, regulated records, and humans who still sign their name on outcomes.

The pattern is consistent. Teams get early wins from agent speed, then overgeneralize, then hit a hard boundary where consequences are real. At that point, humans become the cleanup layer.

That’s not autonomy. That’s deferred manual work with better marketing.

## The operating model I actually use

I bucket workflows into three modes.

**Automate** when error tolerance is high, failures are cheap, and rollback is easy.

**Assist** when AI can accelerate the work but a human still needs to approve before anything external happens.

**Avoid full autonomy** when tolerance for error is low and blast radius is high. In those flows, deterministic systems execute and humans remain explicitly accountable.

That’s the model. Not academic. Not perfect. Operational.

## The 98% trap

A lot of teams hide behind average accuracy.

"We’re at 98%."

Great. If the missing 2% lands in legal commitments, payment release, compliance evidence, or regulated reporting, your average doesn’t matter.

Tail risk matters. Average accuracy is often a vanity metric.

## ACP is important. It still doesn’t close the accountability gap.

I’m bullish on ACP. Interoperability and traceability across agents/tools is a real step forward.

But there’s a category mistake I hear constantly: if we can trace agent actions, then trust is solved.

No.

Traceability tells you how systems interacted. It doesn’t magically generate the accountability artifacts enterprises need.

Auditors, legal teams, and finance teams ask very specific questions: who approved what, based on which evidence, under which policy, and whether the record changed afterward.

That’s not just an orchestration problem. That’s an accountability problem.

## Why documents still matter (more now, not less)

People keep saying documents are dying.

In high-consequence enterprise workflows, they’re not.

Documents are still where humans review, challenge, approve, sign, and take responsibility. Logs are useful. Dashboards are useful. But neither is the same thing as an approval artifact that non-engineers can review and defend.

As long as humans are accountable, document-grade reliability remains core infrastructure.

## Document reliability is bidirectional

Most conversations stop at extraction quality. That’s half the problem.

Inbound reliability means OCR has to work on ugly real-world inputs, extraction has to stay stable across templates/vendors, and confidence/provenance need to be explicit.

Outbound reliability means generated docs are correct and policy-conformant, routing/delivery is controlled, and approvals/signatures are verifiable and auditable.

If either side is weak, humans end up rechecking everything anyway—and your automation gains vanish exactly where risk starts.

## A practical way to decide

You don’t need a giant framework. Score each workflow for error tolerance, blast radius, reversibility, regulatory exposure, and financial impact per failure.

Then map mode.

Low combined risk: automate with monitoring.
Medium combined risk: assist with a human gate.
High combined risk: avoid full autonomy; keep deterministic execution and explicit sign-off.

You can debate weighting. You can’t skip the decision model.

## Quick examples

Support triage is usually a strong automate candidate: high volume, reversible errors, low external liability.

Contract lifecycle is usually hybrid: extraction can be automated/assisted, but commitments and signatures still require accountable human control.

Invoice workflows are also hybrid: capture/matching can be automated with confidence thresholds, but exceptions and high-value payment release need explicit approval.

Same company. Same model family. Different risk profile. Different mode.

## What robust systems actually include

In practice, durable systems have a coordination layer (agents/orchestration), a deterministic operations layer (OCR/extract/redact/convert/generate/sign), a policy layer (thresholds/routing/escalation), a human accountability layer (decision checkpoints + signer identity + tamper-evident trail), and a feedback layer (drift/override/exception signals).

Most teams overinvest in the first one because it demos well, and underinvest in the middle layers where enterprise failure actually happens.

## What to do this week

Take your top workflows by volume or consequence. Score them by variance tolerance and blast radius. Assign Automate / Assist / Avoid. Add explicit approval gates where accountability is externalized. Move critical document operations out of prompt-only flows and into deterministic tooling. Track exception rate, override rate, confidence quality, and rework time.

Do this once and your roadmap gets clearer.

Do this continuously and you can move faster without increasing fragility.

## Bottom line

I’m very bullish on agentic systems.

I’m equally bearish on "just let it run" as an enterprise strategy.

Autonomy can be delegated.

Accountability can’t.

So yes—push speed hard.

Just push it inside risk boundaries your business can actually afford.
