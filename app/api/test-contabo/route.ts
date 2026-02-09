/**
 * Contabo S3 Test API
 *
 * This endpoint tests the Contabo S3 connection and permissions.
 * Use this to diagnose upload issues.
 */

import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

// Contabo S3 Configuration
const S3_ACCESS_KEY = '62f302ee2a6bdec56870da3b3a3e7127';
const S3_SECRET_KEY = '03d389951f566e189c3ce0e7c54d122c';
const S3_ENDPOINT = 'https://eu2.contabostorage.com';
const S3_BUCKET_NAME = 'bv-kenya';
const S3_BUCKET_FULL = 'b418dbb4d7c942e5b311c172a41d1db8:bv-kenya';
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

export async function GET(request: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    tests: [],
  };

  // Test 1: List objects in bucket
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: S3_BUCKET_NAME,
      MaxKeys: 5,
    });

    const listResponse = await s3Client.send(listCommand);

    results.tests.push({
      test: 'List Objects',
      status: 'success',
      message: `Found ${listResponse.KeyCount} objects`,
      objects: listResponse.Contents?.map(obj => ({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
      })),
    });

    // Test 2: Try to get one object's metadata
    if (listResponse.Contents && listResponse.Contents.length > 0) {
      const firstObject = listResponse.Contents[0];

      try {
        const publicUrl = `${S3_ENDPOINT}/${S3_BUCKET_FULL}/${firstObject.Key}`;

        results.tests.push({
          test: 'Public URL Test',
          status: 'info',
          message: 'Check if this URL is accessible',
          url: publicUrl,
          instructions: 'Try opening this URL in a browser to see if you get 401 error',
        });
      } catch (error) {
        results.tests.push({
          test: 'Get Object Metadata',
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  } catch (error) {
    results.tests.push({
      test: 'List Objects',
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error,
    });
  }

  // Test 3: Check credentials
  results.tests.push({
    test: 'Configuration',
    status: 'info',
    config: {
      endpoint: S3_ENDPOINT,
      bucket: S3_BUCKET_NAME,
      bucketFull: S3_BUCKET_FULL,
      region: S3_REGION,
      accessKeyPresent: !!S3_ACCESS_KEY,
      secretKeyPresent: !!S3_SECRET_KEY,
    },
  });

  return NextResponse.json(results, { status: 200 });
}
