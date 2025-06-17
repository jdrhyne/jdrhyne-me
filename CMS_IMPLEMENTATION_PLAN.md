# CMS Implementation Plan for jdrhyne.me

## Executive Summary

This document outlines a comprehensive plan to upgrade the current basic editor into a full-featured Content Management System (CMS) for the jdrhyne.me blog, built on Astro.js with React 19 compatibility.

## Current State Analysis

### Existing Infrastructure
- **Framework**: Astro.js with React 19
- **Authentication**: JWT-based with bcrypt password hashing
- **Editor**: PlainTextEditor component with basic markdown support
- **Storage**: File-based system with drafts in `/src/content/drafts` and published posts in `/src/content/thoughts`
- **API**: Basic CRUD endpoints for posts under `/api/editor/`
- **Theme**: volks-typo styling system

### Current Limitations
- No image upload capability
- Basic markdown preview without full feature support
- No LLM integration
- Manual publishing workflow
- No deployment automation
- Limited post metadata management

## Architecture Design

### Overall Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React 19)                │
├─────────────────────────────────────────────────────┤
│  Editor UI │ Media Manager │ LLM Assistant │ Deploy │
├─────────────────────────────────────────────────────┤
│                   API Layer (Astro)                  │
├─────────────────────────────────────────────────────┤
│  Auth │ Posts │ Media │ LLM │ Deploy │ Git │ Search │
├─────────────────────────────────────────────────────┤
│                  Storage Layer                       │
├─────────────────────────────────────────────────────┤
│   Files   │   Media    │    Git    │   Database    │
│  (MD/MDX) │  (Images)  │  (History) │  (Metadata)   │
└─────────────────────────────────────────────────────┘
```

### Technology Stack

1. **Frontend**
   - React 19 with TypeScript
   - TanStack Query for data fetching
   - MDXEditor or enhanced custom editor
   - React Dropzone for file uploads
   - Allotment for split panes (already installed)

2. **Backend**
   - Astro.js SSG/SSR hybrid mode
   - Node.js API routes
   - Sharp for image processing
   - Simple-git for version control
   - SQLite for metadata storage

3. **LLM Integration**
   - Anthropic SDK (already installed)
   - OpenAI API as alternative
   - Streaming support for real-time generation

4. **Deployment**
   - Vercel API for deployments
   - GitHub Actions for CI/CD
   - Environment variable management

## Phase 1: Enhanced Editor & Media Management (2-3 weeks)

### 1.1 Upgrade Editor Component

**Tasks:**
- Replace PlainTextEditor with a full-featured markdown editor
- Add syntax highlighting with Shiki (already available)
- Implement live preview with proper styling
- Add toolbar with advanced formatting options

**Implementation:**
```typescript
// src/components/editor/MarkdownEditor.tsx
interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload: (file: File) => Promise<string>;
  suggestions?: LLMSuggestion[];
}
```

### 1.2 Image Upload System

**Tasks:**
- Create drag-and-drop image upload component
- Implement image processing pipeline
- Build media library UI
- Add image optimization with Sharp

**API Endpoints:**
```typescript
// POST /api/editor/media/upload
// GET /api/editor/media
// DELETE /api/editor/media/:id
// POST /api/editor/media/optimize
```

**Storage Structure:**
```
public/
├── images/
│   ├── uploads/
│   │   ├── 2024/
│   │   │   ├── 01/
│   │   │   │   ├── image-original.jpg
│   │   │   │   ├── image-1200w.webp
│   │   │   │   ├── image-800w.webp
│   │   │   │   └── image-400w.webp
```

### 1.3 Post Metadata Management

**Tasks:**
- Enhance PostMetadata component
- Add featured image selector
- Implement category/tag management
- Add SEO metadata fields

**Schema Enhancement:**
```typescript
interface PostMetadata {
  title: string;
  description: string;
  date: Date;
  excerpt?: string;
  categories: string[];
  tags: string[];
  author: string;
  image?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
  publishedAt?: Date;
  updatedAt?: Date;
}
```

## Phase 2: LLM Integration (1-2 weeks)

### 2.1 LLM Service Layer

**Tasks:**
- Create LLM service abstraction
- Implement Anthropic Claude integration
- Add OpenAI as fallback option
- Build prompt templates system

**Service Architecture:**
```typescript
// src/lib/editor/llm.ts
interface LLMService {
  generateContent(prompt: string, context?: PostContext): Promise<string>;
  reviseContent(content: string, instructions: string): Promise<string>;
  suggestTitles(content: string): Promise<string[]>;
  generateExcerpt(content: string): Promise<string>;
  improveGrammar(content: string): Promise<string>;
}
```

### 2.2 Editor AI Features

**Tasks:**
- Add AI writing assistant panel
- Implement context-aware suggestions
- Create revision workflow
- Add tone/style adjustments

**UI Components:**
```typescript
// src/components/editor/AIAssistant.tsx
interface AIAssistantProps {
  currentContent: string;
  onSuggestion: (suggestion: string) => void;
  onRevision: (revised: string) => void;
}
```

### 2.3 Content Generation Templates

**Predefined Templates:**
- Blog post outline
- Introduction paragraph
- Conclusion generator
- Code explanation
- SEO optimization

## Phase 3: Publishing Workflow (1-2 weeks)

### 3.1 Git Integration

**Tasks:**
- Implement git operations for version control
- Create commit history viewer
- Add rollback functionality
- Build diff viewer for changes

**Git Operations:**
```typescript
// src/lib/editor/git.ts
interface GitService {
  commit(files: string[], message: string): Promise<void>;
  getHistory(file: string): Promise<Commit[]>;
  diff(file: string, commit?: string): Promise<string>;
  rollback(file: string, commit: string): Promise<void>;
}
```

### 3.2 Publishing Pipeline

**Workflow States:**
1. Draft → Writing in progress
2. Review → Ready for review
3. Scheduled → Set for future publication
4. Published → Live on site
5. Archived → Removed from main feed

**Implementation:**
```typescript
// src/lib/editor/publishing.ts
interface PublishingService {
  publish(postId: string, options?: PublishOptions): Promise<void>;
  schedule(postId: string, date: Date): Promise<void>;
  unpublish(postId: string): Promise<void>;
  getWorkflowState(postId: string): Promise<WorkflowState>;
}
```

### 3.3 Preview System

**Tasks:**
- Create preview URLs for drafts
- Implement preview tokens
- Add responsive preview modes
- Build shareable preview links

## Phase 4: Deployment Integration (1 week)

### 4.1 Vercel Integration

**Tasks:**
- Implement Vercel API client
- Create deployment triggers
- Add deployment status monitoring
- Build deployment history

**API Integration:**
```typescript
// src/lib/editor/deployment.ts
interface DeploymentService {
  trigger(branch?: string): Promise<Deployment>;
  getStatus(deploymentId: string): Promise<DeploymentStatus>;
  getHistory(): Promise<Deployment[]>;
  rollback(deploymentId: string): Promise<void>;
}
```

### 4.2 One-Click Deploy

**UI Flow:**
1. Save all changes
2. Commit to git
3. Push to GitHub
4. Trigger Vercel build
5. Monitor deployment
6. Preview on staging URL

### 4.3 Environment Management

**Configuration:**
```env
# Editor Configuration
EDITOR_ENABLED=true
EDITOR_PASSWORD=$2b$10$...
EDITOR_JWT_SECRET=...

# LLM Configuration
ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...

# Deployment
VERCEL_TOKEN=...
VERCEL_PROJECT_ID=...
GITHUB_TOKEN=...
```

## Phase 5: Advanced Features (2-3 weeks)

### 5.1 Database Integration

**SQLite Schema:**
```sql
-- Post metadata and relationships
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME,
  author_id TEXT,
  view_count INTEGER DEFAULT 0
);

-- Media library
CREATE TABLE media (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  dimensions TEXT,
  alt_text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Analytics
CREATE TABLE analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT,
  event_type TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT
);
```

### 5.2 Search Enhancement

**Tasks:**
- Implement full-text search
- Add search indexing
- Create search UI components
- Add filters and facets

### 5.3 Analytics Dashboard

**Metrics:**
- Post views
- Popular content
- Publishing frequency
- Content performance
- SEO rankings

## Security Considerations

### Authentication & Authorization

1. **Multi-factor Authentication**
   - TOTP support
   - Backup codes
   - Session management

2. **Role-based Access**
   - Admin: Full access
   - Editor: Content management
   - Viewer: Read-only access

3. **API Security**
   - Rate limiting
   - CORS configuration
   - Input validation
   - CSRF protection

### Data Protection

1. **Encryption**
   - Passwords: bcrypt (already implemented)
   - API keys: Environment variables
   - Sensitive data: AES encryption

2. **Backup Strategy**
   - Automated git commits
   - Database backups
   - Media file backups

## UI/UX Improvements

### Editor Interface

1. **Split View Options**
   - Editor only
   - Editor + Preview
   - Editor + AI Assistant
   - Customizable layouts

2. **Dark Mode Support**
   - System preference detection
   - Manual toggle
   - Syntax highlighting themes

3. **Keyboard Shortcuts**
   - Save: Cmd/Ctrl + S
   - Publish: Cmd/Ctrl + P
   - Preview: Cmd/Ctrl + Shift + P
   - AI Assistant: Cmd/Ctrl + I

### Mobile Responsiveness

1. **Responsive Editor**
   - Touch-friendly toolbar
   - Swipe gestures
   - Optimized preview

2. **Progressive Web App**
   - Offline support
   - Install prompt
   - Push notifications

## Migration Strategy

### Phase-by-Phase Rollout

1. **Phase 1 Migration**
   - Backup existing posts
   - Test image upload
   - Validate editor functionality

2. **Phase 2 Migration**
   - Test LLM integration
   - Verify API limits
   - Train on writing style

3. **Phase 3 Migration**
   - Set up git tracking
   - Test publishing workflow
   - Verify build process

4. **Phase 4 Migration**
   - Configure Vercel
   - Test deployments
   - Set up staging environment

5. **Phase 5 Migration**
   - Initialize database
   - Migrate metadata
   - Enable analytics

## Development Timeline

### Sprint 1 (Weeks 1-2): Foundation
- Set up development environment
- Implement enhanced editor
- Basic image upload

### Sprint 2 (Weeks 3-4): Media & LLM
- Complete media management
- Integrate LLM services
- AI assistant UI

### Sprint 3 (Weeks 5-6): Publishing
- Git integration
- Publishing workflow
- Preview system

### Sprint 4 (Week 7): Deployment
- Vercel integration
- One-click deploy
- Environment setup

### Sprint 5 (Weeks 8-10): Polish
- Database integration
- Search enhancement
- Analytics dashboard
- UI/UX improvements

## Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- API endpoint testing
- Service layer testing

### Integration Tests
- Editor workflow tests
- Publishing pipeline tests
- Deployment tests

### E2E Tests
- Full user workflows
- Cross-browser testing
- Performance testing

## Monitoring & Maintenance

### Application Monitoring
- Error tracking with Sentry
- Performance monitoring
- Uptime monitoring

### Content Monitoring
- Broken link checker
- Image optimization alerts
- SEO health checks

## Cost Considerations

### Monthly Costs
- Vercel Pro: $20/month
- Anthropic API: ~$10-50/month (usage-based)
- Domain & hosting: Existing
- Total: ~$30-70/month

### One-time Costs
- Development time: 8-10 weeks
- Testing & QA: 1-2 weeks
- Documentation: 1 week

## Success Metrics

1. **Technical Metrics**
   - Page load time < 2s
   - Editor response time < 100ms
   - 99.9% uptime

2. **Usage Metrics**
   - Publishing frequency increase
   - Draft-to-published ratio
   - Media usage statistics

3. **Quality Metrics**
   - SEO score improvements
   - Content consistency
   - Error rate reduction

## Conclusion

This comprehensive plan provides a roadmap for transforming the basic editor into a powerful, modern CMS while maintaining the simplicity and performance of the Astro.js framework. The phased approach ensures minimal disruption while gradually adding sophisticated features that enhance the content creation and management experience.