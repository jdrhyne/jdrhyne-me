# The Rhyne Report

A minimalist blog built with Astro and Tailwind CSS, inspired by the clean aesthetics of steipete.me and rhynereport.com.

## ✨ Features

- **Clean, minimalist design** with serif headings and sans-serif body text
- **Homepage with year-grouped posts** for easy browsing
- **Individual post pages** with reading time estimates and social sharing
- **Tag system** with dedicated tag pages and filtering
- **Client-side search** through all blog content
- **RSS feed** for syndication
- **Responsive design** that works on all devices
- **Fast loading times** with static site generation
- **SEO optimized** with proper meta tags and structured data

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Search.astro
│   ├── content/
│   │   ├── blog/
│   │   │   ├── welcome.md
│   │   │   └── building-with-astro.md
│   │   └── config.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── about.astro
│   │   ├── search.astro
│   │   ├── rss.xml.ts
│   │   ├── search.json.ts
│   │   ├── blog/
│   │   │   └── [...slug].astro
│   │   ├── tags/
│   │   │   ├── index.astro
│   │   │   └── [tag].astro
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── CLAUDE.md
└── package.json
```

## 📝 Content Management

Blog posts are written in Markdown and stored in `src/content/blog/`. Each post includes frontmatter with:

- `title`: Post title
- `description`: Brief description for SEO and previews
- `pubDate`: Publication date
- `tags`: Array of tags for categorization
- `draft`: Boolean to hide posts from production
- `heroImage`: Optional hero image
- `updatedDate`: Optional last updated date

### Example Post Frontmatter

```yaml
---
title: 'Welcome to The Rhyne Report'
description: 'The inaugural post for The Rhyne Report'
pubDate: 2025-01-01
tags: ['meta', 'introduction']
draft: false
---
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
