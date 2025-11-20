let documentText: string | null = null; 

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/upload" && request.method === "POST") {
      documentText = await request.text();
      return new Response(JSON.stringify({ status: "uploaded", length: documentText.length }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/ask" && request.method === "POST") {
      if (!documentText) {
        return new Response(JSON.stringify({ error: "No document uploaded." }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { question } = await request.json();
      // For now simulated answer
      const fakeAnswer = `Pretend answer for: "${question}" (context length: ${documentText.length})`;
      return new Response(JSON.stringify({ answer: fakeAnswer }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Not found", { status: 404 });
  }
};
