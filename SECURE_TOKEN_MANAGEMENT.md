# Secure Token Management Guide

## Current Status Summary

### ✅ Completed:
1. **MCP Configuration Fixed**: Updated workspace to `/Users/admin/Projects` for multi-project access
2. **Token Removed from Local Files**: 
   - Removed from `/Users/admin/Projects/AgentCopy/claude_desktop_config.json`
   - Updated both Claude config files to use placeholder `YOUR_GITHUB_TOKEN_HERE`
3. **Cleanup Script Created**: `clean-github-token.sh` ready to clean git history

### 🚨 Action Required:
1. **IMMEDIATELY revoke the exposed token**: https://github.com/settings/tokens
2. **Run the cleanup script** to remove token from git history
3. **Generate a new token** and store it securely

## Secure Token Storage Options

### Option 1: Environment Variables (Recommended)
```bash
# Add to ~/.zshrc or ~/.bashrc
export GITHUB_TOKEN="your_new_token_here"
```

Then update Claude config to use environment variable:
```json
{
  "mcpServers": {
    "github": {
      "command": "sh",
      "args": ["-c", "GITHUB_TOKEN=$GITHUB_TOKEN npx -y @modelcontextprotocol/server-github"]
    }
  }
}
```

### Option 2: macOS Keychain
```bash
# Store token in keychain
security add-generic-password -a "$USER" -s "github-token" -w "your_new_token_here"

# Retrieve token in scripts
GITHUB_TOKEN=$(security find-generic-password -a "$USER" -s "github-token" -w)
```

### Option 3: Encrypted Config File
Use tools like `git-crypt` or `age` to encrypt sensitive config files before committing.

## Best Practices

1. **Never commit tokens directly** in configuration files
2. **Use `.gitignore`** to exclude sensitive files
3. **Use token scopes** - only grant necessary permissions
4. **Rotate tokens regularly**
5. **Use separate tokens** for different applications
6. **Monitor token usage** on GitHub's security settings

## Preventing Future Exposures

### Pre-commit Hook
Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# Detect GitHub tokens
if git diff --cached --name-only | xargs grep -E "ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}"; then
    echo "Error: GitHub token detected in commit!"
    exit 1
fi
```

### GitHub Secret Scanning
- GitHub automatically scans for exposed tokens
- Enable secret scanning alerts in repository settings
- Consider using GitHub's push protection feature

## Next Steps

1. Revoke the exposed token immediately
2. Generate a new token with minimal required scopes
3. Implement one of the secure storage options above
4. Run the cleanup script to remove token from git history
5. Force push the cleaned history to GitHub