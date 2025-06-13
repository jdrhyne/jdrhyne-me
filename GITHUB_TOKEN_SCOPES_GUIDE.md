# GitHub Token Scopes Guide for MCP Servers

## Overview

This guide outlines the required GitHub token scopes for the MCP (Model Context Protocol) servers configured in your Claude Desktop setup.

## Token Scopes by MCP Server

### 1. @modelcontextprotocol/server-github

**Minimum Required Scopes:**
- **For public repositories only**: `public_repo`
- **For private repositories**: `repo` (includes public_repo access)

**Token Type Options:**
- **Classic Personal Access Token**: Use the scopes above
- **Fine-grained Personal Access Token**: Set "Contents" permission to "Read and write" for target repositories

### 2. @jdrhyne/mcp-server-github and @jdrhyne/claude-code-github

Since these appear to be custom or forked versions, they likely require similar permissions to the official GitHub MCP server. Recommended scopes based on typical GitHub MCP functionality:

**Recommended Scopes:**
- `repo` - Full control of private repositories (if accessing private repos)
- `public_repo` - Access public repositories (if only accessing public repos)
- `read:user` - Read user profile data
- `read:org` - Read org and team membership (if working with organizations)

**Optional Scopes (based on your needs):**
- `workflow` - Update GitHub Action workflows
- `write:discussion` - Write discussions
- `delete_repo` - Delete repositories (use with caution)

## Creating Your GitHub Token

### Option 1: Classic Personal Access Token (Simpler)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give your token a descriptive name (e.g., "Claude MCP Access")
4. Set expiration (recommend 90 days for security)
5. Select scopes:
   - **Minimum**: `public_repo` (for public repos) OR `repo` (for private repos)
   - **Recommended**: `repo`, `read:user`, `read:org`
6. Click "Generate token" and copy immediately

### Option 2: Fine-grained Personal Access Token (More Secure)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Click "Generate new token"
3. Set expiration and select repositories
4. Configure permissions:
   - **Contents**: Read and write
   - **Metadata**: Read (automatically included)
   - **Pull requests**: Read and write (if needed)
   - **Issues**: Read and write (if needed)
5. Generate and copy token

## Security Best Practices

1. **Principle of Least Privilege**: Only grant the minimum permissions needed
2. **Repository Scope**: Limit token access to specific repositories when possible
3. **Regular Rotation**: Set expiration dates and rotate tokens regularly
4. **Secure Storage**: Never commit tokens to version control
5. **Monitor Usage**: Check GitHub's security log for token usage

## Implementing Secure Token Storage

Instead of hardcoding tokens in config files, use environment variables:

```bash
# Add to ~/.zshrc or ~/.bashrc
export GITHUB_TOKEN="your_token_here"
```

Update your Claude config to use the environment variable:
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

## Warning: Security Considerations

Be aware that MCP servers have access to the repositories you grant them. There are known architectural vulnerabilities where malicious actors could potentially access private repository data through MCP servers. Always:

1. Use separate tokens for different purposes
2. Limit token scope to only necessary repositories
3. Regularly audit token permissions
4. Revoke tokens that are no longer needed

## Quick Start Recommendation

For most users working with their own repositories:

1. Create a classic personal access token
2. Select the `repo` scope (for full access to your repos)
3. Set a 90-day expiration
4. Store the token securely using environment variables
5. Test with a non-critical repository first

Remember to revoke and regenerate tokens if they are ever exposed or compromised.