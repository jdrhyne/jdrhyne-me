import React, { useState, useEffect } from 'react';

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

interface PostsListProps {
  token: string;
  onSelectPost: (post: PostFile) => void;
  onNewPost: () => void;
}

export default function PostsList({ token, onSelectPost, onNewPost }: PostsListProps) {
  const [posts, setPosts] = useState<PostFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'drafts' | 'published'>('all');

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/editor/posts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'drafts') return post.isDraft;
    if (filter === 'published') return !post.isDraft;
    return true;
  });

  if (loading) {
    return (
      <div className="editor-loading" style={{ padding: 'var(--editor-space-2xl)', textAlign: 'center' }}>
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="editor-alert editor-alert-error" style={{ margin: 'var(--editor-space-lg)' }}>
        Error: {error}
        <button onClick={fetchPosts} className="editor-btn editor-btn-sm editor-btn-secondary" style={{ marginLeft: 'var(--editor-space-sm)' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--editor-space-lg)', height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 'var(--editor-space-lg)',
        borderBottom: '1px solid var(--editor-border-light)',
        paddingBottom: 'var(--editor-space-md)'
      }}>
        <h2 style={{ margin: 0, color: 'var(--editor-color-primary)' }}>All Posts</h2>
        <button onClick={onNewPost} className="editor-btn editor-btn-primary editor-btn-sm">
          + New Post
        </button>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: 'var(--editor-space-sm)', 
        marginBottom: 'var(--editor-space-lg)' 
      }}>
        <button
          onClick={() => setFilter('all')}
          className={`editor-btn editor-btn-sm ${filter === 'all' ? 'editor-btn-primary' : 'editor-btn-ghost'}`}
        >
          All ({posts.length})
        </button>
        <button
          onClick={() => setFilter('drafts')}
          className={`editor-btn editor-btn-sm ${filter === 'drafts' ? 'editor-btn-primary' : 'editor-btn-ghost'}`}
        >
          Drafts ({posts.filter(p => p.isDraft).length})
        </button>
        <button
          onClick={() => setFilter('published')}
          className={`editor-btn editor-btn-sm ${filter === 'published' ? 'editor-btn-primary' : 'editor-btn-ghost'}`}
        >
          Published ({posts.filter(p => !p.isDraft).length})
        </button>
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          color: 'var(--editor-text-muted)', 
          padding: 'var(--editor-space-2xl)' 
        }}>
          {filter === 'all' ? 'No posts yet.' : 
           filter === 'drafts' ? 'No drafts yet.' : 
           'No published posts yet.'}
          <br />
          <button onClick={onNewPost} className="editor-btn editor-btn-secondary editor-btn-sm" style={{ marginTop: 'var(--editor-space-md)' }}>
            Create your first post
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--editor-space-md)' }}>
          {filteredPosts.map((post) => (
            <div
              key={`${post.filename}-${post.isDraft}`}
              onClick={() => onSelectPost(post)}
              className="editor-card"
              style={{
                cursor: 'pointer',
                transition: 'all var(--editor-transition-base)',
                borderLeft: `4px solid ${post.isDraft ? 'var(--editor-color-warning)' : 'var(--editor-color-success)'}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--editor-shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--editor-shadow-sm)';
              }}
            >
              {/* Post Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: 'var(--editor-space-sm)'
              }}>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: 'var(--editor-font-size-lg)',
                  color: 'var(--editor-text-primary)'
                }}>
                  {post.metadata.title || post.filename.replace('.md', '')}
                </h3>
                <span 
                  className={`editor-btn editor-btn-sm ${post.isDraft ? 'editor-btn-warning' : 'editor-btn-success'}`}
                  style={{ pointerEvents: 'none', fontSize: 'var(--editor-font-size-xs)' }}
                >
                  {post.isDraft ? 'Draft' : 'Published'}
                </span>
              </div>

              {/* Post Description */}
              {post.metadata.description && (
                <p style={{ 
                  margin: '0 0 var(--editor-space-sm) 0', 
                  color: 'var(--editor-text-secondary)',
                  fontSize: 'var(--editor-font-size-sm)'
                }}>
                  {post.metadata.description}
                </p>
              )}

              {/* Post Preview */}
              <p style={{ 
                margin: '0 0 var(--editor-space-md) 0', 
                color: 'var(--editor-text-muted)',
                fontSize: 'var(--editor-font-size-sm)',
                lineHeight: '1.4'
              }}>
                {truncateContent(post.content)}
              </p>

              {/* Post Meta */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontSize: 'var(--editor-font-size-xs)',
                color: 'var(--editor-text-muted)'
              }}>
                <div>
                  Last modified: {formatDate(post.lastModified)}
                </div>
                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 'var(--editor-space-xs)' }}>
                    {post.metadata.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        style={{
                          background: 'var(--editor-bg-tertiary)',
                          padding: '2px var(--editor-space-xs)',
                          borderRadius: 'var(--editor-radius-sm)',
                          fontSize: 'var(--editor-font-size-xs)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {post.metadata.tags.length > 3 && (
                      <span style={{ color: 'var(--editor-text-muted)' }}>
                        +{post.metadata.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}