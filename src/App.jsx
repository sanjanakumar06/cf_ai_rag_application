import React, { useState } from "react";

function App() {
  const [doc, setDoc] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Use your real Worker URL here:
  const WORKER_URL = "https://rag-application.sanj-kiku06.workers.dev";

  const uploadText = async () => {
    setLoading(true);
    setUploaded(false);
    setAnswer("");
    const res = await fetch(`${WORKER_URL}/upload`, { method: "POST", body: doc });
    setLoading(false);

    if (res.ok) {
      const data = await res.json();
      setUploaded(true);
      setAnswer("✅ Uploaded! Document length: " + data.length);
    } else {
      setAnswer("❌ Upload failed: " + (await res.text()));
    }
  };

  const askQuestion = async () => {
    setLoading(true);
    setAnswer("");
    const res = await fetch(`${WORKER_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    setLoading(false);

    if (res.ok) {
      const data = await res.json();
      setAnswer(data.answer || data.error || "No answer.");
    } else {
      setAnswer("❌ Error: " + (await res.text()));
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2em auto", fontFamily: "sans-serif" }}>
      <h2>Upload Document</h2>
      <textarea
        value={doc}
        onChange={e => setDoc(e.target.value)}
        rows={8}
        cols={60}
        style={{ width: "100%" }}
        placeholder="Paste your document..."
      />
      <br />
      <button onClick={uploadText} disabled={loading || !doc}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {uploaded && <div style={{ color: "green", marginTop: 10 }}>Document uploaded!</div>}

      <h2 style={{ marginTop: "2em" }}>Ask a Question</h2>
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        size={50}
        style={{ width: "75%" }}
        placeholder="What do you want to know?"
      />
      <button onClick={askQuestion} disabled={loading || !question}>
        {loading ? "Asking..." : "Ask"}
      </button>

      {answer && (
        <div style={{ marginTop: 20, color: answer.startsWith("❌") ? "red" : "black" }}>
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default App;
