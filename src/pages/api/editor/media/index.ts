import type { APIContext } from 'astro';
import { verifyToken } from '../../../../lib/editor/auth';
import fs from 'fs/promises';
import path from 'path';

interface MediaFile {
  url: string;
  filename: string;
  size: number;
  modifiedAt: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export async function GET({ request }: APIContext) {
  try {
    // Verify authentication
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !await verifyToken(token)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    const mediaFiles: MediaFile[] = [];

    // Check if uploads directory exists
    try {
      await fs.access(uploadsDir);
    } catch {
      // Directory doesn't exist yet
      return new Response(JSON.stringify({ files: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Recursively read all files
    async function readDirectory(dir: string, baseDir: string) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await readDirectory(fullPath, baseDir);
        } else if (entry.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
          // Skip generated sizes, only show originals
          if (!/-\d+w\./i.test(entry.name)) {
            const stats = await fs.stat(fullPath);
            const relativePath = path.relative(path.join(process.cwd(), 'public'), fullPath);
            
            mediaFiles.push({
              url: '/' + relativePath.replace(/\\/g, '/'),
              filename: entry.name,
              size: stats.size,
              modifiedAt: stats.mtime.toISOString(),
            });
          }
        }
      }
    }

    await readDirectory(uploadsDir, uploadsDir);

    // Sort by modified date, newest first
    mediaFiles.sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime());

    return new Response(JSON.stringify({ files: mediaFiles }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Media list error:', error);
    return new Response(JSON.stringify({ error: 'Failed to list media' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}