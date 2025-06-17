import React, { useState, useEffect, useRef } from 'react';

interface PlainTextEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  onSave?: (content: string) => void;
}

export default function PlainTextEditor({ 
  initialContent = '', 
  onChange,
  onSave 
}: PlainTextEditorProps) {
  const [value, setValue] = useState(initialContent);
  const [preview, setPreview] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simple markdown to HTML conversion
  useEffect(() => {
    // Very basic markdown parsing
    let html = value
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*\*(.*)\*\*\*/gim, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/\n\n/gim, '</p><p>')
      .replace(/^- (.*)$/gim, '<li>$1</li>');
    
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    
    setPreview(html);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setUnsavedChanges(true);
    onChange?.(newValue);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(value);
      setLastSaved(new Date());
      setUnsavedChanges(false);
    }
  };

  // Save shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [value]);

  // Insert markdown helpers
  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    setValue(newText);
    setUnsavedChanges(true);
    onChange?.(newText);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="editor-toolbar">
        <button onClick={handleSave} className="btn-save" disabled={!unsavedChanges}>
          {unsavedChanges ? 'Save Draft' : 'Saved'}
        </button>
        {lastSaved && (
          <span className="save-status">
            Last saved: {lastSaved.toLocaleTimeString()}
          </span>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
          <button 
            onClick={() => insertMarkdown('**', '**')} 
            title="Bold"
            style={{ padding: '5px 10px', background: '#fff', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}
          >B</button>
          <button 
            onClick={() => insertMarkdown('*', '*')} 
            title="Italic"
            style={{ padding: '5px 10px', background: '#fff', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}
          >I</button>
          <button 
            onClick={() => insertMarkdown('# ')} 
            title="Heading"
            style={{ padding: '5px 10px', background: '#fff', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}
          >H</button>
          <button 
            onClick={() => insertMarkdown('- ')} 
            title="List"
            style={{ padding: '5px 10px', background: '#fff', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}
          >•</button>
          <button 
            onClick={() => insertMarkdown('[', '](url)')} 
            title="Link"
            style={{ padding: '5px 10px', background: '#fff', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}
          >🔗</button>
          <button 
            onClick={() => insertMarkdown('```\n', '\n```')} 
            title="Code"
            style={{ padding: '5px 10px', background: '#fff', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}
          >{'<>'}</button>
        </div>
      </div>
      
      <div style={{ flex: 1, display: 'flex', gap: '20px', padding: '20px', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3>Markdown</h3>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '14px',
              fontFamily: 'monospace',
              lineHeight: '1.5',
              border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'none',
              outline: 'none'
            }}
            placeholder="Write your markdown here..."
          />
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3>Preview</h3>
          <div 
            dangerouslySetInnerHTML={{ __html: preview }}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              overflow: 'auto',
              backgroundColor: 'white'
            }}
          />
        </div>
      </div>
    </div>
  );
}