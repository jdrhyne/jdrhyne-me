---
title: "Speed Is Now Even Cheaper While Errors Are Only Getting More Expensive."
description: "Most teams ask if AI can automate a workflow. The better question: What's the error rate you can tolerate, and what happens when you're wrong?"
date: 2026-03-09
tags: ["ai", "agents", "workflow", "enterprise", "accountability", "documents"]
author: "Jonathan D. Rhyne"
---

# Speed Is Getting Cheaper. Errors Are Getting More Expensive.

Everyone is asking the same thing right now:

> Can we automate this with AI?

It's a reasonable question yet often times the wrong first question to ask, especially in enterprises where errors can be very expensive from brand reputation loss, customer expenrience friction, and compliance liability.

The first question in an enterprise should be:

> **How much variance can we tolerate, and what’s the blast radius when we’re wrong?**

That framing sounds less exciting, especially in the age of the magically does everything for you mind-reader agent/AI marketing world we live in. It is also the difference between a cool demo and a system you can actually run and rely on.

Speed is cheaper now yet writing code has been cheap for years now since outsourcing in the early 2000s came to software. Only now, you can buy that speed for a few $200/month plans from your latest AI vendor.

Error, inaccuracy, and generic lack of taste has always been expensive for Enterprises. Error shows up later as rework, escalations, angry customers, audit pain, and sometimes legal liability occur.

## What I keep seeing in the wild

I run a company in document infrastruture and workflow automation, and we see the real plumbing behind "autonomous" systems every day.

Not the polished videos. Actual production flows: approvals, claims, invoices, contracts, regulated records, and humans who still are required to sign their name on outcomes.

The pattern is consistent. Teams adopt AI and get early wins from agent speed, then overgeneralize, then hit a hard boundary where consequences are real. At that point, good ole fashion humans become the cleanup layer.

That’s not autonomy. It's really deferred manual work with much better marketing.

## The operating model I actually use for AI

I bucket AI workflows into three modes.

**Automate** when error tolerance is high, failures are cheap, and rollback is easy.

**Assist** when AI can accelerate the work but a human still needs to approve before anything external happens.

**Avoid full autonomy** when tolerance for error is low and blast radius is high. In those flows, deterministic systems execute and humans remain explicitly accountable.

That’s the mental model. Not academic. Definitely not perfect. But actually drives operational value.

## The 98% trap

A lot of teams hide behind average accuracy. And lets be honest that this is ultimately what you are getting when you abdicate reasoning and tasks to an LLM.

"We’re at 98%."

Great. If the missing 2% lands in legal commitments, payment release, compliance evidence, or regulated reporting, average does not matter nor come near to cutting it.

Tail risk matters. Average accuracy is often a vanity metric that can look good on a board deck or investor update but cause very real problems down the line.

## Agent Communication Protocol is an important step forward. Unfortunately, it still doesn’t close the accountability gap.

I’m bullish on ACP. Interoperability and traceability across agents/tools is a real step forward for agentic workflows.

But the mistake I hear constantly is if we can trace agent actions, then trust is solved.

No.

Traceability tells you how systems interacted. It doesn’t magically generate the accountability artifacts enterprises need. If that was the case, my autonomous car driving system wouldn't shut off 2 seconds before it crashes to avoid liability.

Auditors, legal teams, and finance teams ask very specific questions: who approved what, based on which evidence, under which policy, and whether the record changed afterward. They are focused on the system of accountability not the system of automation.

So in the end these are not just problems for your orchestration lay, they are real accountability problems.

## Why documents still matter (more now, not less)

People keep saying documents are dying. Who needs a document when Agents can read databases.

In high-consequence enterprise workflows, let me tell you, they’re not dying but thriving.

Documents are still the chosen interface where humans review, challenge, approve, sign, and take responsibility. Logs are useful. Dashboards are useful. But neither is the same thing as an approval artifact that anyone can review and defend.

As long as humans are held accountable, enterprise-grade document reliability remains core infrastructure for companies large and small.

## Document reliability is bidirectional

Most conversations stop at extraction quality. AI has really made it much easier to extract unstructured data from PDFs, Images, Word Docs, Excel files and more. Yet that’s half the problem.

Inbound reliability means OCR has to work on ugly real-world inputs (think those beautiful scanned PDFs and wonky images taken in low light), extraction has to be reliable across document types, file types, and various templates, and confidence/provenance need to be explicit.

Outbound reliability means generated docs are correct and policy-conformant, routing/delivery is controlled, and approvals/signatures are verifiable and auditable.

If either side is weak or lossy then humans end up rechecking everything anyway and your automation gains vanish exactly when your risk manifests.

## A practical way to decide

You don’t need a giant framework. Score each workflow for error tolerance, blast radius, reversibility, regulatory exposure, and financial impact per failure.

Then go into map mode.

- *Low combined risk:* automate with monitoring.
- *Medium combined risk:* assist with a human gate.
- *High combined risk:* avoid full autonomy and ensure deterministic execution and explicit sign-off.

You can debate weighting but you can’t skip the decision framework.

## Quick examples

Support triage is usually a strong automate candidate: high volume, reversible errors, low external liability.

Contract lifecycle is usually hybrid: extraction can be automated/assisted, but commitments and signatures still require accountable human control.

Invoice workflows are also hybrid: capture/matching can be automated with confidence thresholds, but exceptions and high-value payment release need explicit approval.

Same company. Same model family. Different risk profile. Different mode.

## What robust systems actually include

In practice, durable systems have a coordination layer (agents/orchestration), a deterministic operations layer (OCR/extraction/redaction/conversion/generation/approval and sign-off), a policy layer (thresholds/routing/escalation), a human accountability layer (decision checkpoints + signer identity + tamper-evident trail), and a feedback layer (drift/override/exception signals).

Most teams overinvest in the first one because it demos well and impresses early, and underinvest in the middle layers where enterprise failure actually occurs.

## What to do this week

Whether you're at a large enterprise or using AI for your own personal assistant, take your top workflows by volume or consequence. Score them by variance tolerance and blast radius. Apply the mental framework of Assign Automate / Assist / Avoid. Add explicit approval gates where accountability is externalized. Move critical document operations out of prompt-only flows and into deterministic tooling. Track exception rate, override rate, confidence quality, and rework time.

Do this once and your roadmap will get clearer.

Do this continuously and you'll be able to move faster without increasing fragility and risk.

## Bottom line

I’m very bullish on agentic systems. We build them for enterprises and use them internally at https://www.nutrient.io daily.

I’m as equally bearish on "just let it run" as an enterprise business strategy.

Autonomy can be delegated.

Accountability can’t unfortunately.

So yes, you should be pushing speed hard or you'll be replaced by someone who is.

Just push it inside the risk boundaries your business can actually afford and be aware of when you are getting wow-ed by perceived speed yet blowing out your risk surface area while doing it.
