# Secret Visual Editor Implementation Plan

## Overview
Build a secure, hidden visual markdown editor for jdrhyne.me with live preview, image management, and AI integration capabilities.

## Architecture Design

### Security Model
```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│   Browser       │────▶│  Auth Layer  │────▶│   Editor    │
│  (Password)     │     │  (JWT/Cookie)│     │  (React)    │
└─────────────────┘     └──────────────┘     └─────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │   API Layer  │
                        │  (Protected) │
                        └──────────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
            ┌─────────────┐       ┌─────────────┐
            │   Drafts    │       │  Published  │
            │  Storage    │       │   Storage   │
            └─────────────┘       └─────────────┘
```

### Component Structure
```
EditorApp (Main Container)
├── AuthWrapper (Security)
├── EditorLayout (UI Shell)
│   ├── Header (Save/Publish/Logout)
│   ├── Sidebar (File Browser)
│   └── MainContent
│       ├── MarkdownEditor (MDXEditor)
│       ├── PreviewPane (Live Preview)
│       └── MetadataPanel (Frontmatter)
└── AIAssistant (Claude Integration)
```

## Implementation Phases

### Phase 1: Foundation & Security (Day 1 Morning)
**Goal**: Secure authentication and basic route structure

**Commits**:
1. `feat(editor): Add authentication system with JWT and bcrypt`
2. `feat(editor): Create protected editor routes and middleware`
3. `feat(editor): Add environment configuration for editor`
4. `test(editor): Verify authentication flow and security`

**Deliverables**:
- Working login page at `/editor/login`
- JWT-based authentication
- Protected `/editor` routes
- Environment variables configured

### Phase 2: Basic Editor Integration (Day 1 Afternoon)
**Goal**: Working markdown editor with basic functionality

**Commits**:
1. `feat(editor): Integrate MDXEditor with Astro React integration`
2. `feat(editor): Add split-pane layout for editor and preview`
3. `feat(editor): Implement draft auto-save functionality`
4. `feat(editor): Add frontmatter metadata editor panel`

**Deliverables**:
- Visual markdown editor working
- Live preview in split view
- Basic save/load functionality
- Metadata editing

### Phase 3: File Management System (Day 1 Evening)
**Goal**: Complete CRUD operations for drafts

**Commits**:
1. `feat(editor): Add draft storage API endpoints`
2. `feat(editor): Implement file browser sidebar`
3. `feat(editor): Add create/rename/delete draft operations`
4. `feat(editor): Add publish to thoughts functionality`

**Deliverables**:
- Full draft management
- File browser UI
- Move between draft/published states

### Phase 4: Image Management (Day 2 Morning)
**Goal**: Image upload and management system

**Commits**:
1. `feat(editor): Add image upload API with Sharp optimization`
2. `feat(editor): Implement drag-and-drop image uploads`
3. `feat(editor): Add image gallery and management UI`
4. `feat(editor): Integrate image insertion into editor`

**Deliverables**:
- Image upload working
- Automatic optimization
- Gallery view of uploaded images
- Easy insertion into posts

### Phase 5: AI Integration (Day 2 Afternoon)
**Goal**: Claude integration for content assistance

**Commits**:
1. `feat(editor): Add Claude API integration for content edits`
2. `feat(editor): Implement AI suggestion UI in editor toolbar`
3. `feat(editor): Add AI-powered metadata generation`
4. `feat(editor): Create AI revision history tracking`

**Deliverables**:
- AI edit functionality
- Suggestion interface
- Revision tracking

### Phase 6: Polish & Production (Day 2 Evening)
**Goal**: Production-ready with all edge cases handled

**Commits**:
1. `feat(editor): Add comprehensive error handling and loading states`
2. `feat(editor): Implement keyboard shortcuts and accessibility`
3. `security(editor): Add rate limiting and input validation`
4. `docs(editor): Add editor documentation and usage guide`

**Deliverables**:
- Production-ready editor
- Full documentation
- Security hardened

## Git Strategy

### Branch Structure
```
main
└── feature/secret-editor
    ├── editor-auth
    ├── editor-core
    ├── editor-files
    ├── editor-images
    ├── editor-ai
    └── editor-polish
```

### Using claude-code-github
```bash
# Before each phase
claude-code-github check

# After each atomic change
git add -p  # Stage specific changes
claude-code-github suggest  # Get commit message suggestion
git commit

# Before merging
claude-code-github review feature/secret-editor
```

### Commit Guidelines
- **Atomic**: Each commit does one thing
- **Prefix**: feat/fix/docs/test/security
- **Scope**: (editor) for all editor commits
- **Message**: Present tense, clear description
- **Body**: Why, not what (when needed)

## Technical Stack

### Core Dependencies
```json
{
  "dependencies": {
    "@astrojs/react": "^3.0.0",
    "@astrojs/node": "^8.0.0",
    "@mdxeditor/editor": "^3.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "gray-matter": "^4.0.3",
    "sharp": "^0.33.0",
    "react-split-pane": "^0.1.92"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/bcryptjs": "^2.4.6"
  }
}
```

### Environment Variables
```bash
# .env.development
EDITOR_PASSWORD=your-secure-password-here
EDITOR_JWT_SECRET=your-jwt-secret-here
EDITOR_ENABLED=true
EDITOR_SESSION_DURATION=14400  # 4 hours
CLAUDE_API_KEY=your-claude-api-key  # For AI features
MAX_UPLOAD_SIZE=5242880  # 5MB
```

## Security Implementation

### Authentication Flow
1. User visits `/editor`
2. Redirect to `/editor/login` if not authenticated
3. Password verification against bcrypt hash
4. JWT token generation with 4-hour expiry
5. Token stored in httpOnly cookie
6. All API calls verify token

### Production Safety
- Editor routes return 404 in production unless `EDITOR_ENABLED=true`
- No editor code included in production bundle without flag
- All uploads go to gitignored directory
- Rate limiting on all endpoints

## Risk Mitigation

### Potential Issues & Solutions

1. **Accidental Public Exposure**
   - Solution: Multiple environment checks
   - 404 responses without proper config
   - No sitemap inclusion

2. **Large File Uploads**
   - Solution: File size limits
   - Sharp optimization for images
   - Chunked upload support

3. **Merge Conflicts with Main Content**
   - Solution: Separate drafts directory
   - Clear publish workflow
   - Backup before publish

4. **Performance Impact**
   - Solution: Lazy load editor
   - Code splitting
   - CDN for editor assets

### Testing Strategy
- Manual auth flow testing after Phase 1
- Editor functionality testing after Phase 2
- File operation verification after Phase 3
- Image upload testing after Phase 4
- AI integration testing after Phase 5
- Full E2E testing after Phase 6

### Rollback Plan
- Each phase on separate branch
- Can revert to any phase
- Feature flag for emergency disable
- All editor routes isolated

## Success Metrics
- [ ] Secure authentication working
- [ ] Visual editor with live preview
- [ ] Draft management functional
- [ ] Image uploads working
- [ ] AI edits integrated
- [ ] Production ready with docs

## Implementation Timeline
- **Day 1**: Phases 1-3 (Foundation through File Management)
- **Day 2**: Phases 4-6 (Images through Production)
- **Buffer**: 4 hours for testing and fixes

---

Ready to implement? Start with:
```bash
git checkout -b feature/secret-editor
git checkout -b editor-auth
```