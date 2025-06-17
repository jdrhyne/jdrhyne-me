import React, { useState, useEffect } from 'react';
import type { CollectionEntry } from 'astro:content';
import PublishControls from './PublishControls';
import DeploymentPanel from './DeploymentPanel';

interface PostMetadataProps {
  metadata: Partial<CollectionEntry<'thoughts'>['data']>;
  onChange: (metadata: Partial<CollectionEntry<'thoughts'>['data']>) => void;
}

export function PostMetadata({ metadata, onChange }: PostMetadataProps) {
  const [title, setTitle] = useState(metadata.title || '');
  const [description, setDescription] = useState(metadata.description || '');
  const [date, setDate] = useState(
    metadata.date ? new Date(metadata.date).toISOString().split('T')[0] : 
    new Date().toISOString().split('T')[0]
  );
  const [tags, setTags] = useState((metadata.tags || []).join(', '));
  const [excerpt, setExcerpt] = useState(metadata.excerpt || '');

  // Update parent whenever any field changes
  useEffect(() => {
    const updatedMetadata = {
      title,
      description,
      date: new Date(date),
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      excerpt: excerpt || undefined,
    };
    onChange(updatedMetadata);
  }, [title, description, date, tags, excerpt]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('editorToken') || '' : '';
  const postId = title.toLowerCase().replace(/\s+/g, '-') + '.md' || 'untitled.md';

  return (
    <div className="post-metadata">
      <h3>Post Metadata</h3>
      
      <PublishControls
        postId={postId}
        currentStatus="draft"
        onStatusChange={() => {/* TODO: Refresh status */}}
        token={token}
      />
      
      <div className="metadata-field">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />
      </div>

      <div className="metadata-field">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description for SEO"
          rows={3}
          required
        />
      </div>

      <div className="metadata-field">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Optional excerpt for previews"
          rows={2}
        />
      </div>

      <div className="metadata-field">
        <label htmlFor="date">Date *</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="metadata-field">
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Comma-separated tags"
        />
        <small>e.g., ai, development, personal</small>
      </div>
      
      <DeploymentPanel token={token} />
    </div>
  );
}