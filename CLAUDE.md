# The Rhyne Report - Project Plan

## Overview
Building a minimalist blog website using Astro and Tailwind CSS, inspired by steipete.me's structure and rhynereport.com's aesthetic.

## Technology Stack
- **Framework**: Astro (static site generator)
- **Styling**: Tailwind CSS
- **Content**: Markdown files in `/src/content/blog/`
- **Deployment**: TBD (Vercel/Netlify recommended)

## Project Structure

### Pages
1. **Homepage** (`/`)
   - Lists recent blog posts grouped by year
   - Clean, minimalist design
   - Easy navigation to all content

2. **About Page** (`/about`)
   - Static page for biography
   - Professional information
   - Contact details (if desired)

3. **Blog Post Pages** (`/blog/[slug]`)
   - Individual post template
   - Support for images and embedded videos
   - Reading time estimate
   - Publication date
   - Tags

4. **Tag Pages** (`/tags/[tag]`)
   - Dynamic pages listing posts by tag
   - Tag cloud or list on sidebar/footer

### Features
1. **Navigation**
   - Simple header with Home, About, Blog links
   - Footer with additional links

2. **Search**
   - Client-side search functionality
   - Search through full post content
   - Real-time results

3. **Social Sharing**
   - "Share on X/Twitter" button
   - "Copy Link" functionality
   - Clean, unobtrusive design

4. **Responsive Design**
   - Mobile-first approach
   - Optimized for all screen sizes
   - Fast loading times

## Design Guidelines
- **Colors**: Minimalist palette inspired by rhynereport.com
- **Typography**: Serif headings, sans-serif body text
- **Layout**: Clean, spacious, focus on readability
- **Images**: Optimized for web, lazy loading

## Content Management
- Blog posts stored as Markdown files
- Frontmatter for metadata (title, date, tags, description)
- Images stored in `/public/images/blog/`

## Development Phases

### Phase 1: Project Setup
- Initialize Astro project
- Configure Tailwind CSS
- Set up Git repository
- Basic project structure

### Phase 2: Core Pages
- Create layout components
- Implement homepage
- Build about page
- Design blog post template

### Phase 3: Blog Functionality
- Content collection setup
- Tag system implementation
- Post listing and sorting
- Pagination (if needed)

### Phase 4: Features
- Search functionality
- Social sharing buttons
- SEO optimization
- RSS feed

### Phase 5: Polish
- Performance optimization
- Accessibility improvements
- Cross-browser testing
- Final design tweaks

## Git Workflow
- Regular commits with descriptive messages
- Push to GitHub after major milestones
- Branch strategy: main for production, develop for ongoing work

## Commands to Run
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier