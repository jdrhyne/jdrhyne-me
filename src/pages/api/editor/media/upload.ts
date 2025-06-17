import type { APIContext } from 'astro';
import sharp from 'sharp';
import { verifyToken } from '../../../../lib/editor/auth';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const IMAGE_SIZES = [
  { name: 'thumbnail', width: 400 },
  { name: 'medium', width: 800 },
  { name: 'large', width: 1200 },
];

export async function POST({ request }: APIContext) {
  try {
    // Verify authentication
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !await verifyToken(token)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'Invalid file type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create upload directory structure
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads', String(year), month);
    
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const fileExt = path.extname(file.name);
    const fileHash = crypto.randomBytes(8).toString('hex');
    const baseFilename = `${Date.now()}-${fileHash}`;
    
    // Process and save image at different sizes
    const buffer = Buffer.from(await file.arrayBuffer());
    const metadata = await sharp(buffer).metadata();
    
    const processedImages = [];
    
    // Save original
    const originalPath = path.join(uploadDir, `${baseFilename}${fileExt}`);
    await sharp(buffer).toFile(originalPath);
    
    processedImages.push({
      name: 'original',
      path: `/images/uploads/${year}/${month}/${baseFilename}${fileExt}`,
      width: metadata.width,
      height: metadata.height,
    });

    // Generate responsive images
    for (const size of IMAGE_SIZES) {
      if (metadata.width && metadata.width > size.width) {
        const outputFilename = `${baseFilename}-${size.width}w.webp`;
        const outputPath = path.join(uploadDir, outputFilename);
        
        await sharp(buffer)
          .resize(size.width, null, { withoutEnlargement: true })
          .webp({ quality: 90 })
          .toFile(outputPath);
        
        processedImages.push({
          name: size.name,
          path: `/images/uploads/${year}/${month}/${outputFilename}`,
          width: size.width,
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      images: processedImages,
      primaryUrl: processedImages[0].path,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}