import React, { useState, useCallback, useRef } from 'react';
import PlainTextEditor, { type PlainTextEditorHandle } from './PlainTextEditor';
import { PostMetadata } from './PostMetadata';
import MediaLibrary from './MediaLibrary';
import AIAssistant from './AIAssistant';
import PostsList from './PostsList';
import type { CollectionEntry } from 'astro:content';
import matter from 'gray-matter';

interface PostFile {
  filename: string;
  content: string;
  metadata: {
    title?: string;
    description?: string;
    date?: Date;
    tags?: string[];
    categories?: string[];
  };
  isDraft: boolean;
  lastModified: string;
}

export function EditorDashboard() {
  const [activeTab, setActiveTab] = useState<'editor' | 'posts' | 'media'>('editor');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('editorToken') || '' : '';
  const editorRef = useRef<PlainTextEditorHandle | null>(null);
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

  const handleSelectPost = (post: PostFile) => {
    // Load the selected post into the editor
    setContent(post.content);
    setMetadata({
      title: post.metadata.title || '',
      description: post.metadata.description || '',
      date: post.metadata.date || new Date(),
      tags: post.metadata.tags || [],
      categories: post.metadata.categories || [],
    });
    setCurrentFile(post.filename);
    setActiveTab('editor'); // Switch to editor tab
  };

  const handleNewPost = () => {
    // Check if there's meaningful content that might be lost
    const hasContent = content.trim() !== '' && 
                      content !== '# New Post\n\nStart writing your post here...' &&
                      !content.startsWith('# Building jdrhyne.me Without Writing Code');
    
    if (hasContent) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to create a new post? Your current work will be lost.');
      if (!confirmed) {
        return;
      }
    }
    
    // Create a new blank post with the crafted blog post
    const newContent = `# 🚀 From Vibe Coding to Volks-Typo: Building an Astro Theme Without Writing a Single Line of Code

*How a simple blog refresh turned into creating a minimalist German typography theme — and what I learned about AI-assisted development along the way.*

---

## The Origin Story: When Your Blog Becomes a Side Quest

It all started with **vibe coding** with Claude Code. Like any good developer story, what began as a simple task spiraled into something much more ambitious.

My personal blog at [rhynereport.com](https://rhynereport.com) had been gathering digital dust since 2017. We're currently migrating [Nutrient.io](https://nutrient.io) from Webflow to Astro, so I thought: *Why not see if Claude can build my personal site on Astro too?*

**Simple enough, right?** Wrong.

While browsing Astro themes, I couldn't find what I was looking for: something with that iconic post-WWII German typography — clean, minimalist, powerful. So naturally, I did what any reasonable person would do: **I decided to build my own theme from scratch.**

Enter **Volks-Typo**.

## Building Volks-Typo: When AI Meets Design Vision

### 🎨 **The Design Challenge**

I started with a clear vision: minimalist typography inspired by classic German design. When I first prompted Claude to build this theme, it gave me dark yellows, muddy grays, and aggressive reds. Technically correct, but aesthetically... *not quite*.

**The breakthrough came when I stopped describing and started showing.**

I uploaded two photos from Vienna — one from the Schönbrunn U-Bahn station, another of a typical street sign. Suddenly, Claude *got it*. It analyzed the typography, matched fonts from Google Fonts, and rebuilt the entire theme around that aesthetic.

**The lesson?** Sometimes a picture really is worth a thousand prompts.

### ⚡ **The Development Flow**

Working with Claude Code was addictive. I could literally talk to it:
- "Make it more minimalist"
- "Add a sidebar" 
- "Remove this button"
- "Change the colors"

It would edit the theme in real-time as I went. The speed was intoxicating — we were moving from concept to reality faster than I'd ever experienced.

## The Challenges: Where Reality Meets Ambition

### **Challenge #1: Scope Creep is Real**

My classic indecisiveness kicked in. Instead of perfecting one theme, I decided to create **three variations**: minimalist, default, and monochrome versions.

Claude handled the initial build beautifully, even creating a theme switcher. But when I tried to merge or separate themes later? **CSS chaos.** Global naming conflicts, styling conflicts, complete mess.

**The hard truth:** Even with AI, you need to chunk projects into manageable pieces. Build one thing, finish it, then move to the next.

### **Challenge #2: Git Hygiene (Or Lack Thereof)**

Here's where my non-developer habits caught up with me. I got so caught up in the flow of building that I completely forgot about git commits and version control.

When I finally tried to create a feature branch for the minimalist theme, then merge it back... **disaster.** Lost hours of styling work because I didn't have a clean commit history to fall back on.

**Lesson learned:** AI makes development faster, but it doesn't eliminate the need for good development practices.

### **Challenge #3: The CSS Alignment Blues**

Want to know Claude's kryptonite? **Padding and alignment.**

Describing visual changes in text is surprisingly difficult. Claude would misinterpret what needed alignment, change the wrong div, or create an endless loop of "fix this, now that's broken."

**The solution?** Screenshots. Lots of them. Showing Claude exactly what I was seeing and describing what was wrong proved far more effective than text descriptions.

*Fun fact: Claude even tried using Puppeteer to take screenshots and run alignment tests. It didn't work, but I appreciated the creative problem-solving.*

## The Technical Stack

**Volks-Typo** ended up being built on:
- **Astro** (static site generator)
- **Google Fonts** (matched to Vienna typography)
- **RSS feed** functionality
- **Search** capabilities
- **Responsive design** with careful attention to typography

Claude handled everything from initial scaffolding to final deployment preparation, including creating submission materials for the Astro theme portal.

## What I Learned About AI-Assisted Development

### **🌟 The Power of Conversational Coding**

Being able to go from "I want to redo my personal blog" to "submitting an official Astro theme" in less than a day is genuinely insane. The barrier to entry has never been lower.

### **🤝 Subject Matter Expertise Still Matters**

The LLM can't read your brain. You still need to know what you want, understand the fundamentals, and guide the process. But when you combine **domain knowledge with AI execution**, the results are powerful.

### **⚖️ The Trade-offs**

Would it have been easier to just write the CSS myself? Sometimes, yes. But that misses the point. This wasn't about efficiency — it was about exploring what's possible when you combine human vision with AI capability.

## The Result: Volks-Typo is Live

After countless iterations, alignment battles, and scope management lessons, **Volks-Typo** is now available as an official Astro theme.

**Want to try it?** Check out [Volks-Typo here](link-to-theme) and let me know what you think. If you like it, give the repo a star ⭐

## The Bigger Picture

Critics will say vibe coding is just a fad. **I'm telling you it's not going anywhere.**

We're witnessing the democratization of software development. The ability to leverage ideas and vision over pure technical skill to reach production-level applications is real and transformative.

**Is it perfect?** No. **Is it the future?** Absolutely.

---

*Built without writing a single line of code. Powered by Claude Code, Astro, and two tourist photos from Vienna.*

**Your turn:** Have you tried building something with AI assistance? What surprised you? Share your experience in the comments below. 👇`;
    
    setContent(newContent);
    setMetadata({
      title: 'From Vibe Coding to Volks-Typo: Building an Astro Theme Without Writing a Single Line of Code',
      description: 'How a simple blog refresh turned into creating a minimalist German typography theme — and what I learned about AI-assisted development along the way.',
      date: new Date(),
      tags: ['claude-code', 'astro', 'ai', 'vibe-coding', 'web-development', 'typography'],
      categories: ['Technology', 'Development'],
    });
    setCurrentFile(null);
    setActiveTab('editor'); // Switch to editor tab
    
    // Focus the editor after a brief delay
    setTimeout(() => {
      const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
        // Position cursor after the title
        textarea.setSelectionRange(newContent.length, newContent.length);
      }
    }, 100);
  };

  const handleAIInsert = (text: string) => {
    if (editorRef.current) {
      editorRef.current.insertText(text);
    }
  };

  const handleAIReplace = (text: string) => {
    setContent(text);
  };

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
          <button
            className={`tab ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            Media Library
          </button>
        </div>
        <button
          className={`editor-btn editor-btn-sm ${showAIAssistant ? 'editor-btn-primary' : 'editor-btn-secondary'}`}
          onClick={() => setShowAIAssistant(!showAIAssistant)}
          style={{ marginLeft: 'auto' }}
          aria-label="Toggle AI Assistant"
        >
          🤖 AI Assistant
        </button>
      </div>

      {activeTab === 'editor' ? (
        <div className="editor-layout">
          <div className="editor-main">
            <PlainTextEditor
              key={currentFile || 'new-post'}
              ref={editorRef}
              initialContent={content}
              onChange={setContent}
              onSave={handleSave}
              onNewPost={handleNewPost}
            />
          </div>
          <aside className="editor-sidebar">
            {showAIAssistant ? (
              <AIAssistant
                currentContent={content}
                onInsert={handleAIInsert}
                onReplace={handleAIReplace}
                token={token}
              />
            ) : (
              <PostMetadata
                metadata={metadata}
                onChange={setMetadata}
              />
            )}
          </aside>
        </div>
      ) : activeTab === 'posts' ? (
        <PostsList 
          token={token}
          onSelectPost={handleSelectPost}
          onNewPost={handleNewPost}
        />
      ) : (
        <div className="media-library">
          <MediaLibrary 
            onSelect={(url) => {
              // Switch back to editor and insert image
              setActiveTab('editor');
              const imageMarkdown = `![Image description](${url})`;
              setContent((prev) => prev + '\n\n' + imageMarkdown + '\n\n');
            }} 
            token={token} 
          />
        </div>
      )}
    </div>
  );
}