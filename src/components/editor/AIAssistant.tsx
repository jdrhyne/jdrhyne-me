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
        <div style={{ marginTop: '20px' }}>
          <h4>Suggested Titles:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {result.map((title, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <button
                  onClick={() => onInsert(title)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    background: '#f5f5f5',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
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
      <div style={{ marginTop: '20px' }}>
        <div style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '10px',
          maxHeight: '300px',
          overflow: 'auto',
        }}>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'inherit' }}>
            {result}
          </pre>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onInsert(result as string)}
            style={{
              padding: '8px 16px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Insert at Cursor
          </button>
          <button
            onClick={() => onReplace(result as string)}
            style={{
              padding: '8px 16px',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Replace All
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#c13127' }}>
        AI Writing Assistant
      </h3>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Action:
        </label>
        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value as AIAction)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
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
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Prompt:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to write about..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical',
            }}
          />
        </div>
      ) : selectedAction === 'revise' || selectedAction === 'continue' ? (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
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
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical',
            }}
          />
        </div>
      ) : null}

      <button
        onClick={handleAIRequest}
        disabled={loading || (selectedAction === 'generate' && !prompt)}
        style={{
          width: '100%',
          padding: '10px',
          background: loading ? '#ccc' : '#c13127',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        {loading ? 'Processing...' : 'Run AI Assistant'}
      </button>

      {error && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          background: '#ffebee',
          border: '1px solid #ffcdd2',
          borderRadius: '4px',
          color: '#c62828',
        }}>
          Error: {error}
        </div>
      )}

      {renderResult()}

      <div style={{
        marginTop: '30px',
        padding: '15px',
        background: '#f0f7ff',
        borderRadius: '4px',
        fontSize: '14px',
      }}>
        <strong>Tips:</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Select text in the editor before using "Revise" actions</li>
          <li>Use "Continue Writing" to extend your current draft</li>
          <li>"Generate Excerpt" creates a summary for your post metadata</li>
          <li>All AI features use your content's context for better results</li>
        </ul>
      </div>
    </div>
  );
}