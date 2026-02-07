import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("Authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "your-secure-password";

    if (!authHeader || authHeader.replace("Bearer ", "") !== adminPassword) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const filePath = path.join(process.cwd(), "data", "highlights.json");

    // Write the updated data
    await fs.writeFile(filePath, JSON.stringify(body, null, 2));

    return NextResponse.json({
      success: true,
      message: "Highlights updated successfully",
    });
  } catch (error) {
    console.error("Error updating highlights:", error);
    return NextResponse.json(
      { error: "Failed to update highlights" },
      { status: 500 }
    );
  }
}
