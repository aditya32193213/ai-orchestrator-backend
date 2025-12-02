Skip to content
Navigation Menu
aditya32193213
ai-orchestrator-backend

Type / to search
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
ai-orchestrator-backend
/
README.md
in
main

Edit

Preview
🚀 AI-Powered Document Orchestrator — Backend
An intelligent backend service that extracts data from documents using AI (Google Gemini) and automates contextual email workflows through n8n. Built using Node.js + Express, integrated with AI and automation tools for real-world business workflows.

🌟 Project Overview
This backend powers the AI-Powered Document Orchestrator, a system that:

Accepts PDF/Text document uploads

Extracts raw text using pdf-parse

Sends text + question to Gemini AI for:

Summary

Analytical Answer

Key-value Structured Data Extraction

Sends processed data to an n8n automation workflow that generates:

AI-drafted email

Conditional automation status

Final formatted result

This API is fully production-ready and deployed on Render.

✨ Features 🧠 AI Processing

Uses Google Gemini to generate:

Smart summaries

Analytical answers

Structured JSON extraction

📄 File Parsing

Extract text from PDFs using pdf-parse

Supports .pdf and .txt files

🔗 n8n Automation

Backend sends structured data to n8n Webhook

n8n generates email drafts and automation responses

Returns clean JSON back to frontend

🔐 Secure Environment

API keys stored in .env

No hardcoded credentials

🚀 Deployment Ready

Built for Render hosting

Fast, scalable Node backend

🏗️ System Architecture (Simplified Diagram) ┌──────────────┐ ┌────────────────────┐ │ Frontend │ ---> │ Node.js Backend │ └──────────────┘ │ - File Upload │ │ - AI Processing │ │ - n8n Webhook │ └────────────┬───────┘ │ ▼ ┌──────────────────┐ │ Gemini AI │ └──────────────────┘ │ ▼ ┌──────────────────┐ │ n8n Workflow │ │ - Email Drafting │ │ - Conditional IF │ └──────────────────┘

🛠️ Tech Stack Layer Technology Backend Node.js, Express AI Model Google Gemini API File Processing pdf-parse Automation n8n Workflow Hosting Render Version Control Git + GitHub Environment dotenv 📂 Project Folder Structure ai-orchestrator-backend/ │── routes/ │ ├── extract.js # Handles file parsing + AI extraction │ └── notify.js # Sends results to n8n webhook │ │── services/ │ ├── geminiservice.js # Handles Gemini AI logic │ └── n8nservice.js # Handles n8n webhook POST request │ │── server.js # Main entry server file │── package.json │── .gitignore │── .env (not included)

🔑 Environment Variables (Required)

Create a .env file:

PORT=5000

Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

n8n webhook URL
N8N_WEBHOOK_URL=https://your-n8n-url/webhook/doc-orchestrator

📤 API Endpoints

📌 POST /api/extract
Uploads a document, extracts text, calls Gemini for summary, answer, structured data.

Payload: multipart/form-data containing:

file

question

Response:

{ "summary": "...", "answer": "...", "structured": {...}, "question": "..." }

📌 POST /api/notify

Sends extracted data + user's email to n8n workflow.

Payload:

{ "email": "recipient@example.com", "subject": "", "summary": "...", "answer": "...", "structured": {}, "question": "", "metadata": {} }

Response (from n8n):

{ "status": "ok", "message": "Email successfully sent", "subject": "AI Summary Result", "emailSentTo": "recipient@example.com", "body": "Generated email content..." }

🚀 How to Run Locally 1️⃣ Install dependencies: npm install

2️⃣ Start development server: npm run dev

3️⃣ Start normally: node server.js

🌍 Deployment (Render) Steps:

Create a new Web Service on Render

Connect GitHub repository

Set build command:

npm install

Set start command:

node server.js

Add Environment Variables

Deploy 🎉

📸 Screenshots (Add Later)

Add screenshots here from n8n, Postman, logs, etc.

🧑‍💻 Author

Aditya Panda Full Stack Developer GitHub: https://github.com/aditya32193213

⭐ Support

If you like this project, please ⭐ star the repository. Your support helps me grow as a developer ✨

