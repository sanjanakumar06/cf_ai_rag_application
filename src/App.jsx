import React, { useState } from "react";

function App() {
  const [doc, setDoc] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Replace '<WORKER_URL>' with your deployed Worker URL!
  const WORKER_URL = 'https://your-app.<account>.workers.dev';

  const uploadText = async () => {
    await fetch(`${WORKER_URL}/upload`, { method: "POST", body: doc });
    setUploaded(true);
  };

  const askQuestion = async () => {
    const res = await fetch(`${WORKER_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setAnswer(data.answer || data.error);
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <textarea value={doc} onChange={e => setDoc(e.target.value)} rows={8} cols={50} />
      <br />
      <button onClick={uploadText}>Upload</button>
      {uploaded && <div>Document uploaded!</div>}

      <h2>Ask a Question</h2>
      <input value={question} onChange={e => setQuestion(e.target.value)} size={50} />
      <button onClick={askQuestion}>Ask</button>

      {answer && (
        <div>
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default App;

