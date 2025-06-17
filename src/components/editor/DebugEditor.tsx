import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function DebugEditor() {
  const [value, setValue] = useState("# Hello World\n\nType here to test the editor");
  
  useEffect(() => {
    // Log any textarea elements found
    const textareas = document.querySelectorAll('textarea');
    console.log('Found textareas:', textareas.length);
    
    textareas.forEach((textarea, index) => {
      console.log(`Textarea ${index}:`, {
        className: textarea.className,
        style: window.getComputedStyle(textarea),
        value: textarea.value,
        placeholder: textarea.placeholder,
        offsetWidth: textarea.offsetWidth,
        offsetHeight: textarea.offsetHeight,
        opacity: window.getComputedStyle(textarea).opacity,
        visibility: window.getComputedStyle(textarea).visibility,
        display: window.getComputedStyle(textarea).display,
        color: window.getComputedStyle(textarea).color,
        backgroundColor: window.getComputedStyle(textarea).backgroundColor,
      });
    });
    
    // Check for the MDEditor specific elements
    const mdEditorText = document.querySelector('.w-md-editor-text');
    const mdEditorInput = document.querySelector('.w-md-editor-text-input');
    const mdEditorPre = document.querySelector('.w-md-editor-text-pre');
    
    console.log('MDEditor elements:', {
      mdEditorText,
      mdEditorInput,
      mdEditorPre
    });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Debug MDEditor</h2>
      <p>Check the console for debug information</p>
      
      {/* Add explicit styles to ensure visibility */}
      <style>{`
        /* Force textarea visibility */
        .w-md-editor textarea,
        .w-md-editor-text-input {
          color: black !important;
          background-color: white !important;
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
          z-index: 1 !important;
          position: relative !important;
        }
        
        /* Ensure pre overlay doesn't block textarea */
        .w-md-editor-text-pre {
          pointer-events: none !important;
          z-index: 0 !important;
        }
        
        /* Debug borders */
        .w-md-editor-text {
          border: 2px solid red !important;
        }
        
        .w-md-editor textarea {
          border: 2px solid blue !important;
        }
      `}</style>
      
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || '')}
        preview="edit"
        height={400}
        data-color-mode="light"
      />
      
      <div style={{ marginTop: '20px' }}>
        <h3>Current Value:</h3>
        <pre style={{ background: '#f0f0f0', padding: '10px' }}>
          {value}
        </pre>
      </div>
    </div>
  );
}