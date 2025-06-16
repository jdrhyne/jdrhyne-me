---
title: "From Vienna Street Signs to Astro Theme: Building Volks-Typo with Claude Code"
date: 2025-06-16
tags: [ai, development, astro, design, personal]
description: "How two photos from Vienna's streets inspired an Astro theme, and what I learned about AI-assisted development along the way."
excerpt: "Sometimes the best design inspiration comes from unexpected places. For me, it was the typography of Vienna's street signs that launched a journey into AI-assisted theme development."
---

## The Unexpected Beginning

I'll be honest: when I first told Claude Code I wanted to build an Astro theme inspired by "old German WWII typography" with a minimalist look, what I got back was... not what I expected. Dark yellows, muddy grays, and an aggressive red that felt more like a warning sign than a design choice. It was technically correct but emotionally wrong.

That's when I learned my first lesson about AI-assisted development: specificity beats abstraction every time.

## Vienna Changes Everything

In a moment of inspiration (or frustration?), I decided to show Claude Code what I actually meant. I uploaded two photos from my phone:
1. A subway sign from Schönbrunn station
2. A typical Vienna street sign with its distinctive typography

The transformation was immediate and profound. Claude Code analyzed the typography, matched it with Google Fonts, and suddenly we were speaking the same design language. The clean lines, the proportions, the stark black-on-white contrast—it all clicked into place.

```css
/* What emerged from those Vienna streets */
:root {
  --font-heading: 'Oswald', sans-serif;
  --font-body: 'Work Sans', sans-serif;
  --color-primary: #000000;
  --color-background: #ffffff;
  --color-accent: #c13127;
}
```

## The Dance of Iteration

What followed was what I can only describe as a conversational dance with an AI. "Change the colors." "Make it more minimalist." "Add a sidebar." "No, take away that button." 

Each request was met with immediate implementation. It was intoxicating—so much so that in my indecisiveness, I asked Claude to create three variations of the theme. And here's where things got interesting.

### The Three-Theme Fiasco

Claude Code dutifully built a theme switcher and created three distinct variations. It was technically impressive. It was also a complete mess.

The AI began confusing CSS class names across themes. Global styles bled into local ones. What started as organized variation became a tangled web of conflicting stylesheets. I watched as Claude tried valiantly to merge, separate, and reorganize the themes, but it was like watching someone try to unknot Christmas lights while wearing mittens.

**Lesson learned**: Just because AI can do something doesn't mean it should. I reverted to a single theme and never looked back.

## The Battle for Pixels

If there's one thing that humbled both me and Claude Code, it was padding and alignment. You'd think spacing would be simple, but it became our white whale. Claude would adjust padding, I'd point out misalignment, it would fix one thing and break another.

At one point, Claude Code got creative and implemented Puppeteer to take screenshots and run visual regression tests. Did it fix the alignment? No. Was it an impressively creative attempt at solving the problem? Absolutely.

I was tempted—so tempted—to just dive into the CSS myself. But I'd committed to building this entirely through conversation with Claude Code. After what felt like a doctoral thesis worth of prompting about spacing, we finally got everything aligned.

## Shipping to the World

With Volks-Typo finally polished, I needed to submit it to the Astro theme directory. I showed Claude Code the submission form, the best practices documentation, and asked for help preparing everything.

What I got back was remarkable:
- Perfectly sized screenshots
- A comprehensive README
- Submission form content that highlighted the theme's strengths
- Even suggestions for the theme description

The theme was accepted on the first try.

## Building jdrhyne.me: The Speed Run

With Volks-Typo as my foundation, building my personal site should have been anticlimactic. Instead, it was revelatory.

Claude Code pulled the theme from GitHub and immediately began personalizing it. But here's where I mixed things up—I brought ChatGPT into the conversation. I asked it to use everything it knew about me to create bios and taglines.

The results were unnervingly accurate. It knew about my kids, my love for the beach, details pulled from the digital ether of my online presence. Creepy? Yes. Useful? Absolutely. The tagline "Code, Curiosity, and Continuous Growth—Scaling Ideas Beyond Paper" came from this AI collaboration.

## From GitHub Pages to Vercel

The deployment story deserves its own mention. Claude Code initially set up GitHub Actions for GitHub Pages deployment. It worked, but the deployment time was killing me—sometimes 10-15 minutes to see changes live.

"Can we use Vercel instead?" I asked.

What followed was a masterclass in deployment assistance. Claude Code provided:
- Step-by-step Vercel setup
- DNS configuration instructions
- Email forwarding setup
- Even helped troubleshoot caching issues

Total time from "I want Vercel" to live site: about 30 minutes.

## The Numbers That Matter

- **Volks-Typo development**: ~8 hours (including the three-theme detour)
- **jdrhyne.me from theme to live**: Under 3 hours
- **Number of times I wanted to manually fix CSS**: 47 (approximately)
- **Number of times I actually did**: 0

## Reflections on AI-Assisted Development

This experience taught me that AI-assisted development isn't about replacement—it's about conversation. Claude Code wasn't just executing commands; it was reasoning, trying creative solutions, and sometimes failing in interesting ways.

The Vienna street signs that started this journey remind me that the best development happens when human creativity meets AI capability. I provided the vision and the constraints; Claude Code provided the implementation and iterations.

Would I build another site this way? Absolutely. But I'd probably skip the three-theme variation experiment.

## What's Next?

As I write this on my Claude Code-built site, using a theme inspired by Vienna's streets, I'm planning the next project. Maybe a landing page for a side project? Another theme inspired by a different city's typography? 

Whatever it is, I know it'll involve a conversation with AI, probably some moments of frustration, definitely some surprises, and ultimately something I couldn't have built as quickly on my own.

To anyone considering AI-assisted development: bring your vision, bring reference images, and be prepared for an interesting journey. You might just end up with something better than you imagined.

And maybe skip the three-theme variation idea. Trust me on that one.

---

*Built with: Claude Code, Volks-Typo, Astro.js, two photos from Vienna, and an unreasonable amount of patience for CSS alignment issues.*