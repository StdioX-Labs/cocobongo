import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    console.log("Upload image API called");

    // Check authentication
    const authHeader = request.headers.get("Authorization");
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log("Auth header present:", !!authHeader);
    console.log("Admin password configured:", !!adminPassword);

    if (!adminPassword) {
      console.log("ADMIN_PASSWORD not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      console.log("Authorization failed");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Authorization successful");
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.log("No file provided");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("File received:", file.name, file.type, file.size);
    const fileName = `${Date.now()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();

    // Detect if running on Netlify - check multiple environment variables
    const isNetlify = process.env.NETLIFY === 'true' ||
                      process.env.NETLIFY_DEV === 'true' ||
                      !!process.env.NETLIFY_BUILD_BASE ||
                      process.env.CONTEXT !== undefined;

    console.log("Environment check:", {
      NETLIFY: process.env.NETLIFY,
      NETLIFY_DEV: process.env.NETLIFY_DEV,
      CONTEXT: process.env.CONTEXT,
      isNetlify
    });

    // Try to use Netlify Blobs first if available
    if (isNetlify || process.env.NODE_ENV === 'production') {
      try {
        console.log("Attempting to use Netlify Blobs for image storage");
        const { getStore } = await import("@netlify/blobs");
        const store = getStore("program-images");

        await store.set(fileName, arrayBuffer, {
          metadata: {
            contentType: file.type,
            uploadedAt: new Date().toISOString(),
          },
        });

        const imageUrl = `/api/images/${fileName}`;
        console.log("Successfully saved to Netlify Blobs");
        return NextResponse.json({ success: true, imageUrl });
      } catch (blobError) {
        console.error("Netlify Blobs error:", blobError);
        // Fall through to file system if Blobs fails
      }
    }

    // Fallback: Use local file system
    console.log("Using file system fallback - saving to public/uploads");
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadsDir, fileName);

    console.log("Upload path:", filePath);

    // Create uploads directory if it doesn't exist
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      console.log("Uploads directory created/verified");
    } catch {
      // Directory might already exist
      console.log("Uploads directory already exists");
    }

    // Write the file
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
    console.log("File written successfully");

    const imageUrl = `/uploads/${fileName}`;
    return NextResponse.json({
      success: true,
      imageUrl,
      note: "Saved to file system - /public/uploads",
    });
  } catch (error) {
    console.error("Error in upload-image API:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to upload image", details: errorMessage },
      { status: 500 }
    );
  }
}

