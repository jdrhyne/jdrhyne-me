import React, { useState, useCallback, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

interface MarkdownEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  onSave?: (content: string) => void;
}

export function MarkdownEditor({ 
  initialContent = '', 
  onChange,
  onSave 
}: MarkdownEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Auto-save every 30 seconds if there are changes
  useEffect(() => {
    if (!unsavedChanges || !onSave) return;
    
    const timer = setTimeout(() => {
      handleSave();
    }, 30000);
    
    return () => clearTimeout(timer);
  }, [content, unsavedChanges]);

  const handleChange = useCallback((value?: string) => {
    const newContent = value || '';
    setContent(newContent);
    setUnsavedChanges(true);
    onChange?.(newContent);
  }, [onChange]);

  const handleSave = useCallback(() => {
    onSave?.(content);
    setLastSaved(new Date());
    setUnsavedChanges(false);
  }, [content, onSave]);

  // Keyboard shortcut for save (Cmd/Ctrl + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);

  return (
    <div className="markdown-editor">
      <div className="editor-toolbar">
        <button 
          onClick={handleSave}
          className="btn-save"
          disabled={!unsavedChanges}
        >
          {unsavedChanges ? 'Save Draft' : 'Saved'}
        </button>
        {lastSaved && (
          <span className="save-status">
            Last saved: {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>
      
      <div className="editor-container">
        <Allotment>
          <Allotment.Pane minSize={300}>
            <MDEditor
              value={content}
              onChange={handleChange}
              preview="edit"
              height="100%"
              data-color-mode="light"
            />
          </Allotment.Pane>
          <Allotment.Pane minSize={300}>
            <MDEditor.Markdown 
              source={content} 
              style={{ 
                height: '100%', 
                padding: '20px',
                overflow: 'auto'
              }}
            />
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
}