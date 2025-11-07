import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    // Detect if running on Netlify - check multiple environment variables
    const isNetlify = process.env.NETLIFY === 'true' ||
                      process.env.NETLIFY_DEV === 'true' ||
                      !!process.env.NETLIFY_BUILD_BASE ||
                      process.env.CONTEXT !== undefined;

    // Try to use Netlify Blobs first if in production or on Netlify
    if (isNetlify || process.env.NODE_ENV === 'production') {
      try {
        const { getStore } = await import("@netlify/blobs");
        const store = getStore("programs");
        const programData = await store.get("current-program", { type: "json" });

        if (!programData) {
          return NextResponse.json({
            currentWeek: null,
            previousWeeks: [],
          });
        }

        return NextResponse.json(programData);
      } catch (blobError) {
        console.error("Netlify Blobs read error:", blobError);
        // Fall through to file system
      }
    }

    // Fallback: Use file system (for local development or if Blobs fails)
    const dataPath = path.join(process.cwd(), "data", "program.json");

    try {
      const fileContent = await fs.readFile(dataPath, "utf-8");
      const programData = JSON.parse(fileContent);
      return NextResponse.json(programData);
    } catch (_err) {
      // File doesn't exist yet, return default
      return NextResponse.json({
        currentWeek: null,
        previousWeeks: [],
      });
    }
  } catch (error) {
    console.error("Error in get-program API:", error);
    return NextResponse.json(
      { error: "Failed to fetch program data" },
      { status: 500 }
    );
  }
}

