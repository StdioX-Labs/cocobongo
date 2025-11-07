import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    // In production on Netlify, use Netlify Blobs via function
    if (process.env.NETLIFY) {
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
    }

    // For local development, use file system
    const dataPath = path.join(process.cwd(), "data", "program.json");

    try {
      const fileContent = await fs.readFile(dataPath, "utf-8");
      const programData = JSON.parse(fileContent);
      return NextResponse.json(programData);
    } catch (err) {
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

