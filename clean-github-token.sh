#!/bin/bash

# Script to clean exposed GitHub token from git history
# WARNING: This will rewrite git history!

echo "⚠️  IMPORTANT: Before running this script:"
echo "1. Make sure you've revoked the exposed token on GitHub"
echo "2. This will rewrite git history - coordinate with any collaborators"
echo "3. You'll need to force push after cleaning"
echo ""
echo "Press Enter to continue or Ctrl+C to cancel..."
read

# The token to remove (replace with your exposed token)
TOKEN="YOUR_EXPOSED_TOKEN_HERE"

# Navigate to AgentCopy repository
cd /Users/admin/Projects/AgentCopy

# Create a backup branch
echo "Creating backup branch..."
git branch backup-before-token-removal

# Use git filter-branch to remove the token from all commits
echo "Cleaning git history..."
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch claude_desktop_config.json" \
  --prune-empty --tag-name-filter cat -- --all

# Alternative: Replace token in files throughout history
git filter-branch --tree-filter \
  "find . -type f -exec sed -i '' 's/${TOKEN}/REDACTED_TOKEN/g' {} +" \
  --tag-name-filter cat -- --all

echo ""
echo "✅ Git history cleaned locally!"
echo ""
echo "Next steps:"
echo "1. Review the changes: git log --oneline"
echo "2. Force push to remote: git push --force --all"
echo "3. Delete the backup branch after confirming: git branch -D backup-before-token-removal"
echo ""
echo "⚠️  WARNING: Force pushing will rewrite history on the remote repository."
echo "Make sure to coordinate with any collaborators!"