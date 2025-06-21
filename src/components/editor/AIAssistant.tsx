import React, { useState } from 'react';

interface AIAssistantProps {
  currentContent: string;
  onInsert: (text: string) => void;
  onReplace: (text: string) => void;
  token: string;
}

type AIAction = 'generate' | 'revise' | 'titles' | 'excerpt' | 'grammar' | 'continue';

export default function AIAssistant({ currentContent, onInsert, onReplace, token }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | string[]>('');
  const [selectedAction, setSelectedAction] = useState<AIAction>('generate');

  const handleAIRequest = async () => {
    setLoading(true);
    setError(null);
    setResult('');

    try {
      const endpoint = selectedAction === 'generate' 
        ? '/api/editor/llm/generate' 
        : '/api/editor/llm/revise';

      const body = selectedAction === 'generate'
        ? { prompt, context: { tone: 'professional' } }
        : { content: currentContent, instructions, action: selectedAction };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'AI request failed');
      }

      const data = await response.json();
      setResult(data.result || data.content);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI request failed');
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (Array.isArray(result)) {
      // Title suggestions
      return (
        <div style={{ marginTop: 'var(--editor-space-lg)' }}>
          <h4>Suggested Titles:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {result.map((title, index) => (
              <li key={index} style={{ marginBottom: 'var(--editor-space-sm)' }}>
                <button
                  onClick={() => onInsert(title)}
                  className="editor-btn editor-btn-ghost editor-btn-full"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // Text result
    return (
      <div style={{ marginTop: 'var(--editor-space-lg)' }}>
        <div className="editor-panel" style={{ marginBottom: 'var(--editor-space-sm)', maxHeight: '300px', overflow: 'auto' }}>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'inherit' }}>
            {result}
          </pre>
        </div>
        <div style={{ display: 'flex', gap: 'var(--editor-space-sm)' }}>
          <button
            onClick={() => onInsert(result as string)}
            className="editor-btn editor-btn-success"
          >
            Insert at Cursor
          </button>
          <button
            onClick={() => onReplace(result as string)}
            className="editor-btn editor-btn-info"
          >
            Replace All
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3 style={{ marginTop: 0, marginBottom: 'var(--editor-space-lg)', color: 'var(--editor-color-primary)' }}>
        AI Writing Assistant
      </h3>

      <div style={{ marginBottom: 'var(--editor-space-lg)' }}>
        <label style={{ display: 'block', marginBottom: 'var(--editor-space-sm)', fontWeight: 'bold' }}>
          Action:
        </label>
        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value as AIAction)}
          className="editor-select"
        >
          <option value="generate">Generate New Content</option>
          <option value="revise">Revise Selected Text</option>
          <option value="titles">Suggest Titles</option>
          <option value="excerpt">Generate Excerpt</option>
          <option value="grammar">Fix Grammar</option>
          <option value="continue">Continue Writing</option>
        </select>
      </div>

      {selectedAction === 'generate' ? (
        <div style={{ marginBottom: 'var(--editor-space-lg)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--editor-space-sm)', fontWeight: 'bold' }}>
            Prompt:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to write about..."
            className="editor-textarea"
            style={{ minHeight: '100px' }}
          />
        </div>
      ) : selectedAction === 'revise' || selectedAction === 'continue' ? (
        <div style={{ marginBottom: 'var(--editor-space-lg)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--editor-space-sm)', fontWeight: 'bold' }}>
            Instructions:
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder={
              selectedAction === 'continue' 
                ? "Optionally describe how to continue (e.g., 'with more examples')"
                : "Describe how you want to revise the text..."
            }
            className="editor-textarea"
            style={{ minHeight: '80px' }}
          />
        </div>
      ) : null}

      <button
        onClick={handleAIRequest}
        disabled={loading || (selectedAction === 'generate' && !prompt)}
        className={`editor-btn editor-btn-primary editor-btn-full ${loading ? 'editor-loading' : ''}`}
      >
        {loading ? 'Processing...' : 'Run AI Assistant'}
      </button>

      {error && (
        <div className="editor-alert editor-alert-error" style={{ marginTop: 'var(--editor-space-sm)' }}>
          Error: {error}
        </div>
      )}

      {renderResult()}

      <div className="editor-alert editor-alert-info" style={{ marginTop: 'var(--editor-space-2xl)' }}>
        <strong>Tips:</strong>
        <ul style={{ marginTop: 'var(--editor-space-sm)', marginBottom: 0, paddingLeft: 'var(--editor-space-lg)' }}>
          <li>Select text in the editor before using "Revise" actions</li>
          <li>Use "Continue Writing" to extend your current draft</li>
          <li>"Generate Excerpt" creates a summary for your post metadata</li>
          <li>All AI features use your content's context for better results</li>
        </ul>
      </div>
    </div>
  );
}