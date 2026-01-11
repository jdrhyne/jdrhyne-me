---
title: "Building My Website Without Writing Code: A Vienna-Inspired Experiment"
description: "I built jdrhyne.me entirely through conversation with Claude Code. No manual coding. Here's what worked, what failed, and what surprised me."
date: 2025-06-16
tags: ["ai", "development", "astro", "claude-code"]
---

# Building My Website Without Writing Code: A Vienna-Inspired Experiment

*June 16, 2025*

I've been writing code for years. I know CSS inside out. But I wanted to test something: Could I build an entire website through conversation alone?

Not because I couldn't code it myself. But because I wanted to see if describing what I wanted could be as effective as writing it.

The website you're reading right now is the result. Built entirely through dialogue with Claude Code in about three hours. Here's how it happened.

## The Initial Vision (That Failed)

I started with what seemed like a clear request:

```
Me: "I want to build an Astro theme inspired by old German WWII 
     typography. Minimalist. Stark. Clean lines."

Claude: "I understand. Let me create that for you..."
```

What came back was technically what I asked for, but it wasn't what I wanted. Dark yellows. Muddy grays. Aggressive reds. It looked depressing.

I realized my description was the problem. I was trying to describe a visual concept with words, and those words carried baggage I hadn't intended.

## The Vienna Photos That Changed Everything

Then I remembered two photos on my phone from a recent Vienna trip:
- One from the Schönbrunn U-Bahn station
- Another of a typical Vienna street sign

Instead of trying to describe what I wanted, I showed it:

```
Me: "Forget what I said. HERE's what I mean." 
    *uploads photos*

Claude: "Ah, I see. Analyzing the typography now..."
```

Claude immediately identified the font characteristics and matched them with available web fonts. We went from abstract descriptions to concrete implementation:

```css
:root {
  --font-heading-primary: 'Oswald', sans-serif;
  --font-heading-secondary: 'Roboto Condensed', sans-serif;
  --font-body: 'Work Sans', sans-serif;
  --color-accent: #c13127;  /* That Vienna red */
}
```

The Volks-Typo theme was born. Not from a design brief, but from two tourist photos.

## Learning When Less Is More

Success with the initial theme made me ambitious. I asked Claude to create three theme variations with a switcher.

For about 15 minutes, it looked great. Then the problems started:
- CSS classes bleeding between themes
- Global styles overriding local ones
- Navigation components getting mixed up

The conversation became a debugging nightmare:

```
Me: "The nav in theme 2 is using theme 3's colors."
Claude: "Let me fix that... Done."
Me: "Now theme 1 has no navigation at all."
Claude: "I see the issue. Attempting to resolve..."
Me: "Let's just go back to one theme."
Claude: "That would be wise."
```

Sometimes the best feature is the one you don't build.

## The CSS Alignment Challenge

Want to test an AI's limits? Ask it to align CSS elements perfectly.

What followed was an extended back-and-forth about padding and margins:

```
Me: "The sidebar padding doesn't match the main content."
Claude: "Adjusting sidebar padding to match..."
Me: "Now the header is off."
Claude: "Fixing header alignment..."
Me: "The footer is now floating."
```

At one point, Claude actually built an automated screenshot system with Puppeteer to try to verify alignment programmatically. It didn't work, but I appreciated the creative problem-solving.

The temptation to just open VS Code and fix it myself was strong. But I'd committed to building through conversation only. Eventually, we got there.

## From Theme to Personal Site

With Volks-Typo working and accepted into the Astro theme directory, I moved on to building jdrhyne.me:

```
Me: "Pull Volks-Typo from GitHub. Let's make it mine."
Claude: "Cloning repository and personalizing..."
```

I brought ChatGPT into the process to help with content:

```
Me to ChatGPT: "Use everything you know about me to write 
                bio and tagline for my personal site."
```

The tagline it generated—"Code, Curiosity, and Continuous Growth—Scaling Ideas Beyond Paper"—captured what I wanted to convey.

## Deployment: From GitHub Pages to Vercel

Claude initially set up GitHub Pages with Actions. It worked, but deployments were slow.

```
Me: "This is taking forever. Can we use Vercel?"
Claude: "Absolutely. Here's what we'll need to do..."
```

In 30 minutes, we had:
- Vercel configuration complete
- DNS properly configured
- Email forwarding set up
- SSL certificates active
- Custom domain resolving correctly

## What Claude Added Without Being Asked

Here's what surprised me—features Claude implemented proactively:

1. **Dark mode detection** based on system preferences
2. **RSS feed generation** with proper XML formatting
3. **SEO meta tags** I would have overlooked
4. **Accessibility features** like skip links and ARIA labels
5. **Performance optimizations** including lazy loading

This wasn't just following instructions. It was anticipating needs based on best practices.

## The Results

- **Volks-Typo development**: ~8 hours (including the multi-theme attempt)
- **jdrhyne.me creation**: 2 hours 47 minutes
- **Deployment and DNS**: 30 minutes
- **Lines of code manually written**: 0

## What I Learned

Building through conversation forces you to think differently:
- You have to articulate problems clearly
- You consider the end result before implementation details
- You discover solutions you wouldn't have tried yourself

Would I have written cleaner CSS for those alignment issues? Probably. Would I have thought to implement automated visual testing? Definitely not. Would I have built everything in under 3 hours? No way.

## The Real Discovery

The interesting part isn't that AI can write code. It's that conversation can become creation. That describing what you want, with enough clarity and the right references, can make it real.

This approach won't replace traditional development. But it opens up new possibilities for rapid prototyping, experimenting with ideas, and building when you want to focus on the what instead of the how.

## Try It Yourself

If you want to experiment with this approach:

1. **Start small** - A landing page or simple site
2. **Use visual references** - Photos work better than descriptions
3. **Commit to the process** - No manual code edits
4. **Document what happens** - The failures teach as much as the successes

The best prompt I've found: "I want to build [X], and here's what inspired me..." Then show, don't tell.

## Final Thoughts

This website exists because I chose conversation over code. It started with two photos from Vienna and ended with a live site in less time than it usually takes me to set up a development environment.

Is it perfect? No. Did I learn something new about how we might build in the future? Absolutely.

Sometimes the most interesting code is the code you don't write yourself.

---

*This entire website was built through conversation with Claude Code. Powered by the Volks-Typo theme, inspired by Vienna street typography, and deployed to Vercel in under 3 hours.*
