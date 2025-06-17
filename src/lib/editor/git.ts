import simpleGit, { SimpleGit } from 'simple-git';
import path from 'path';

export interface Commit {
  hash: string;
  date: string;
  message: string;
  author: string;
}

export interface GitService {
  commit(files: string[], message: string): Promise<void>;
  getHistory(file: string): Promise<Commit[]>;
  diff(file: string, commit?: string): Promise<string>;
  rollback(file: string, commit: string): Promise<void>;
  getStatus(): Promise<{ modified: string[]; untracked: string[]; staged: string[] }>;
}

class GitServiceImpl implements GitService {
  private git: SimpleGit;

  constructor(repoPath: string) {
    this.git = simpleGit(repoPath);
  }

  async commit(files: string[], message: string): Promise<void> {
    try {
      // Add files to staging
      await this.git.add(files);
      
      // Commit with message
      await this.git.commit(message);
    } catch (error) {
      console.error('Git commit error:', error);
      throw new Error('Failed to commit files');
    }
  }

  async getHistory(file: string): Promise<Commit[]> {
    try {
      const log = await this.git.log({
        file,
        maxCount: 50,
      });

      return log.all.map(commit => ({
        hash: commit.hash,
        date: commit.date,
        message: commit.message,
        author: commit.author_name,
      }));
    } catch (error) {
      console.error('Git history error:', error);
      throw new Error('Failed to get file history');
    }
  }

  async diff(file: string, commit?: string): Promise<string> {
    try {
      if (commit) {
        // Diff between commit and current
        return await this.git.diff([`${commit}..HEAD`, '--', file]);
      } else {
        // Diff of uncommitted changes
        return await this.git.diff(['--', file]);
      }
    } catch (error) {
      console.error('Git diff error:', error);
      throw new Error('Failed to get diff');
    }
  }

  async rollback(file: string, commit: string): Promise<void> {
    try {
      // Checkout specific file from commit
      await this.git.checkout([commit, '--', file]);
    } catch (error) {
      console.error('Git rollback error:', error);
      throw new Error('Failed to rollback file');
    }
  }

  async getStatus(): Promise<{ modified: string[]; untracked: string[]; staged: string[] }> {
    try {
      const status = await this.git.status();
      
      return {
        modified: status.modified,
        untracked: status.not_added,
        staged: status.staged,
      };
    } catch (error) {
      console.error('Git status error:', error);
      throw new Error('Failed to get status');
    }
  }
}

// Factory function
export function createGitService(repoPath?: string): GitService {
  const projectRoot = repoPath || process.cwd();
  return new GitServiceImpl(projectRoot);
}