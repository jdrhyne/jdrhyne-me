import React, { useState, useCallback } from 'react';
import MDEditor from '@uiw/react-md-editor';
import styles from './MarkdownEditor.module.css';

interface MarkdownEditorProps {
  initialContent?: string;
  onChange?: (value: string) => void;
  onSave?: (content: string) => void;
}

export function MarkdownEditor({ 
  initialContent = '', 
  onChange,
  onSave 
}: MarkdownEditorProps) {
  const [value, setValue] = useState(initialContent);
  const [saving, setSaving] = useState(false);

  const handleChange = useCallback((newValue?: string) => {
    const content = newValue || '';
    setValue(content);
    onChange?.(content);
  }, [onChange]);

  const handleSave = async () => {
    if (onSave) {
      setSaving(true);
      try {
        await onSave(value);
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorHeader}>
        <h2>Markdown Editor</h2>
        <div className={styles.editorActions}>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className={styles.saveButton}
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
        </div>
      </div>
      
      <div className={styles.editorWrapper}>
        <MDEditor
          value={value}
          onChange={handleChange}
          preview="live"
          height={600}
          data-color-mode="light"
        />
      </div>
    </div>
  );
}