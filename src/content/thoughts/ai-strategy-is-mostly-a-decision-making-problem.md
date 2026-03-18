---
title: "AI Implementation Issues Are Mostly Decision-Making Problems"
description: "Most companies don’t fail at AI because the models are no capable yet. They fail because they can’t distinguish reversible decisions from irreversible ones and apply the right execution framework to them."
date: 2026-03-18
tags: ["ai", "strategy", "leadership", "decision-making", "agents", "enterprise"]
categories: ["AI", "Leadership", "Operations"]
author: "Jonathan D. Rhyne"
---

# AI Implementation Issues Are Mostly Decision-Making Problems

Most, if not all, companies today are discussing their AI strategy or need for one yet are thinking about it entirely wrong. They start first asking what harness or model provider they should use. Yet they should first be working on their decision framework for where and how to apply AI to those tasks.

Today, it's very easy access and affordable to buy access to the latest frontier models. You can vibe code an app together and implement an agent harness like OpenClaw rather quickly. When before it took months or quarters to stand up vendors and onboard tools, you can do this today in hours or days. None of that however will save you if your company can’t decide what tasks it should move fast on and what tasks you should move more carefully or not even touch with AI. I wrote more about this problem last week here [Speed is Cheap, Error is Expensive](https://www.jdrhyne.me/thoughts/speed-is-cheap-error-is-expensive).

That’s where most individuals, companies and teams are stuck right now. 
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">stop what you&#39;re doing and look at this image.<br><br>each dot is 3.2 million people. 2,500 dots = 8.1 billion humans.<br><br>the grey? 6.8 billion people who have never used AI.<br>the green? 1.3 billion free chatbot users.<br>the yellow? 15-35 million who pay for it.<br>the red? that tiny sliver is… <a href="https://t.co/NTAcgvj2Kt">https://t.co/NTAcgvj2Kt</a> <a href="https://t.co/1oJqbV1DM3">pic.twitter.com/1oJqbV1DM3</a></p>&mdash; Nozz (@NoahEpstein_) <a href="https://twitter.com/NoahEpstein_/status/2025605338779496797?ref_src=twsrc%5Etfw">February 22, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

They've piloted AI tooling and distributed it to their teams. They built activity and have tons of demos. But they haven't built an decision architecture to apply to AI decisions.

And yes, these are very different things.

A company will approve a massive acquisition in six weeks, then spend four months debating whether an internal agent can be trusted to auto-triage support tickets or insert whatever low-level decision can't make it through the corporate process quagmire. That’s not because these decisions are harder. It’s because nobody has classified the decision correctly and therefore, everything gets dragged into the same process gravity well. To be clear, this was already a problem before AI and Agents and in good time, people will find out how much this gap will cost them in this new technology world if they aren't already finding out.

### The Gift of the Amazon Shareholder Letters ###

Mark Twain said, history doesn't repeat itself but it rhymes. Jeff Bezos mapped out this exact problem cleanly years ago. In his 1997 letter to Amazon shareholders, the core principles were long-term orientation, customer obsession, and willingness to be misunderstood while building. In his 2015 letter, he put sharp language around decision types: Type 1 decisions are one-way doors and deserve heavy process; Type 2 decisions are two-way doors and should move quickly with decisions made at the lowest level. In 2016, he went further and turned that into operating behavior: don’t wait for perfect information, disagree and commit, escalate real misalignment fast.

That progression still holds up today even more so with the arrival of Agents: principles first, decision taxonomy second, execution mechanics third.

The failure mode hasn't changed either. Larger organizations slowly start using Type 1 decision process for Type 2 decisions. They call it rigor. It feels responsible and safe. But in reality all does is slow and kills the organization's speed of learning when most startups know feedback loops and the speed at which your org can learn is truly your only moat. In this LLM era we have entered, that drag on learning speed compounds faster than ever before.

Now add agents. Not just chatbots like ChatGPT but actual agents that can and are running loops, keeping memory (read logs), calling tools, and increasily coordinating with other agents and subagents, trying to operate and execute under scoped permissions. If you believe the hype train, soon enough, many of these Agents will execute bounded financial actions and acquire identities too. At that point, “AI strategy” will not be just about clever prompt techniques. It becomes about institutional design built around your ability to audit, control, and securely operate a fleet of them. You'll quickly be deciding what can and will get delegated, what will remain human-accountable, and what must never be allowed or tolerated to drift. That is essentially company operational design, not model or harness selection.

So here’s the practical split based on Bezos' Type 1 and Type 2 decision framework:

- Decisions around identity boundaries, permissions, retention and compliance posture, override controls, and financial authority are one-way-door Type 1 territory. If you get those wrong, you are buying long-tail risk with real legal, compliance, and operational blast radius. Those decisions need deliberate process, clear ownership and deterministic output.
- Decisions around what models to use, what prompts, what harnesses, what routing heuristics, retrieval tuning, internal collaboration patterns, even what vendors to use that the consequences of fall under non-critical thresholds are mostly two-way doors, Type 2 decisions. If you’re not interating and running those quickly with instrumentation, metrics, within evaluation frameworks than you are falling behind and conceding a compounding advantage to faster competitors and startups.

You can absolutely fail on both sides. Over-govern the reversible decisions and you become slow, risk-adverse, and performative. Under-govern the irreversible decisions and you end up explaining preventable incidents to your board, your customers, and maybe regulators. Neither outcome is strategic and the operating fix is boring on purpose. 

### What should you do?

1) Build a lightweight decision log to categorize each AI decision;
2) Force each meaningful decision to declare its decision type, owner, decision SLA, rollback path, and how success/failure will be measured; 
3) Then run two cadences in parallel: slower governance for one-way doors, faster experiment loops for two-way doors.

This sounds simple because it is. Most companies just stop doing it as they scale and devolve to risk-adversion and watch their innovation rate stagnant often not knowing why. They try to solve decision confusion with bigger committees, more architecture diagrams, and longer policy docs. They get more decisions makers involved then stakeholders then the meetings to plan the meetings start. And it feels like progress because it creates activity and motion yet don't be fooled, this is not progress.

If you want a practical 30-day reset, start by mapping the last five decisions your company made around AI (or are actively avoiding). You’ll probably find the same pattern I have seen even in my own startup: a handful of high-consequence decisions were under-specified, while a pile of low-consequence decisions were over-processed, met about, discussed about, and thought about ad-nausem.

If you can fix that split and then you, your team, and your organization changes quickly. Individuals stop waiting for permission they don't need. Teams stop fighting over who won the last few decisions and focus begin focus on impact rather than politics. Security, governance, and operation teams start focusing where they actually add risk-adjusted value. Leadership gets more time back and cleaner visibility into where speed is safe and where caution is mandatory.

That is what a real AI strategy looks like.

Not “which model or vendor do we onboard.”
Not “how many pilots did we launch.”
Not “how many AI features shipped this quarter.”

Those are output metrics and while they matter, they are downstream. The upstream question is far harder and more consequential:

**Can your company reliably tell the difference between a reversible decision that AI can speed up and an irreversible one that maybe AI should only augment or be avoided completely?**

If the answer is no, your strategy will at best result in AI productivity theater and at worst, cost your company revenue, profitability, and brand trust and reputation.

If the answer is yes, you have a real true advantage that compounds at a time when most people are not even aware it exists.

Because the winners in this cycle won’t just be the teams with the smartest models or using it the most but they'll be the teams with the clearest decision systems and strategy based around them.
