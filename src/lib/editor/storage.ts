import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type { CollectionEntry } from 'astro:content';

const DRAFTS_DIR = path.join(process.cwd(), 'src/content/drafts');
const THOUGHTS_DIR = path.join(process.cwd(), 'src/content/thoughts');

interface PostFile {
  filename: string;
  content: string;
  metadata: Partial<CollectionEntry<'thoughts'>['data']>;
  isDraft: boolean;
  lastModified: Date;
}

// Ensure directories exist
async function ensureDirectories() {
  await fs.mkdir(DRAFTS_DIR, { recursive: true });
  await fs.mkdir(THOUGHTS_DIR, { recursive: true });
}

// List all posts (drafts and published)
export async function listPosts(): Promise<PostFile[]> {
  await ensureDirectories();
  
  const posts: PostFile[] = [];
  
  // Get drafts
  try {
    const draftFiles = await fs.readdir(DRAFTS_DIR);
    for (const file of draftFiles) {
      if (file.endsWith('.md') && file !== 'README.md') {
        const filePath = path.join(DRAFTS_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const stats = await fs.stat(filePath);
        const { data, content: body } = matter(content);
        
        posts.push({
          filename: file,
          content: body,
          metadata: data as Partial<CollectionEntry<'thoughts'>['data']>,
          isDraft: true,
          lastModified: stats.mtime,
        });
      }
    }
  } catch (error) {
    console.error('Error reading drafts:', error);
  }
  
  // Get published posts
  try {
    const publishedFiles = await fs.readdir(THOUGHTS_DIR);
    for (const file of publishedFiles) {
      if (file.endsWith('.md')) {
        const filePath = path.join(THOUGHTS_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const stats = await fs.stat(filePath);
        const { data, content: body } = matter(content);
        
        posts.push({
          filename: file,
          content: body,
          metadata: data as Partial<CollectionEntry<'thoughts'>['data']>,
          isDraft: false,
          lastModified: stats.mtime,
        });
      }
    }
  } catch (error) {
    console.error('Error reading published posts:', error);
  }
  
  // Sort by last modified, newest first
  return posts.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
}

// Get a single post
export async function getPost(filename: string, isDraft: boolean = true): Promise<PostFile | null> {
  try {
    const dir = isDraft ? DRAFTS_DIR : THOUGHTS_DIR;
    const filePath = path.join(dir, filename);
    
    const content = await fs.readFile(filePath, 'utf-8');
    const stats = await fs.stat(filePath);
    const { data, content: body } = matter(content);
    
    return {
      filename,
      content: body,
      metadata: data as Partial<CollectionEntry<'thoughts'>['data']>,
      isDraft,
      lastModified: stats.mtime,
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

// Save a post (create or update)
export async function savePost(
  filename: string,
  content: string,
  isDraft: boolean = true
): Promise<{ success: boolean; filename: string; error?: string }> {
  try {
    await ensureDirectories();
    
    // Ensure filename ends with .md
    if (!filename.endsWith('.md')) {
      filename = `${filename}.md`;
    }
    
    // Sanitize filename
    filename = filename.replace(/[^a-z0-9-_.]/gi, '-');
    
    const dir = isDraft ? DRAFTS_DIR : THOUGHTS_DIR;
    const filePath = path.join(dir, filename);
    
    await fs.writeFile(filePath, content, 'utf-8');
    
    return { success: true, filename };
  } catch (error) {
    console.error('Error saving post:', error);
    return {
      success: false,
      filename,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Delete a post
export async function deletePost(
  filename: string,
  isDraft: boolean = true
): Promise<{ success: boolean; error?: string }> {
  try {
    const dir = isDraft ? DRAFTS_DIR : THOUGHTS_DIR;
    const filePath = path.join(dir, filename);
    
    await fs.unlink(filePath);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Move post between draft and published
export async function movePost(
  filename: string,
  fromDraft: boolean,
  toDraft: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const fromDir = fromDraft ? DRAFTS_DIR : THOUGHTS_DIR;
    const toDir = toDraft ? DRAFTS_DIR : THOUGHTS_DIR;
    
    const fromPath = path.join(fromDir, filename);
    const toPath = path.join(toDir, filename);
    
    // Read the file content
    const content = await fs.readFile(fromPath, 'utf-8');
    
    // Write to new location
    await fs.writeFile(toPath, content, 'utf-8');
    
    // Delete from old location
    await fs.unlink(fromPath);
    
    return { success: true };
  } catch (error) {
    console.error('Error moving post:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Publish a draft
export async function publishDraft(filename: string): Promise<{ success: boolean; error?: string }> {
  return movePost(filename, true, false);
}

// Unpublish to draft
export async function unpublishPost(filename: string): Promise<{ success: boolean; error?: string }> {
  return movePost(filename, false, true);
}