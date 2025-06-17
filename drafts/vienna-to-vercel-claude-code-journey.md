---
title: "From Vienna Street Signs to Vercel: How I Built My Site with Nothing but Vibes and Claude Code"
date: 2025-06-16
tags: [ai, development, astro, design, vibe-coding]
description: "Two photos from Vienna, three hours of conversation with AI, and zero manual coding. This is how I built jdrhyne.me entirely through Claude Code."
excerpt: "What happens when you refuse to write a single line of code manually and instead build an entire website through conversation? You get a Vienna-inspired theme, some wild AI creativity, and a site that's live in under 3 hours."
categories: ["Development", "AI"]
author: "Jonathan D. Rhyne"
---

# From Vienna Street Signs to Vercel: How I Built My Site with Nothing but Vibes and Claude Code

*June 16, 2025*

## TL;DR

I built my entire personal website by talking to Claude Code, refused to write any code manually (even when CSS alignment made me question my sanity), and discovered that two random photos from Vienna could inspire an entire design system. Total time: 3 hours. Manual code written: 0 lines. Lessons learned: countless.

## The Setup: A Challenge Born from Stubbornness

Here's the thing about being a developer in 2025: we're all secretly wondering if AI will replace us. So I decided to run an experiment. Could I build an entire website—theme, content, deployment, everything—without writing a single line of code myself?

The rules were simple:
1. Only conversation with Claude Code allowed
2. No manual code edits (no matter how tempting)
3. Must result in a production-ready site

What followed was equal parts fascinating, frustrating, and occasionally hilarious.

## Act I: The Vienna Connection

My journey started with what I thought was a clear vision. "I want an Astro theme inspired by old German WWII typography," I told Claude Code, "something minimalist and stark."

What I got back looked like a propaganda poster had a baby with a warning label. Dark yellows, aggressive reds, and grays that made me feel like I was about to read bad news. Technically correct, emotionally catastrophic.

That's when I remembered two photos on my phone from a recent Vienna trip:
- A pristine white-on-black subway sign from Schönbrunn station
- A typical Vienna street sign with that distinctive Austrian typography

"Here," I said to Claude, uploading the images. "THIS is what I mean."

```css
/* What Vienna taught Claude Code */
--font-heading: 'Oswald', sans-serif;
--font-body: 'Work Sans', sans-serif;
--color-accent: #c13127;  /* That perfect Austrian red */
```

The transformation was immediate. Claude analyzed the typography, found matching Google Fonts, and suddenly we were building Volks-Typo—a theme that actually captured what I'd envisioned.

## Act II: The Three-Theme Disaster

Success with the initial theme made me cocky. "You know what? Let's make three variations. Give users options."

Claude Code, ever the eager assistant, complied. It built a theme switcher, created three distinct variations, and for about 15 minutes, I felt like a design genius.

Then the wheels came off.

CSS classes started bleeding between themes. Global styles showed up where they shouldn't. Claude began confusing which styles belonged to which variation. Watching it try to untangle the mess was like watching someone try to separate eggs after making an omelet.

```bash
# My git history during the three-theme experiment
git revert HEAD~12  # Nuclear option activated
```

Lesson learned: Just because you can doesn't mean you should. Back to one theme we went.

## Act III: The Padding Wars

If you want to humble both yourself and an AI, ask it to align things perfectly with CSS. What followed was an epic battle between Claude Code and the concept of consistent spacing.

Me: "The sidebar padding doesn't match the main content."
Claude: *adjusts sidebar padding*
Me: "Now the header is off."
Claude: *fixes header, breaks footer*
Me: "The footer is—"
Claude: "I KNOW. Let me try something..."

At one point, Claude got creative and implemented Puppeteer to take screenshots and run visual tests. Did it fix the alignment? No. Did I respect the hustle? Absolutely.

```javascript
// Claude's attempt at automated visual testing
// Spoiler: It didn't work, but A+ for creativity
await page.screenshot({ path: 'alignment-test.png' });
// Complex image analysis followed...
```

The temptation to just open VS Code and fix it myself was overwhelming. But I'd made a commitment. No manual code. Period.

After what felt like a doctoral dissertation's worth of prompts about spacing, we finally achieved pixel perfection.

## Act IV: The jdrhyne.me Speedrun

With Volks-Typo complete and submitted to the Astro theme directory (accepted on the first try, thank you very much), it was time to build my actual site.

"Pull Volks-Typo from GitHub and let's make it mine," I told Claude.

What happened next was magical. Claude grabbed the theme and immediately started personalizing it. But here's where I got creative—I brought ChatGPT into the conversation for content generation.

"Use everything you know about me to write my bio," I asked ChatGPT.

The response was unnervingly accurate. It knew about my kids, my beach trips, details that made me wonder if I should be more careful about my digital footprint. But it also crafted the perfect tagline: **"Code, Curiosity, and Continuous Growth—Scaling Ideas Beyond Paper."**

## Act V: The Deployment Dance

Claude initially set everything up for GitHub Pages. It worked, but waiting 10-15 minutes for deployments felt like dial-up internet in 2025.

"Let's use Vercel," I said.

What followed was a masterclass in AI-assisted deployment:

```bash
# Claude's Vercel deployment checklist
✓ Build configuration set
✓ Environment variables configured
✓ Custom domain connected
✓ DNS records updated
✓ Email forwarding enabled
✓ SSL certificate provisioned
```

Total time from "I want Vercel" to live site: 30 minutes.

## The Final Numbers

- **Theme development time**: ~8 hours (including the three-theme detour)
- **Personal site creation**: Under 3 hours
- **Manual code written**: 0 lines
- **Times I wanted to break my no-code rule**: 47 (approximately)
- **Times I actually broke it**: 0

## What Vibe Coding Taught Me

This experiment revealed something profound about modern development. Claude Code wasn't just a code generator—it was a conversational partner that could reason, experiment, and occasionally fail in creative ways.

The Vienna street signs that inspired this journey remind me that the best development happens at the intersection of human creativity and AI capability. I provided the vision, the constraints, and the stubborn refusal to write code. Claude provided implementation, iteration, and infinite patience.

## The Unexpected Benefits

1. **Forced Clarity**: Explaining what you want in words makes you think harder about what you actually want.
2. **Creative Solutions**: Claude's Puppeteer testing attempt, while unsuccessful, was more creative than what I would have tried.
3. **Speed**: When you're not context-switching between conversation and coding, things move fast.
4. **Learning**: I learned new approaches by watching Claude solve problems differently than I would have.

## The Plot Twist

Here's the thing nobody tells you about AI-assisted development: it's not about the AI replacing you. It's about having a conversation with a very capable intern who happens to know every programming language and never gets tired.

Would I have written better CSS for the padding issues? Maybe. Would I have built the entire site in 3 hours? Definitely not.

## What's Next?

As I write this in my Claude Code-built editor (yes, we built a custom editor too—that's another story), I'm already planning the next vibe-coded project. 

The rules remain the same: no manual code, just conversation. Because sometimes the best way to build something is to simply describe it to someone (or something) that can make it real.

To anyone considering pure AI-assisted development: bring references (Vienna street signs work great), commit to the bit (no cheating with manual edits), and prepare for an interesting journey.

Just maybe skip the three-theme variation idea. Trust me on that one.

---

*Built entirely through conversation with Claude Code, powered by Volks-Typo, inspired by Vienna, and deployed faster than my old site's build times. Not a single line of code was manually written in the making of this website.*

**Want to try vibe coding?** Start with a clear vision, some reference images, and an unreasonable amount of patience for CSS alignment. You might just build something better than you imagined.