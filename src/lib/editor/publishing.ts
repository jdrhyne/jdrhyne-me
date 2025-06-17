import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { createGitService } from './git';

export type WorkflowState = 'draft' | 'review' | 'scheduled' | 'published' | 'archived';

export interface PublishOptions {
  commitMessage?: string;
  scheduledDate?: Date;
}

export interface PublishingService {
  publish(postId: string, options?: PublishOptions): Promise<void>;
  schedule(postId: string, date: Date): Promise<void>;
  unpublish(postId: string): Promise<void>;
  getWorkflowState(postId: string): Promise<WorkflowState>;
  moveToDrafts(postId: string): Promise<void>;
}

class PublishingServiceImpl implements PublishingService {
  private draftsPath: string;
  private publishedPath: string;
  private gitService = createGitService();

  constructor() {
    this.draftsPath = path.join(process.cwd(), 'drafts');
    this.publishedPath = path.join(process.cwd(), 'src', 'content', 'thoughts');
  }

  async publish(postId: string, options?: PublishOptions): Promise<void> {
    try {
      const draftPath = path.join(this.draftsPath, postId);
      const publishPath = path.join(this.publishedPath, postId);

      // Read draft content
      const content = await fs.readFile(draftPath, 'utf-8');
      const { data, content: body } = matter(content);

      // Update metadata
      data.publishedAt = new Date();
      data.updatedAt = new Date();
      
      if (options?.scheduledDate) {
        data.scheduledDate = options.scheduledDate;
      }

      // Write to published location
      const updatedContent = matter.stringify(body, data);
      await fs.writeFile(publishPath, updatedContent);

      // Remove from drafts
      await fs.unlink(draftPath);

      // Commit changes
      const commitMessage = options?.commitMessage || `Publish: ${data.title || postId}`;
      await this.gitService.commit([publishPath, draftPath], commitMessage);

    } catch (error) {
      console.error('Publishing error:', error);
      throw new Error('Failed to publish post');
    }
  }

  async schedule(postId: string, date: Date): Promise<void> {
    try {
      const draftPath = path.join(this.draftsPath, postId);
      
      // Read draft content
      const content = await fs.readFile(draftPath, 'utf-8');
      const { data, content: body } = matter(content);

      // Update scheduled date
      data.scheduledDate = date;
      data.status = 'scheduled';

      // Write back to draft
      const updatedContent = matter.stringify(body, data);
      await fs.writeFile(draftPath, updatedContent);

      // Commit changes
      await this.gitService.commit([draftPath], `Schedule post: ${data.title || postId}`);

    } catch (error) {
      console.error('Scheduling error:', error);
      throw new Error('Failed to schedule post');
    }
  }

  async unpublish(postId: string): Promise<void> {
    try {
      const publishPath = path.join(this.publishedPath, postId);
      const archivePath = path.join(this.draftsPath, 'archived', postId);

      // Ensure archive directory exists
      await fs.mkdir(path.dirname(archivePath), { recursive: true });

      // Move to archive
      const content = await fs.readFile(publishPath, 'utf-8');
      await fs.writeFile(archivePath, content);
      await fs.unlink(publishPath);

      // Commit changes
      await this.gitService.commit([publishPath, archivePath], `Archive: ${postId}`);

    } catch (error) {
      console.error('Unpublishing error:', error);
      throw new Error('Failed to unpublish post');
    }
  }

  async getWorkflowState(postId: string): Promise<WorkflowState> {
    try {
      // Check published
      try {
        await fs.access(path.join(this.publishedPath, postId));
        return 'published';
      } catch {}

      // Check drafts
      try {
        const draftPath = path.join(this.draftsPath, postId);
        const content = await fs.readFile(draftPath, 'utf-8');
        const { data } = matter(content);
        
        if (data.status === 'scheduled' && data.scheduledDate) {
          return 'scheduled';
        }
        
        if (data.status === 'review') {
          return 'review';
        }

        return 'draft';
      } catch {}

      // Check archived
      try {
        await fs.access(path.join(this.draftsPath, 'archived', postId));
        return 'archived';
      } catch {}

      throw new Error('Post not found');
    } catch (error) {
      console.error('Get workflow state error:', error);
      throw new Error('Failed to get workflow state');
    }
  }

  async moveToDrafts(postId: string): Promise<void> {
    try {
      const publishPath = path.join(this.publishedPath, postId);
      const draftPath = path.join(this.draftsPath, postId);

      // Read published content
      const content = await fs.readFile(publishPath, 'utf-8');
      const { data, content: body } = matter(content);

      // Update metadata
      data.status = 'draft';
      delete data.publishedAt;

      // Write to drafts
      const updatedContent = matter.stringify(body, data);
      await fs.writeFile(draftPath, updatedContent);

      // Remove from published
      await fs.unlink(publishPath);

      // Commit changes
      await this.gitService.commit([publishPath, draftPath], `Move to drafts: ${data.title || postId}`);

    } catch (error) {
      console.error('Move to drafts error:', error);
      throw new Error('Failed to move to drafts');
    }
  }
}

// Factory function
export function createPublishingService(): PublishingService {
  return new PublishingServiceImpl();
}