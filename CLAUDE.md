# Claude Code Setup Instructions

## Conversation Logging

This project uses a conversation logging system to preserve important context and decisions made during Claude sessions.

### On Startup:
1. Check that the `claude-conversations/` directory exists
2. Verify `.gitignore` includes `claude-conversations/`
3. Ensure `claude-conversations/save-context.sh` is executable

### During Sessions:
- Run `./claude-conversations/save-context.sh` to capture current project state
- This is especially important before:
  - Long breaks
  - Context switches
  - Major feature completions
  - When Claude's conversation might compact

### Session Summaries:
Ask Claude to create session summaries after completing major features:
```
"Claude, please create a summary of our conversation including all important decisions and code changes, and save it to claude-conversations/session_summary_[date].md"
```

### What Gets Logged:
- Git status and current branch
- Recent commits
- Files modified in current session
- Session summaries (when requested)

All logs are kept private and never committed to the repository.