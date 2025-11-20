# rag-application

This is a full-stack demo document Q&A app (a “retrieval-augmented generation” or RAG app) built using React for the frontend and a Cloudflare Worker for the backend.
Users can upload or paste a document, then ask questions about its contents—the backend holds the document during the session and currently returns a mock answer.


## Features
- Paste text into a document box
- Type a question about the uploaded content and get a response.
- Live Feedback: Answers, errors, and status are always shown in the user interface.

## How It Works
- The React frontend sends the document and question to a Cloudflare Worker backend
- The backend temporarily retains the document and simulates an answer
- Upgrade Note (in progress): integrations with real AI models

## Setup
1. Clone the repo
    ' git clone https://github.com/sanjanakumar06/cf_ai_rag_application.git
2. Install dependencies
    'npm install'
3. Install Wrangler
    'npm install -g wrangler'
4. Start the React frontend: 'npm run dev'
- Visit the local server (https://localhost:5173) in your browser
5. Deploy the Worker Backend: 'npx wrangler deploy'
- Copy your Worker endpoint URL (shown after deployment)
6. Set React to use your worker: 
- In src/App.jsx, set the WORKER_URL to your deployed Worker's URL: const WORKER_URL = "https://your-worker-name.your-account.workers.dev";

## Usage
- Paste or type a document in the text area and click Upload
- When "Document uploaded!" appears, type a question and Ask
- The answer will show up (currently a mock/test message)

## Deployment
- Backend (Cloudflare Worker): redeploy 'npx wrangler deploy' any time you change Worker code
- Frontend (React): build and deploy the static site: 'npm run build'
- Upload the dist folder to Cloudflare Pages, Vercel, or Netlify, and set your frontend to call the live Worker backend.

## Prompts
See 'PROMPTS.md' for LLM prompt examples