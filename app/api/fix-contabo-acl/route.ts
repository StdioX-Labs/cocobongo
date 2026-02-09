/**
 * Fix ACL for Existing Files in Contabo S3
 *
 * This endpoint updates the ACL for all existing files in the bucket
 * to make them publicly readable.
 *
 * POST /api/fix-contabo-acl
 * Requires admin password in Authorization header
 */

import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, PutObjectAclCommand, ObjectCannedACL } from '@aws-sdk/client-s3';

// Contabo S3 Configuration
const S3_ACCESS_KEY = '62f302ee2a6bdec56870da3b3a3e7127';
const S3_SECRET_KEY = '03d389951f566e189c3ce0e7c54d122c';
const S3_ENDPOINT = 'https://eu2.contabostorage.com';
const S3_BUCKET_NAME = 'bv-kenya';
const S3_REGION = 'eu-central-1';

// Initialize S3 Client
const s3Client = new S3Client({
  region: S3_REGION,
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
  forcePathStyle: true,
});

export async function POST(request: NextRequest) {
  try {
    // Check for admin password
    const authHeader = request.headers.get('Authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'your-secure-password';

    if (!authHeader || authHeader.replace('Bearer ', '') !== adminPassword) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const results = {
      totalFiles: 0,
      successfulUpdates: 0,
      failedUpdates: 0,
      errors: [] as string[],
      files: [] as any[],
    };

    // Get query parameter for specific folder
    const url = new URL(request.url);
    const folder = url.searchParams.get('folder') || '';

    // List all objects in the bucket (or specific folder)
    let continuationToken: string | undefined;
    const allObjects: any[] = [];

    do {
      const listCommand = new ListObjectsV2Command({
        Bucket: S3_BUCKET_NAME,
        Prefix: folder,
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      });

      const listResponse = await s3Client.send(listCommand);

      if (listResponse.Contents) {
        allObjects.push(...listResponse.Contents);
      }

      continuationToken = listResponse.NextContinuationToken;
    } while (continuationToken);

    results.totalFiles = allObjects.length;

    // Update ACL for each object
    for (const obj of allObjects) {
      if (!obj.Key) continue;

      try {
        const aclCommand = new PutObjectAclCommand({
          Bucket: S3_BUCKET_NAME,
          Key: obj.Key,
          ACL: 'public-read' as ObjectCannedACL,
        });

        await s3Client.send(aclCommand);

        results.successfulUpdates++;
        results.files.push({
          key: obj.Key,
          status: 'success',
          size: obj.Size,
        });
      } catch (error) {
        results.failedUpdates++;
        const errorMsg = `Failed to update ${obj.Key}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        results.errors.push(errorMsg);
        results.files.push({
          key: obj.Key,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: results.successfulUpdates > 0,
      message: `Updated ACL for ${results.successfulUpdates}/${results.totalFiles} files`,
      results,
    });
  } catch (error) {
    console.error('Fix ACL error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fix ACL',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
