import React, { useState, useCallback } from 'react';
import { MarkdownEditor } from './MarkdownEditor';
import { PostMetadata } from './PostMetadata';
import type { CollectionEntry } from 'astro:content';
import matter from 'gray-matter';

export function EditorDashboard() {
  const [activeTab, setActiveTab] = useState<'editor' | 'posts'>('editor');
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState<Partial<CollectionEntry<'thoughts'>['data']>>({
    title: '',
    description: '',
    date: new Date(),
    tags: [],
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
            <MarkdownEditor
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