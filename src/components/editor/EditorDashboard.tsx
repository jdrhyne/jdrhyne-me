import React, { useState, useCallback, useEffect } from 'react';
import { MarkdownEditor } from './MarkdownEditor';
import { PostMetadata, PostMetadataData } from './PostMetadata';
import styles from './EditorDashboard.module.css';

interface Post {
  id?: string;
  content: string;
  metadata: PostMetadataData;
  isDraft: boolean;
  slug?: string;
}

export function EditorDashboard() {
  const [activeTab, setActiveTab] = useState<'editor' | 'posts'>('editor');
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post>({
    content: '',
    metadata: {
      title: '',
      description: '',
      date: new Date().toISOString().slice(0, 16),
      excerpt: '',
      categories: [],
      tags: [],
      author: 'Jonathan D. Rhyne',
      image: undefined
    },
    isDraft: true
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (currentPost.content || currentPost.metadata.title) {
        handleSave(true); // Silent save
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [currentPost]);

  const handleContentChange = useCallback((content: string) => {
    setCurrentPost(prev => ({ ...prev, content }));
  }, []);

  const handleMetadataChange = useCallback((metadata: PostMetadataData) => {
    setCurrentPost(prev => ({ ...prev, metadata }));
  }, []);

  const handleSave = async (silent = false) => {
    if (!currentPost.metadata.title) {
      if (!silent) setMessage('Title is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/editor/posts', {
        method: currentPost.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentPost)
      });

      if (response.ok) {
        const savedPost = await response.json();
        setCurrentPost(savedPost);
        if (!silent) setMessage('Post saved successfully!');
      } else {
        throw new Error('Failed to save post');
      }
    } catch (error) {
      if (!silent) setMessage('Error saving post');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = () => {
    setCurrentPost({
      content: '',
      metadata: {
        title: '',
        description: '',
        date: new Date().toISOString().slice(0, 16),
        excerpt: '',
        categories: [],
        tags: [],
        author: 'Jonathan D. Rhyne',
        image: undefined
      },
      isDraft: true
    });
    setActiveTab('editor');
  };

  const generateFrontmatter = () => {
    const { metadata } = currentPost;
    const frontmatter = [
      '---',
      `title: "${metadata.title}"`,
      metadata.description && `description: "${metadata.description}"`,
      `date: ${new Date(metadata.date).toISOString()}`,
      metadata.excerpt && `excerpt: "${metadata.excerpt}"`,
      metadata.categories.length > 0 && `categories: [${metadata.categories.map(c => `"${c}"`).join(', ')}]`,
      metadata.tags.length > 0 && `tags: [${metadata.tags.map(t => `"${t}"`).join(', ')}]`,
      `author: "${metadata.author}"`,
      metadata.image && `image: "${metadata.image}"`,
      '---'
    ].filter(Boolean).join('\n');

    return frontmatter;
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <div className={styles.tabs}>
          <button
            className={activeTab === 'editor' ? styles.activeTab : ''}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button
            className={activeTab === 'posts' ? styles.activeTab : ''}
            onClick={() => setActiveTab('posts')}
          >
            All Posts
          </button>
        </div>
        
        <div className={styles.actions}>
          <button onClick={handleNewPost} className={styles.newButton}>
            New Post
          </button>
        </div>
      </div>

      {message && (
        <div className={styles.message}>
          {message}
        </div>
      )}

      {activeTab === 'editor' ? (
        <div className={styles.editorLayout}>
          <div className={styles.sidebar}>
            <PostMetadata
              metadata={currentPost.metadata}
              onChange={handleMetadataChange}
            />
            
            <div className={styles.postActions}>
              <button
                onClick={() => handleSave(false)}
                disabled={loading}
                className={styles.primaryButton}
              >
                {loading ? 'Saving...' : 'Save Draft'}
              </button>
              
              <button
                onClick={() => console.log(generateFrontmatter())}
                className={styles.secondaryButton}
              >
                Copy Frontmatter
              </button>
            </div>
          </div>
          
          <div className={styles.editorArea}>
            <MarkdownEditor
              initialContent={currentPost.content}
              onChange={handleContentChange}
              onSave={() => handleSave(false)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.postsView}>
          <p>Posts list coming soon...</p>
        </div>
      )}
    </div>
  );
}