import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (password === adminPassword) {
      return NextResponse.json({ valid: true }, { status: 200 });
    } else {
      return NextResponse.json({ valid: false }, { status: 401 });
    }
  } catch (error) {
    console.error("Verify password error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

