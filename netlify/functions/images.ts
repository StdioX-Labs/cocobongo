import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

const handler = async (req: Request, _context: Context) => {
  // Enable CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const url = new URL(req.url);
    const fileName = url.pathname.split("/").pop();

    if (!fileName) {
      return new Response("File not found", { status: 404 });
    }

    const store = getStore("program-images");
    const imageData = await store.get(fileName, { type: "arrayBuffer" });

    if (!imageData) {
      return new Response("Image not found", { status: 404 });
    }

    // Try to get metadata, default to image/jpeg if not available
    let contentType = "image/jpeg";
    try {
      const metadataObj = await store.getMetadata(fileName);
      if (metadataObj?.metadata?.contentType) {
        contentType = metadataObj.metadata.contentType as string;
      }
    } catch {
      // Use default content type
    }

    return new Response(imageData, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return new Response("Error fetching image", { status: 500 });
  }
};

export default handler;

