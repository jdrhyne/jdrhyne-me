import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import ImageUpload from './ImageUpload';

interface PlainTextEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  onSave?: (content: string) => void;
}

export interface PlainTextEditorHandle {
  insertText: (text: string) => void;
}

const PlainTextEditor = forwardRef<PlainTextEditorHandle, PlainTextEditorProps>(function PlainTextEditor({ 
  initialContent = '', 
  onChange,
  onSave 
}, ref) {
  const [value, setValue] = useState(initialContent);
  const [preview, setPreview] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Get token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('editorToken') || '' : '';

  // Enhanced markdown to HTML conversion
  useEffect(() => {
    let html = value;
    
    // Code blocks with language support
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => {
      return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // Headers
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>');
    
    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/gim, '<img src="$2" alt="$1" />');
    
    // Bold and italic
    html = html.replace(/\*\*\*(.*)\*\*\*/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    html = html.replace(/___(.*)___/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/__(.*)__/gim, '<strong>$1</strong>');
    html = html.replace(/_(.*)_/gim, '<em>$1</em>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
    
    // Blockquotes
    html = html.replace(/^> (.*)$/gim, '<blockquote>$1</blockquote>');
    
    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr />');
    html = html.replace(/^\*\*\*$/gim, '<hr />');
    
    // Lists
    html = html.replace(/^\* (.*)$/gim, '<li>$1</li>');
    html = html.replace(/^- (.*)$/gim, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*)$/gim, '<li>$1</li>');
    
    // Wrap consecutive list items
    html = html.replace(/(<li>.*<\/li>\n?)+/gim, (match) => {
      return '<ul>' + match + '</ul>';
    });
    
    // Paragraphs
    html = html.split('\n\n').map(para => {
      if (para.match(/^<(h[1-6]|ul|ol|blockquote|pre|hr)/)) {
        return para;
      }
      return para ? `<p>${para}</p>` : '';
    }).join('\n');
    
    setPreview(html);
  }, [value]);
  
  const escapeHtml = (text: string) => {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  };

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

  const handleImageUpload = (url: string) => {
    const imageMarkdown = `![Image description](${url})\n`;
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const newText = value.substring(0, start) + imageMarkdown + value.substring(start);
      setValue(newText);
      setUnsavedChanges(true);
      onChange?.(newText);
      setShowImageUpload(false);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
      }, 0);
    }
  };

  // Expose insertText method to parent
  useImperativeHandle(ref, () => ({
    insertText: (text: string) => {
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const newText = value.substring(0, start) + text + value.substring(start);
        setValue(newText);
        setUnsavedChanges(true);
        onChange?.(newText);
        
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + text.length, start + text.length);
        }, 0);
      }
    }
  }));

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
            onClick={() => insertMarkdown('## ')} 
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
            title="Code Block"
            style={{ padding: '5px 10px', background: '#fff', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}
          >{'<>'}</button>
          <button 
            onClick={() => insertMarkdown('> ')} 
            title="Quote"
            style={{ padding: '5px 10px', background: '#fff', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}
          >“</button>
          <button 
            onClick={() => insertMarkdown('| Column 1 | Column 2 |\n|----------|----------|\n| ', ' |  |')} 
            title="Table"
            style={{ padding: '5px 10px', background: '#fff', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}
          >▦</button>
          <button 
            onClick={() => setShowImageUpload(!showImageUpload)} 
            title="Insert Image"
            style={{ 
              padding: '5px 10px', 
              background: showImageUpload ? '#e0e0e0' : '#fff', 
              border: '1px solid #ddd', 
              borderRadius: '3px', 
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >📷</button>
        </div>
      </div>
      
      {showImageUpload && (
        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <ImageUpload onUpload={handleImageUpload} token={token} />
        </div>
      )}
      
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
              backgroundColor: 'white',
              lineHeight: '1.6'
            }}
            className="markdown-preview"
          />
        </div>
      </div>
    </div>
  );
});

export default PlainTextEditor;