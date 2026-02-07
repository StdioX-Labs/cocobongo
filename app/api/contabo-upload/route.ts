/**
 * Contabo S3 Storage Upload API
 *
 * This endpoint handles image uploads to Contabo S3 storage.
 * It validates file types and sizes, generates unique filenames,
 * and returns public URLs for uploaded files.
 *
 * Configuration based on Python script: contabo_uploader.py
 * Endpoint: POST /api/contabo-upload
 *
 * @requires @aws-sdk/client-s3
 */

import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Contabo S3 Configuration
const S3_ACCESS_KEY = '62f302ee2a6bdec56870da3b3a3e7127';
const S3_SECRET_KEY = '03d389951f566e189c3ce0e7c54d122c';
const S3_ENDPOINT = 'https://eu2.contabostorage.com';
const S3_BUCKET_NAME = 'bv-kenya';
const S3_BUCKET_FULL = 'FQy4HArVdBbZ87AHrbfdhSXRgyE5NUbrh6GaL8enMUeh:bv-kenya';
const S3_REGION = 'eu-central-1';

// Initialize S3 Client
const s3Client = new S3Client({
  region: S3_REGION,
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
  forcePathStyle: true, // Required for Contabo
});

export async function POST(request: NextRequest) {
  try {
    // Check for admin password
    const authHeader = request.headers.get('Authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'your-secure-password';

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (token !== adminPassword) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'event-posters'; // 'event-posters' or 'highlights'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type - support both images and videos
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    const validTypes = [...validImageTypes, ...validVideoTypes];

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images (JPG, PNG, GIF, WEBP) and videos (MP4, WEBM, MOV) are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB for videos, 10MB for images)
    const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size too large. Maximum size is ${file.type.startsWith('video/') ? '50MB' : '10MB'}.` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Contabo S3
    const uploadCommand = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read',
    });

    await s3Client.send(uploadCommand);

    // Construct public URL
    const publicUrl = `${S3_ENDPOINT}/${S3_BUCKET_FULL}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      imageUrl: publicUrl, // For compatibility with existing code
      message: 'File uploaded successfully',
      type: file.type.startsWith('video/') ? 'video' : 'image',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
