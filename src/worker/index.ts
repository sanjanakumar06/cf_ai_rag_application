let documentText: string | null = null;

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Handle preflight OPTIONS for /upload and /ask
    if (
      (url.pathname === "/upload" || url.pathname === "/ask") &&
      request.method === "OPTIONS"
    ) {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Upload endpoint
    if (url.pathname === "/upload" && request.method === "POST") {
      documentText = await request.text();
      return new Response(JSON.stringify({ status: "uploaded", length: documentText.length }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Ask endpoint
    if (url.pathname === "/ask" && request.method === "POST") {
      if (!documentText) {
        return new Response(JSON.stringify({ error: "No document uploaded." }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
      const { question } = await request.json();
      const fakeAnswer = `Pretend answer for: "${question}" (context length: ${documentText.length})`;
      return new Response(JSON.stringify({ answer: fakeAnswer }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Root handler (welcome)
    if (url.pathname === "/" && request.method === "GET") {
      return new Response("Cloudflare RAG Worker is deployed!", {
        headers: { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Catch-all: not found
    return new Response("Not found", { status: 404, headers: { "Access-Control-Allow-Origin": "*" } });
  }
}
