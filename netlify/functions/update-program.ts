import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

const handler = async (req: Request, _context: Context) => {
  // Enable CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    // Simple authentication check
    const authHeader = req.headers.get("Authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "cocobongo2024";

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const programData = await req.json();
    const store = getStore("programs");

    // Save the program data
    await store.set("current-program", JSON.stringify(programData), {
      metadata: {
        updatedAt: new Date().toISOString(),
      },
    });

    return new Response(
      JSON.stringify({ success: true, message: "Program updated successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error updating program:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update program data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};

export default handler;

