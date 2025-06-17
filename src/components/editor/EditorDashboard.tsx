import React, { useState, useCallback } from 'react';
import PlainTextEditor from './PlainTextEditor';
import { PostMetadata } from './PostMetadata';
import type { CollectionEntry } from 'astro:content';
import matter from 'gray-matter';

export function EditorDashboard() {
  const [activeTab, setActiveTab] = useState<'editor' | 'posts'>('editor');
  const [content, setContent] = useState(`# Building jdrhyne.me Without Writing Code: A Three-Hour Experiment with Claude Code

*June 16, 2025*

I've been writing code for years. I know CSS inside out. But I wanted to try something different.

What if I could build an entire website without typing a single line of code? Not because I couldn't code it myself, but to see if pure conversation with AI could create something production-ready.

The result: This website. Built entirely through dialogue with Claude Code in under three hours.

## The Starting Point

I had already created volks-typo, a minimalist Astro theme. The challenge was to transform it into a personalized website without touching any code directly.

My first attempt didn't go well:

\`\`\`
Me: "I want to build an Astro theme inspired by old German WWII 
     typography. Minimalist. Stark. Clean lines."

Claude: "I understand. Let me create that for you..."
\`\`\`

What I got back was technically correct but completely wrong aesthetically. Dark yellows, muddy grays, aggressive reds. Not what I had in mind at all.

## Visual References Changed Everything

Then I remembered two photos from a recent Vienna trip. One from the Schönbrunn U-Bahn station, another of a street sign. Clean typography, perfect spacing, exactly what I wanted.

\`\`\`
Me: "Forget what I said. HERE's what I mean." 
    *uploads photos*

Claude: "Ah, I see. Analyzing the typography now..."
\`\`\`

The transformation was immediate. Claude identified the font characteristics and matched them with Google Fonts:

\`\`\`css
:root {
  --font-heading-primary: 'Oswald', sans-serif;
  --font-heading-secondary: 'Roboto Condensed', sans-serif;
  --font-body: 'Work Sans', sans-serif;
  --color-accent: #c13127;
}
\`\`\`

That's how volks-typo got its visual identity. Two tourist photos became a complete design system.

## Learning Through Constraints

Success led to overconfidence. I decided to create three theme variations with a switcher.

For about 15 minutes, it worked. Then CSS classes started bleeding between themes. Navigation disappeared. Colors mixed randomly.

\`\`\`
Me: "The nav in theme 2 is using theme 3's colors."
Claude: "Let me fix that... Done."
Me: "Now theme 1 has no navigation at all."
Claude: "I see the issue. Attempting to resolve..."
Me: "Let's just go back to one theme."
Claude: "That would be wise."
\`\`\`

Sometimes the best feature is the one you don't build.

## The Real Test: CSS Alignment

Want to know what really tests an AI's limits? CSS padding and alignment.

What followed was a back-and-forth that tested my patience:

\`\`\`
Me: "The sidebar padding doesn't match the main content."
Claude: "Adjusting sidebar padding to match..."
Me: "Now the header is off."
Claude: "Fixing header alignment..."
Me: "The footer is floating."
\`\`\`

At one point, Claude actually built an automated screenshot system with Puppeteer to verify alignment. It didn't work, but I appreciated the creative problem-solving.

The temptation to just open VS Code and add \`padding: 20px\` was real. But I stuck to the constraint: no manual code.

## Building jdrhyne.me

With volks-typo complete, it was time for the main project. Three hours to go from theme to deployed personal site.

\`\`\`
Me: "Pull volks-typo from GitHub. Let's make it mine."
Claude: "Cloning repository and personalizing..."
\`\`\`

I brought ChatGPT into the conversation for bio content:

\`\`\`
Me to ChatGPT: "Use everything you know about me to write 
                bio and tagline for my personal site."

ChatGPT: "Based on your background... [generates content]"
\`\`\`

The tagline it created—"Code, Curiosity, and Continuous Growth—Scaling Ideas Beyond Paper"—was perfect.

## Deployment in 30 Minutes

Claude initially set up GitHub Pages. The deployment times were painful.

\`\`\`
Me: "This is taking forever. Can we use Vercel?"
Claude: "Absolutely. Here's what we'll need to do..."
\`\`\`

What followed was surprisingly smooth:

- Vercel configuration
- DNS setup instructions
- Email forwarding
- SSL certificates
- Debugging custom domain resolution

From decision to live site: 30 minutes.

## What Claude Added Without Being Asked

This is what impressed me most. Features I didn't request but Claude implemented:

- Automatic dark mode detection
- RSS feed generation
- SEO optimizations
- Accessibility features (skip links, ARIA labels)
- Performance optimizations

These weren't lucky guesses. Claude understood the context and anticipated needs.

## The Numbers

- **volks-typo development**: ~8 hours
- **jdrhyne.me creation**: 2 hours 47 minutes
- **Deployment and DNS**: 30 minutes
- **Lines of code manually written**: 0
- **Times I wanted to cheat**: Many

## What I Learned

This experiment taught me several things:

1. **Clear communication beats technical specifications**. Showing those Vienna photos communicated more than paragraphs of requirements.

2. **Constraints force better thinking**. Not being able to code forced me to articulate problems clearly.

3. **AI tools excel at standard patterns**. Authentication, deployment, SEO—Claude handled these flawlessly.

4. **Complex CSS remains challenging**. Precise visual alignment still requires iteration.

5. **The combination is powerful**. Human vision plus AI execution creates results neither could achieve alone.

## Should You Try This?

If you're curious about building without coding, here's my advice:

- Start small (landing page or simple blog)
- Gather visual references
- Commit to the constraint
- Document what works and what doesn't

The key is being specific about what you want while staying open to how it gets built.

## Moving Forward

This site will continue to evolve. I'm already working with Claude Code on new features:

- A visual editor for content management
- Enhanced typography controls
- Performance monitoring

The difference now is I know what's possible. Building through conversation isn't just feasible—it's fast, educational, and surprisingly effective.

---

*Built without writing code. Powered by volks-typo, Claude Code, and two photos from Vienna.*`);
  const [metadata, setMetadata] = useState<Partial<CollectionEntry<'thoughts'>['data']>>({
    title: 'Building jdrhyne.me Without Writing Code: A Three-Hour Experiment with Claude Code',
    description: 'I built my entire website through conversations with Claude Code. No manual coding, just describing what I wanted. Here\'s what happened.',
    date: new Date(),
    tags: ['ai', 'development', 'astro', 'claude-code', 'no-code'],
    categories: ['Technology', 'Web Development'],
    excerpt: 'Can you build a production website just by talking to AI? I spent three hours finding out. The answer surprised me.',
  });
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const handleSave = useCallback(async (content: string) => {
    try {
      // Generate frontmatter from metadata
      const frontmatter = matter.stringify(content, metadata);
      
      // Create filename from title if new
      const filename = currentFile || `${metadata.title?.toLowerCase().replace(/\s+/g, '-')}.md`;
      
      const response = await fetch('/api/editor/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename,
          content: frontmatter,
          isDraft: true,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setCurrentFile(data.filename);
        console.log('Draft saved successfully');
      } else {
        console.error('Failed to save draft');
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  }, [metadata, currentFile]);

  return (
    <div className="editor-dashboard">
      <div className="dashboard-header">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button
            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            All Posts
          </button>
        </div>
      </div>

      {activeTab === 'editor' ? (
        <div className="editor-layout">
          <div className="editor-main">
            <PlainTextEditor
              initialContent={content}
              onChange={setContent}
              onSave={handleSave}
            />
          </div>
          <aside className="editor-sidebar">
            <PostMetadata
              metadata={metadata}
              onChange={setMetadata}
            />
          </aside>
        </div>
      ) : (
        <div className="posts-list">
          <p>Posts list coming soon...</p>
        </div>
      )}
    </div>
  );
}