import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..', '..');

const DRAFTS_DIR = path.join(PROJECT_ROOT, 'src', 'content', 'drafts');
const POSTS_DIR = path.join(PROJECT_ROOT, 'src', 'content', 'thoughts');

export interface PostData {
  id: string;
  content: string;
  metadata: {
    title: string;
    description?: string;
    date: string;
    excerpt?: string;
    categories: string[];
    tags: string[];
    author: string;
    image?: string;
  };
  isDraft: boolean;
  slug: string;
  filePath?: string;
}

export class PostStorage {
  static async ensureDirectories() {
    await fs.mkdir(DRAFTS_DIR, { recursive: true });
    await fs.mkdir(POSTS_DIR, { recursive: true });
  }

  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  static async getAllPosts(): Promise<PostData[]> {
    await this.ensureDirectories();
    
    const posts: PostData[] = [];
    
    // Get published posts
    const publishedFiles = await fs.readdir(POSTS_DIR);
    for (const file of publishedFiles) {
      if (file.endsWith('.md')) {
        const post = await this.getPost(file.replace('.md', ''), false);
        if (post) posts.push(post);
      }
    }
    
    // Get drafts
    const draftFiles = await fs.readdir(DRAFTS_DIR);
    for (const file of draftFiles) {
      if (file.endsWith('.md')) {
        const post = await this.getPost(file.replace('.md', ''), true);
        if (post) posts.push(post);
      }
    }
    
    return posts.sort((a, b) => 
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  }

  static async getPost(slug: string, isDraft: boolean): Promise<PostData | null> {
    try {
      const dir = isDraft ? DRAFTS_DIR : POSTS_DIR;
      const filePath = path.join(dir, `${slug}.md`);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      
      const { data, content } = matter(fileContent);
      
      return {
        id: slug,
        content,
        metadata: {
          title: data.title || '',
          description: data.description,
          date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
          excerpt: data.excerpt,
          categories: data.categories || [],
          tags: data.tags || [],
          author: data.author || 'Anonymous',
          image: data.image
        },
        isDraft,
        slug,
        filePath
      };
    } catch (error) {
      return null;
    }
  }

  static async savePost(post: PostData): Promise<PostData> {
    await this.ensureDirectories();
    
    const slug = post.slug || this.generateSlug(post.metadata.title);
    const dir = post.isDraft ? DRAFTS_DIR : POSTS_DIR;
    const filePath = path.join(dir, `${slug}.md`);
    
    // Create frontmatter
    const frontmatter = {
      title: post.metadata.title,
      description: post.metadata.description,
      date: new Date(post.metadata.date).toISOString(),
      excerpt: post.metadata.excerpt,
      categories: post.metadata.categories,
      tags: post.metadata.tags,
      author: post.metadata.author,
      image: post.metadata.image
    };
    
    // Remove undefined values
    Object.keys(frontmatter).forEach(key => {
      if (frontmatter[key as keyof typeof frontmatter] === undefined) {
        delete frontmatter[key as keyof typeof frontmatter];
      }
    });
    
    // Create markdown content with frontmatter
    const fileContent = matter.stringify(post.content, frontmatter);
    
    // Save file
    await fs.writeFile(filePath, fileContent, 'utf-8');
    
    return {
      ...post,
      id: slug,
      slug,
      filePath
    };
  }

  static async deletePost(slug: string, isDraft: boolean): Promise<boolean> {
    try {
      const dir = isDraft ? DRAFTS_DIR : POSTS_DIR;
      const filePath = path.join(dir, `${slug}.md`);
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async publishDraft(slug: string): Promise<PostData | null> {
    const draft = await this.getPost(slug, true);
    if (!draft) return null;
    
    // Save as published post
    draft.isDraft = false;
    const published = await this.savePost(draft);
    
    // Delete draft
    await this.deletePost(slug, true);
    
    return published;
  }
}