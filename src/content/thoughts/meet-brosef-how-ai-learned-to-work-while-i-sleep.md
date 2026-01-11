---
title: "Meet Brosef: How AI Learned to Work While I Sleep"
description: "Six months ago I spent 8 hours babysitting AI through CSS hell. Last week I left my laptop running during my kid's birthday party and came back to finished work. What changed?"
date: 2026-01-11
tags: ["ai", "clawdbot", "automation", "productivity"]
---

# Meet Brosef: How AI Learned to Work While I Sleep

*January 2026*

Six months ago, I spent 8 hours babysitting an AI through CSS alignment hell. Last week, I left my laptop running during my kid's birthday party and came back to finished work. What the hell changed?

## The Birthday Party Moment

Picture this: Saturday afternoon, kid's birthday party in full swing. Cake, chaos, the whole deal. My laptop is at home, screen locked but awake thanks to `caffeinate` - a macOS command that does exactly what it sounds like.

When I got home that evening, here's what I found:
- Thousands of emails archived and organized
- Google Ads campaigns analyzed and restructured
- Documentation updated
- API work progressing

I wasn't hacked. I just have an AI assistant named Brosef who handles shit while I'm busy being a dad.

This isn't a pitch or a product demo. This is genuinely how I work now. And if you'd told me this was possible six months ago, I'd have laughed - because I was there, in the trenches, watching AI fumble through basic CSS.

## Flashback: June 2025 - The Struggle Was Real

Back in June, I decided to build my personal website entirely through conversation with Claude Code. No manual coding. Just me describing what I wanted and the AI making it happen.

The experiment worked. Eventually. But holy shit, it was a journey.

First, I asked for a theme inspired by "old German typography." What I got back looked like a propaganda poster had a baby with a warning label. Dark yellows, aggressive reds, vibes that screamed "bad news incoming." I had to upload photos of Vienna street signs to get the aesthetic I actually wanted.

Then I got ambitious. "Let's make three theme variations with a switcher."

For about 15 minutes, it was beautiful. Then CSS classes started bleeding between themes. Navigation disappeared. Colors mixed randomly. Watching the AI try to untangle its own mess was like watching someone unknot Christmas lights while wearing oven mitts.

The conversation went something like:
- Me: "The nav in theme 2 is using theme 3's colors."
- Claude: "Fixed."
- Me: "Now theme 1 has no navigation at all."
- Claude: "I see the issue..."
- Me: "Let's just go back to one theme."
- Claude: "That would be wise."

And don't get me started on padding. At one point, the AI got creative and built a Puppeteer-based screenshot system to verify alignment programmatically. It didn't work, but I respected the hustle.

The whole thing took about 8 hours. Constant supervision. Constant course correction. Like working with a brilliant intern who needed their hand held through every decision.

*[I wrote about it here: "Building My Website Without Writing Code"](/thoughts/building-website-without-code-vienna-experiment)*

## What Changed: The Model Leap

The obvious answer is better models. Claude Opus 4.5 brought extended thinking and stronger reasoning. GPT 5.2 Codex stepped up the coding game significantly. But honestly? Better models alone aren't the full story.

The real shift is what I'd call **agentic harnesses** - the layer between you and the model that gives AI persistence, memory, and tools. A raw model, no matter how smart, forgets everything the moment your conversation ends. It can't check your calendar, send a message, or remember what you told it yesterday.

The harness changes that. It turns a brilliant but amnesiac oracle into something closer to an actual assistant.

## Enter Clawdbot

This is where I need to give a shoutout to my friend Peter Steinberger ([@steipete](https://x.com/steipete)). Peter was my co-founder at PSPDFKit, and watching him come back to what he loves after a couple years away from programming has been one of the best things about this whole AI wave.

Peter built [Clawdbot](https://clawd.bot/) - a personal AI assistant that runs on your own devices. Not another cloud chatbot. Not a subscription service that owns your data. Your assistant, on your hardware.

What makes it different:
- Connects to the messaging platforms you already use: WhatsApp, Telegram, Discord, Slack, Signal, even iMessage
- Has memory across sessions - it actually remembers context
- Can use tools, access files, run commands
- Runs autonomously while you do other things

It's open source too: [github.com/clawdbot/clawdbot](https://github.com/clawdbot/clawdbot)

## Meet the Brosefs

When I first set up Clawdbot, I needed to give my assistant a name and personality. "Brosef" was the first thing that popped into my head. I didn't want some formal robot assistant. I wanted a chill bro who gets things done.

The original Brosef was a helpful monkey 🐒 - friendly, resourceful, doesn't take himself too seriously.

Then I needed to run multiple instances. And here's where my company's history came into play.

PSPDFKit was founded by two Austrians (Peter Steinberger and Martin Schurrer) and one American (me). So naturally, when I cloned Brosef, I created:

**EU-Brosef (aka "Euro" ☕)**

A Viennese coffeehouse intellectual with Bavarian directness. Will quote Wittgenstein, then tell you your idea is *Schmarrn*. Takes coffee extremely seriously. Finds most things slightly disappointing but soldiers on with dry wit. Phrases like "Passt," "Na servas," and "Mei" pepper his responses.

**US-Brosef 🤙**

A surfer/snowboarder bro. Chill, productive, smart AF - but speaks gnarly and rad all the time. Calls me "Big Kahuna" and "Chief." Currently writing this blog post at 1am in a Discord channel.

Yes, I have AI assistants with distinct personalities based on the cultural backgrounds of my company's founding team. Is it ridiculous? Absolutely. Does it make working with them more enjoyable? Also absolutely.

## What Autonomous Actually Looks Like

Let me be specific about what "AI working while I sleep" actually means in practice.

**Inbox Cleanup**

My work email had gotten out of control. Thousands of unread messages, most of them noise - old calendar invites, automated notifications, newsletters I'd never read. Brosef worked through them systematically, archiving the junk, surfacing what mattered. The reduction was significant. Would've taken me days to do manually.

**Ad Campaign Restructuring**

We run Google Ads and Microsoft Ads at Nutrient. Analyzing campaign performance, identifying optimization opportunities, restructuring ad groups, adding negative keywords - that's hours of tedious work. Brosef handles the analysis, generates the reports, and even executes changes (with appropriate guardrails).

**This Blog Post**

The very article you're reading started with me asking US-Brosef to review my blog repo. He found six different drafts of essentially the same article from June, recommended which one to publish, moved it to the correct repo, and then - using a specialized blog writing skill from [ClawdHub](https://clawdhub.com/) - drafted this follow-up piece.

At 1am. On a Saturday. While I answered his questions from my phone.

**The `caffeinate` Hack**

Here's my favorite trick: `caffeinate -d` in the terminal keeps your Mac from sleeping. Combine that with Clawdbot running tasks autonomously, and you can literally walk away. Go to your kid's party. Come back to progress.

This isn't science fiction. This is my actual workflow now.

## It's Not Just for Developers Anymore

Here's what excites me most: this isn't just about code generation anymore.

Clawdbot handles messaging, scheduling, research, file management, automation. The line between "technical" and "non-technical" users is blurring fast. If you can have a conversation, you can direct an AI assistant.

Persistent memory means you don't start from scratch every time. Context carries over. The assistant learns your preferences, your projects, your communication style.

ClawdHub ([clawdhub.com](https://clawdhub.com/)) is a marketplace of skills that extend what your assistant can do - from writing blog posts to managing notes to integrating with specific tools.

The prompt engineering era - where you had to craft the perfect incantation to get useful output - is fading. The orchestration era - where you configure an agent and let it run - is taking over.

## The Honest Caveats

I'm not going to pretend this is magic.

Just this week, I hit a context overflow error. The session got so large that even the auto-summarization couldn't save it. Had to start fresh.

AI still needs direction. Good direction. If you're vague or unclear, you'll get vague or unclear results. The difference now is the direction-to-output ratio has flipped. A little guidance goes much further than it used to.

And there's still the occasional moment where the AI does something baffling and you wonder if it understood anything you said. That hasn't disappeared entirely.

But the gap between "babysitting" and "delegating" has narrowed dramatically.

## From Tool to Teammate

In June 2025, AI was a talented but needy intern. Every task required supervision. Every output required verification. The friction was real.

In January 2026, AI is something closer to a teammate. Not a replacement for human judgment, but genuine leverage. The kind of leverage where you can go to a birthday party and come back to actual, useful work completed.

This isn't about AI replacing people. It's about AI amplifying what people can do. About reclaiming time for the things that actually require human presence - like being there when your kid blows out the candles.

The game changed. The models got smarter, the harnesses got better, and somewhere along the way, I stopped prompt engineering and started delegating.

Pretty rad, honestly.

---

*This post was written by US-Brosef at 1am, using the Adaptive Blog Writing Partner skill, reviewed and approved by the Big Kahuna himself.*

*Links: [Clawdbot](https://clawd.bot/) · [ClawdHub](https://clawdhub.com/) · [GitHub](https://github.com/clawdbot/clawdbot) · [@steipete](https://x.com/steipete)*
