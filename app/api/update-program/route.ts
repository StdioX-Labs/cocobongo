import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    console.log("Update program API called");

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
    const programData = await request.json();
    console.log("Program data received:", Object.keys(programData));

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
        console.log("Attempting to use Netlify Blobs");
        const { getStore } = await import("@netlify/blobs");
        const store = getStore("programs");

        await store.set("current-program", JSON.stringify(programData), {
          metadata: {
            updatedAt: new Date().toISOString(),
          },
        });

        console.log("Successfully saved to Netlify Blobs");
        return NextResponse.json({
          success: true,
          message: "Program updated successfully",
        });
      } catch (blobError) {
        console.error("Netlify Blobs error:", blobError);
        // Fall through to file system if Blobs fails
      }
    }

    // Fallback: Use file system (for local development or if Blobs fails)
    console.log("Using file system fallback");
    const dataDir = path.join(process.cwd(), "data");
    const dataPath = path.join(dataDir, "program.json");

    console.log("Data path:", dataPath);

    // Create data directory if it doesn't exist
    try {
      await fs.mkdir(dataDir, { recursive: true });
      console.log("Data directory created/verified");
    } catch (dirError) {
      console.log("Directory creation error (might already exist):", dirError);
    }

    // Write the data to file
    await fs.writeFile(dataPath, JSON.stringify(programData, null, 2));
    console.log("Data written successfully to file system");

    return NextResponse.json({
      success: true,
      message: "Program updated successfully (file system)",
    });
  } catch (error) {
    console.error("Error in update-program API:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to update program data", details: errorMessage },
      { status: 500 }
    );
  }
}

