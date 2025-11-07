import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    console.log("Update program API called");

    // Check authentication
    const authHeader = request.headers.get("Authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "cocobongo2024";

    console.log("Auth header present:", !!authHeader);
    console.log("Expected password length:", adminPassword.length);

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      console.log("Authorization failed");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Authorization successful");
    const programData = await request.json();
    console.log("Program data received:", Object.keys(programData));

    // In production on Netlify, use Netlify Blobs
    if (process.env.NETLIFY) {
      console.log("Running on Netlify - using Blobs");
      const { getStore } = await import("@netlify/blobs");
      const store = getStore("programs");

      await store.set("current-program", JSON.stringify(programData), {
        metadata: {
          updatedAt: new Date().toISOString(),
        },
      });

      return NextResponse.json({
        success: true,
        message: "Program updated successfully",
      });
    }

    // For local development, use file system
    console.log("Running locally - using file system");
    const dataDir = path.join(process.cwd(), "data");
    const dataPath = path.join(dataDir, "program.json");

    console.log("Data path:", dataPath);

    // Create data directory if it doesn't exist
    try {
      await fs.mkdir(dataDir, { recursive: true });
      console.log("Data directory created/verified");
    } catch {
      // Directory might already exist
      console.log("Data directory already exists");
    }

    // Write the data to file
    await fs.writeFile(dataPath, JSON.stringify(programData, null, 2));
    console.log("Data written successfully");

    return NextResponse.json({
      success: true,
      message: "Program updated successfully (local dev mode)",
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

