---
title: "Vibe Coding: How Two Vienna Street Signs and Claude Code Built My Entire Website"
date: 2025-06-16
tags: [ai, development, astro, design, vibe-coding, claude-code]
description: "I built jdrhyne.me without writing a single line of code—just conversations with AI, two photos from Vienna, and a stubborn commitment to pure vibe coding."
excerpt: "What if you could build an entire website just by describing what you want? No coding, just vibes. Here's how I turned street sign photos into a production site in 3 hours."
categories: ["Technology", "Web Development"]
author: "Jonathan D. Rhyne"
image: "/images/vienna-street-sign.jpg"
---

# Vibe Coding: How Two Vienna Street Signs and Claude Code Built My Entire Website

*June 16, 2025*

## The Experiment That Started Everything

Picture this: You're a developer who knows CSS inside and out. You've been writing code for years. And you decide to build an entire website without typing a single line of code yourself.

Not because you can't. But because you want to see if pure conversation—what I call "vibe coding"—can create something real.

The result? This website you're reading right now. Built entirely through dialogue with Claude Code. Zero manual code. Three hours from idea to deployment.

But let me back up, because this story really starts on the streets of Vienna.

## What Is Vibe Coding?

Before we dive into Vienna, let me define vibe coding: It's development through pure conversation. No IDE. No manual edits. Just you explaining what you want and AI making it real.

Think of it as the ultimate pair programming session where your partner happens to know every language, never gets tired, and occasionally surprises you with solutions you wouldn't have thought of.

## Chapter 1: The Typography Crisis

My journey started with what seemed like a simple request to Claude Code:

```
Me: "I want to build an Astro theme inspired by old German WWII 
     typography. Minimalist. Stark. Clean lines."

Claude: "I understand. Let me create that for you..."
```

What came back was... technically correct but emotionally wrong. Dark yellows that felt like nicotine stains. Muddy grays that screamed depression. An aggressive red that made everything look like a warning label.

I stared at my screen, wondering if this was what I actually asked for.

## Chapter 2: When Photos Speak Louder Than Words

That's when I remembered two photos on my phone from a recent Vienna trip. One from the Schönbrunn U-Bahn station. Another of a typical street sign. Clean, stark, perfect typography.

```
Me: "Forget what I said. HERE's what I mean." 
    *uploads photos*

Claude: "Ah, I see. Analyzing the typography now..."
```

The transformation was instant. Claude identified the font characteristics, matched them with Google Fonts, and suddenly we had:

```css
:root {
  --font-heading-primary: 'Oswald', sans-serif;
  --font-heading-secondary: 'Roboto Condensed', sans-serif;
  --font-body: 'Work Sans', sans-serif;
  --color-accent: #c13127;  /* That perfect Vienna red */
}
```

Volks-Typo was born. Not from a design brief or mood board, but from two random photos taken by a tourist.

## Chapter 3: The Three-Theme Disaster (Or: How I Learned to Stop Worrying and Love Constraints)

Success made me ambitious. Or maybe just indecisive.

```
Me: "This is great! Let's make three variations. 
     Give users options!"

Claude: "Creating a theme switcher with three variants..."
```

For exactly 15 minutes, I was a design genius with a multi-theme system. Then reality hit.

CSS classes started bleeding between themes. Global styles invaded local spaces. Claude began mixing up which navigation belonged to which variant. It was like watching someone try to juggle while riding a unicycle on a tightrope.

The conversation devolved into:

```
Me: "The nav in theme 2 is using theme 3's colors."
Claude: "Let me fix that... Done."
Me: "Now theme 1 has no navigation at all."
Claude: "I see the issue. Attempting to resolve..."
Me: "STOP. Let's just... let's go back to one theme."
Claude: "That would be wise."
```

Sometimes the best feature is the one you don't ship.

## Chapter 4: The Great Padding War of 2025

Want to know what truly tests an AI's limits? CSS alignment.

What followed was an epic battle that would make the Hundred Years' War look brief:

```
Me: "The sidebar padding doesn't match the main content."
Claude: "Adjusting sidebar padding to match..."
Me: "Now the header is off."
Claude: "Fixing header alignment..."
Me: "The footer is now floating."
Claude: "I have an idea. Let me implement visual regression 
        testing with Puppeteer..."
```

Yes, Claude Code actually built an automated screenshot system to try to verify alignment. Did it work? No. Was it an impressively creative attempt? Absolutely.

```javascript
// Claude's Hail Mary attempt at solving alignment
const screenshot = await page.screenshot();
const dimensions = await analyzePadding(screenshot);
// ... 200 lines of image analysis later ...
// Still misaligned, but A+ for effort
```

The temptation to just open VS Code and add `padding: 20px` was overwhelming. My fingers literally hovered over the keyboard multiple times. But I'd committed to pure vibe coding. No cheating.

After what felt like negotiating a peace treaty, we finally achieved alignment.

## Chapter 5: The Three-Hour Personal Site Speedrun

With Volks-Typo complete and accepted into the Astro theme directory, it was time for the main event: building jdrhyne.me.

```
Me: "Pull Volks-Typo from GitHub. Let's make it mine."
Claude: "Cloning repository and personalizing..."
```

Here's where I got creative. I brought ChatGPT into the conversation:

```
Me to ChatGPT: "Use everything you know about me to write 
                bio and tagline for my personal site."

ChatGPT: "Based on your background... [proceeds to list 
          things about my life I'd forgotten I'd posted online]"
```

Creepy? Slightly. Useful? Incredibly. The tagline it generated—"Code, Curiosity, and Continuous Growth—Scaling Ideas Beyond Paper"—was perfect.

## Chapter 6: From GitHub Pages to Vercel in 30 Minutes

The deployment story deserves its own telling. Claude initially set up GitHub Pages with Actions. It worked, but watching grass grow was faster than waiting for deployments.

```
Me: "This is taking forever. Can we use Vercel?"
Claude: "Absolutely. Here's what we'll need to do..."
```

What followed was a masterclass in deployment assistance:

- Vercel configuration: ✓
- DNS setup instructions: ✓
- Email forwarding: ✓
- SSL certificates: ✓
- Even helped debug why my custom domain wasn't resolving: ✓

Time from "I want Vercel" to live site: 30 minutes.

## The Hidden Magic: What Claude Built That I Didn't Expect

Here's what didn't make it into the original story—the features Claude added that I didn't explicitly ask for:

1. **Automatic dark mode detection** based on system preferences
2. **RSS feed generation** with proper XML formatting
3. **SEO optimizations** I would have forgotten
4. **Accessibility features** like skip links and ARIA labels
5. **Performance optimizations** including lazy loading

This wasn't just following instructions. This was Claude anticipating needs.

## The Numbers That Tell the Story

- **Volks-Typo development**: ~8 hours (including theme disaster)
- **jdrhyne.me creation**: 2 hours 47 minutes
- **Deployment and DNS**: 30 minutes
- **Lines of code manually written**: 0
- **Times I almost cheated**: 47
- **Actual CSS files I opened in VS Code**: 0 (stayed strong)

## What Vibe Coding Really Means

Here's what I learned: Vibe coding isn't about being lazy or proving AI can replace developers. It's about discovering a fundamentally different way to build.

When you can't dive into code, you're forced to think differently:
- You articulate problems more clearly
- You consider user experience before implementation
- You learn to trust the process
- You discover solutions you wouldn't have tried

## The Emotional Truth

There's something profound about building through pure conversation. It's like having a brilliant intern who never sleeps, never judges your weird ideas, and occasionally surprises you with creativity you didn't expect.

Would I have written better CSS for those padding issues? Maybe. Would I have thought to implement visual regression testing? Definitely not. Would I have built everything in under 3 hours? Not a chance.

## The Plot Twist Nobody Talks About

The real magic isn't that AI can write code. It's that conversation can become creation. That describing what you want, with enough clarity and patience, can make it real.

This site exists because I refused to write code and instead chose to have a conversation. With an AI. About Austrian typography. At 2 AM. And it worked.

## Your Turn: A Vibe Coding Challenge

Want to try pure vibe coding? Here's your starter pack:

1. **Pick a small project** (landing page, blog theme, portfolio)
2. **Gather references** (photos, sites you like, random inspiration)
3. **Commit to the bit** (no manual code, period)
4. **Document the journey** (the failures are as interesting as the successes)

Start with this prompt: "I want to build [X], and here's what inspired me..." Then attach a photo of something completely unrelated. You might be surprised where it leads.

## The Secret Sauce

If you take nothing else from this story, remember this: The best development happens when human creativity meets AI capability. You don't need to know how to code to create. You just need to know what you want and be willing to describe it.

Sometimes that description starts with two photos from Vienna and ends with a website that's live before your coffee gets cold.

Welcome to vibe coding. The water's fine.

---

*This entire website was built through conversation. Not a single line of code was typed manually. Powered by Volks-Typo, inspired by Vienna, built with Claude Code, and deployed faster than my old build process.*

**Ready to vibe?** Remember: reference images > abstract descriptions, patience > perfection, and sometimes the best code is the code you don't write.