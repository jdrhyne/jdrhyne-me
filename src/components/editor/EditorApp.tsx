import React, { useState, useEffect } from 'react';
import { EditorDashboard } from './EditorDashboard';
import './editor-styles.css';

export function EditorApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Verify authentication on mount
    fetch('/api/editor/auth/verify')
      .then(res => res.json())
      .then(data => {
        setAuthenticated(data.authenticated);
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);
  
  const handleLogout = async () => {
    await fetch('/api/editor/auth/logout', { method: 'POST' });
    window.location.href = '/editor/login';
  };
  
  if (loading) {
    return <div className="editor-loading">Loading...</div>;
  }
  
  if (!authenticated) {
    window.location.href = '/editor/login';
    return null;
  }
  
  return (
    <div className="editor-app">
      <header className="editor-header">
        <h1>Content Editor</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </header>
      
      <main className="editor-main">
        <EditorDashboard />
      </main>
    </div>
  );
}