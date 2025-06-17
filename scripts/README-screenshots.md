# Screenshot Capture Tools

This directory contains scripts for capturing UI screenshots during development.

## Available Scripts

### 1. `auto-capture.sh` (Recommended)
Automatically captures the frontmost browser window.

```bash
./scripts/auto-capture.sh "description-of-change"
```

**Features:**
- Automatically detects and captures the active browser window
- Works with Chrome, Safari, Firefox, Arc, Edge, and Brave
- No user interaction required if browser is in foreground
- Captures only the browser window, not the entire screen

### 2. `capture-editor.sh`
Interactive browser window capture with user guidance.

```bash
./scripts/capture-editor.sh "description-of-change"
```

**Features:**
- Provides clear instructions
- User clicks on the window to capture
- Good for capturing specific windows or states

### 3. `capture-browser.sh`
Advanced capture with browser detection and AppleScript integration.

```bash
./scripts/capture-browser.sh "description-of-change"
```

## Screenshot Naming Convention

Screenshots are saved with the following format:
```
YYYYMMDD_HHMMSS_description-of-change.png
```

Example: `20250616_161730_editor-full-height-browser-only.png`

## Screenshot Storage

- All screenshots are saved in the `screenshots/` directory
- A `changelog.txt` file tracks all captures with timestamps
- Screenshots are ignored by git (added to `.gitignore`)

## Best Practices

1. **Before capturing**: Make sure the editor is loaded and showing the UI state you want to capture
2. **Use descriptive names**: Use clear, hyphenated descriptions like "editor-height-expanded" or "markdown-preview-added"
3. **Browser focus**: Ensure your browser window is in the foreground when using `auto-capture.sh`
4. **Consistent viewport**: Try to maintain a consistent browser window size for comparable screenshots

## Viewing Screenshots

To view recent screenshots:
```bash
ls -lt screenshots/ | head -10
```

To open the most recent screenshot:
```bash
open screenshots/$(ls -t screenshots/*.png | head -1)
```

## Changelog

The `screenshots/changelog.txt` file maintains a log of all captures:
```
2025-06-16 16:17:30 - editor-full-height-browser-only - screenshots/20250616_161730_editor-full-height-browser-only.png - 2804x3804
```