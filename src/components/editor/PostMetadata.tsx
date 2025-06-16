import React from 'react';
import styles from './PostMetadata.module.css';

export interface PostMetadataData {
  title: string;
  description: string;
  date: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  author: string;
  image?: string;
}

interface PostMetadataProps {
  metadata: PostMetadataData;
  onChange: (metadata: PostMetadataData) => void;
}

export function PostMetadata({ metadata, onChange }: PostMetadataProps) {
  const handleChange = (field: keyof PostMetadataData, value: any) => {
    onChange({
      ...metadata,
      [field]: value
    });
  };

  const handleArrayChange = (field: 'categories' | 'tags', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    handleChange(field, items);
  };

  return (
    <div className={styles.metadataContainer}>
      <h3>Post Metadata</h3>
      
      <div className={styles.formGroup}>
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={metadata.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter post title"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={metadata.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Brief description for SEO"
          rows={2}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          value={metadata.excerpt}
          onChange={(e) => handleChange('excerpt', e.target.value)}
          placeholder="Short excerpt for post preview"
          rows={3}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="date">Date *</label>
          <input
            type="datetime-local"
            id="date"
            value={metadata.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={metadata.author}
            onChange={(e) => handleChange('author', e.target.value)}
            placeholder="Author name"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="categories">Categories</label>
        <input
          type="text"
          id="categories"
          value={metadata.categories.join(', ')}
          onChange={(e) => handleArrayChange('categories', e.target.value)}
          placeholder="Comma-separated categories"
        />
        <small>Separate multiple categories with commas</small>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          value={metadata.tags.join(', ')}
          onChange={(e) => handleArrayChange('tags', e.target.value)}
          placeholder="Comma-separated tags"
        />
        <small>Separate multiple tags with commas</small>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image">Featured Image URL</label>
        <input
          type="text"
          id="image"
          value={metadata.image || ''}
          onChange={(e) => handleChange('image', e.target.value)}
          placeholder="URL to featured image"
        />
      </div>
    </div>
  );
}