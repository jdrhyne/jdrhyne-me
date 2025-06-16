---
title: "From AI Conversation to Live Website: Building jdrhyne.me with Claude Code"
date: 2025-06-16
tags: [ai, development, claude-code, astro, personal]
description: "A developer's journey using Claude Code to build a custom Astro theme and deploy a personal website, with honest reflections on AI-assisted development."
excerpt: "What happens when you give an AI coding assistant free rein to help build your personal website? The answer surprised me."
---

Six months ago, I was skeptical. Could an AI really help me build something as personal as my own website? Today, jdrhyne.me is live, powered by a custom Astro theme I built with Claude Code, and I'm here to share that journey.

## The Catalyst: Why Another Personal Site?

Like many developers, I've had countless iterations of personal websites. WordPress blogs, Jekyll sites, hand-rolled React apps—you name it, I've probably tried it. But something was always missing. Either the design felt generic, the workflow was cumbersome, or I'd get lost in endless customization instead of actually writing.

Enter Claude Code. Anthropic's CLI tool promised something different: an AI assistant that could understand context, write code, and—most intriguingly—push back when you're making questionable decisions.

## First Contact: Meeting Claude Code

My first interaction with Claude Code was tentative. I installed it with a simple command:

```bash
npm install -g @anthropic/claude-code
```

Then, with equal parts curiosity and skepticism, I typed:

```bash
claude-code "I want to build a minimalist blog theme focused on typography"
```

What happened next changed my perspective on AI-assisted development. Instead of generating a generic template, Claude Code asked questions:

- What's your aesthetic preference?
- Which static site generator do you prefer?
- Do you have specific typography in mind?

This wasn't a code generator—it was a collaborator.

## Building volks-typo: The Theme That Started It All

### The Concept

Together, we settled on building "volks-typo"—a typography-first Astro theme inspired by modernist design principles. The name itself came from our conversation about making beautiful typography accessible to everyone (volks = people's).

### The Execution

What impressed me most was how Claude Code approached the architecture. Instead of dumping a massive boilerplate, it built incrementally:

```astro
---
// components/Layout.astro
import '../styles/typography.css';

const { title, description } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700;900&family=Roboto+Condensed:wght@400;700&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <slot />
  </body>
</html>
```

The typography system was built on CSS custom properties, making customization straightforward:

```css
:root {
  --font-heading-primary: 'Oswald', sans-serif;
  --font-heading-secondary: 'Roboto Condensed', sans-serif;
  --font-body: 'Work Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Modular scale for typography */
  --scale-ratio: 1.25;
  --font-size-base: 1rem;
  --font-size-lg: calc(var(--font-size-base) * var(--scale-ratio));
  --font-size-xl: calc(var(--font-size-lg) * var(--scale-ratio));
}
```

### The Surprises

Working with Claude Code revealed several unexpected benefits:

1. **Opinionated when it mattered**: When I suggested using 5 different fonts, Claude pushed back, explaining the cognitive load and performance implications.

2. **Context-aware suggestions**: It remembered our discussion about minimalism and consistently suggested simpler solutions when I was overcomplicating things.

3. **Teaching moments**: Instead of just writing code, Claude Code explained the "why" behind decisions, improving my understanding of modern web development practices.

## From Theme to Personal Site: Building jdrhyne.me

### The Transformation

With volks-typo as a foundation, transforming it into my personal site should have been straightforward. Plot twist: it wasn't, but in the best way possible.

Claude Code helped me think through the personalization systematically:

```typescript
// src/config.ts
export const config = {
  title: "JDR",
  description: "Code, Curiosity, and Continuous Growth",
  author: {
    name: "Jonathan D. Rhyne",
    email: "jdrhyne@gmail.com",
    avatar: "/avatar.jpg",
    bio: "Scaling Ideas Beyond Paper"
  },
  social: {
    github: "https://github.com/jdrhyne",
    linkedin: "https://linkedin.com/in/jonathan-rhyne-54084811",
    twitter: "https://x.com/jdrhyne"
  }
};
```

### The Color Decision

One of my favorite moments was choosing the accent color. I wanted something bold but not generic. Through our conversation, we landed on `#c13127`—a deep, confident red that became the signature of the site:

```css
:root {
  --color-accent-red: #c13127;
  --color-background: #ffffff;
  --color-text-primary: #000000;
  --color-text-muted: #888888;
}
```

### Content Architecture

Claude Code suggested using Astro's content collections for blog posts, which proved brilliant:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const thoughts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { thoughts };
```

Notice "thoughts" instead of "blog"—a subtle change suggested during our conversation that better reflected my approach to writing.

## Deployment: From Local to Live

### The GitHub Actions Pipeline

When it came time to deploy, Claude Code helped set up a GitHub Actions workflow that felt like magic:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### The Domain Setup

Setting up jdrhyne.me was surprisingly smooth. Claude Code walked me through:
1. Configuring DNS records
2. Setting up SSL certificates
3. Implementing proper redirects
4. Adding cache headers for performance

## Reflections: What I Learned

### AI as a Pair Programming Partner

Working with Claude Code felt less like using a tool and more like pair programming with a knowledgeable colleague who:
- Never gets tired
- Has read all the documentation
- Remembers every decision we've made
- Isn't afraid to challenge bad ideas

### The Human Touch Still Matters

Despite Claude Code's capabilities, several aspects required human judgment:
- Design aesthetic and personal style
- Content strategy and voice
- Business logic and unique requirements
- Final quality assurance

### Speed Without Sacrificing Quality

What would have taken me weeks of evening coding was accomplished in days. But unlike typical "rapid development," the code quality was high, well-documented, and maintainable.

## Looking Forward: AI-Assisted Development

This experience has convinced me that AI-assisted development isn't about replacement—it's about augmentation. Claude Code didn't build my website; we built it together. 

The future of development might not be AI versus humans, but AI with humans, each playing to their strengths:
- AI handles boilerplate, documentation lookup, and pattern implementation
- Humans provide creativity, context, and judgment

## Conclusion: Would I Do It Again?

Absolutely. In fact, I'm already planning my next Claude Code collaboration. The combination of speed, quality, and learning made this one of my most enjoyable development experiences.

If you're on the fence about AI-assisted development, my advice is simple: try it. Start small, maybe with a personal project like I did. You might be surprised by what you can build together.

The code for both volks-typo and jdrhyne.me is available on GitHub. Feel free to explore, fork, and build your own story.

---

*Want to share your own AI-assisted development story? Find me on [Twitter](https://x.com/jdrhyne) or [GitHub](https://github.com/jdrhyne). I'd love to hear about your experiences.*