# rag-application

A Retrieval Augmented Generation (RAG) AI application for answering questions based on user-uploaded text using Cloudflare Workers AI.

## Features
- Upload a document or paste text
- Ask questions and get context-aware answers using workers AI (LLM)
- Simple React frontend + Cloudflare Worker backend

## Setup
1. Clone the repo
    ' git clone https://github.com/sanjanakumar06/cf_ai_rag_application.git
2. Install dependencies
    'npm install'
3. Install Wrangler
    'npm install -g wrangler'
4. Start local dev servers (in separate terminals):
    React: 'npm run dev'
    Worker: 'wrangler dev'

## Usage
- Open the React frontend and use the form to upload text and ask questions.

## Deployment
- Deploy frontend (i.e. Cloudflare Pages or Vercel)
- Deploy Worker: 'wrangler public'

## Prompts
See 'PROMPTS.md' for LLM prompt examples