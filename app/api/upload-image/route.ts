import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    console.log("Upload image API called");

    // Check authentication
    const authHeader = request.headers.get("Authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "cocobongo2024";

    console.log("Auth header present:", !!authHeader);

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

    // In production on Netlify, use Netlify Blobs
    if (process.env.NETLIFY) {
      console.log("Running on Netlify - using Blobs");
      const { getStore } = await import("@netlify/blobs");
      const store = getStore("program-images");

      await store.set(fileName, arrayBuffer, {
        metadata: {
          contentType: file.type,
          uploadedAt: new Date().toISOString(),
        },
      });

      const imageUrl = `/api/images/${fileName}`;
      return NextResponse.json({ success: true, imageUrl });
    }

    // For local development, save to public folder
    console.log("Running locally - saving to public/uploads");
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
      note: "Local dev mode - saved to /public/uploads",
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

