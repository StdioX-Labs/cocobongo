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

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const store = getStore("program-images");
    const fileName = `${Date.now()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();

    // Store the image
    await store.set(fileName, arrayBuffer, {
      metadata: {
        contentType: file.type,
        uploadedAt: new Date().toISOString(),
      },
    });

    // Return the URL path
    const imageUrl = `/api/images/${fileName}`;

    return new Response(
      JSON.stringify({ success: true, imageUrl }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response(
      JSON.stringify({ error: "Failed to upload image" }),
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

