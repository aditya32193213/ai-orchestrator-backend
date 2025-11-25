AI-Powered Document Orchestrator – Backend (Node.js + Express)
This is the Express.js backend for the AI document orchestrator.

🌐 Live Demo
Render Deployment: https://ai-orchestrator-backend-f0k6.onrender.com

It handles:
File parsing
AI API requests (OpenAI/Gemini)
JSON extraction logic
POST requests to n8n
Returning results to frontend

🚀 Features
✔ Document Parsing

Supports:
PDF extraction using pdf-parse
TXT file extraction

✔ AI-Powered Structured Extraction
Sends extracted text + user question to AI API using a strict JSON schema.

✔ Integration With n8n
POSTs data to a production webhook for conditional email automation.

✔ Secure Credentials
All API keys and URLs are stored in .env.

🏗️ Tech Stack

Node.js + Express

pdf-parse

Multer

Axios

OpenAI / Gemini API

dotenv
