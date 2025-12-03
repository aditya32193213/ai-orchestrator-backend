# ⚙️ AI Orchestrator Backend  
_The backend engine powering document extraction, AI summaries, structured data parsing, and automated email drafting._

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Backend-black?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini%20AI-Powered-orange?logo=google" />
  <img src="https://img.shields.io/badge/pdf--parse-Extractor-blue" />
  <img src="https://img.shields.io/badge/Multer-File%20Upload-yellow" />
  <img src="https://img.shields.io/badge/Status-Production-success" />
</p>

A robust Node.js & Express backend responsible for:
- Extracting text from **PDF/TXT** files  
- Sending content to **Gemini AI** for summarization  
- Auto-extracting **structured fields** using AI  
- Integrating with **n8n workflow** for automated email drafting  
- Securely handling file uploads and returning JSON responses  

---

# 🌐 Live Backend API  
🔗 **https://ai-orchestrator-backend-f0k6.onrender.com**

---

# ✨ Features

### 📄 1. PDF/Text Extraction  
- Parses documents using `pdf-parse`  
- Supports `.pdf` and `.txt`  
- Cleans, normalizes, and prepares text for AI processing  

---

### 🤖 2. Gemini AI Integration  
Used for:
- Summaries  
- Answers  
- Structured information extraction  
- Email drafting fallback  

Powered via:
Gemini 2.5 Flash

---

### 📬 3. n8n Workflow Automation  
The backend sends:
- Summary  
- Answer  
- Structured data  
- Email editor input  

To **n8n Webhook**, which handles:
- Smart email drafting  
- JS parsing  
- SMTP sending  
- Webhook response back to frontend  

---

### 🛡️ 4. Secure File Handling  
- Uses `multer` for uploads  
- Temporary storage inside `/uploads`  
- Auto-deleted after processing  

---

### 🔌 5. RESTful API Design  
Designed with clarity and predictability so any frontend or external system can use it.

---

# 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **AI Engine** | Google Gemini API |
| **File Parsing** | pdf-parse, fs |
| **Uploads** | Multer |
| **Automation** | n8n Webhook |
| **Deployment** | Render Backend |

---

# 🗂️ Folder Structure
```plaintext
backend/
│── routes/
│ ├── extract.js # Handles PDF/TXT upload + parsing
│ ├── notify.js # Sends data to n8n webhook
│
│── services/
│ ├── geminiservice.js # Gemini AI calls
│ ├── n8nservice.js # n8n Webhook integration
│
│── uploads/ # Temporary upload storage
│── server.js # Express app entry point
│── package.json
│── .gitignore
│── .env.example # Example environment variables
```


---

# 📡 API Endpoints

## 📥 **1. Upload & Summarize Document**
`POST /api/extract`

### **Request**
Form-data:
- `file` → PDF/TXT  
- `prompt` → User question  

### **Response**
```json
{
  "summary": "...",
  "answer": "...",
  "structured": { ... },
  "rawText": "..."
}
```
## 📥 **2. Upload & Summarize Document**
`POST /api/notify`

### **Request**
```json
{
  "email": "recipient@example.com",
  "subject": "optional",
  "body": "optional",
  "summary": "...",
  "answer": "...",
  "structured": { ... }
}
```
### **Response**
```json
{
  "status": "ok",
  "message": "Email successfully sent",
  "emailResponse": { ... }
}
```

# 🏗️ System Architecture Diagram
```plaintext
                ┌──────────────────────────────┐
                │      Frontend (React.js)     │
                │ Uploads document + Email data│
                └───────────────┬──────────────┘
                                │
                                ▼
                  ┌───────────────────────────┐
                  │  Backend (Node + Express) │
                  │ pdf-parse | Gemini | n8n  │
                  └───────────────┬───────────┘
                                │
                                ▼
                     ┌─────────────────────────┐
                     │      n8n Workflow       │
                     │ Draft → Parse → SMTP    │
                     └─────────────┬───────────┘
                                   │
                                   ▼
                         ┌─────────────────────┐
                         │ Email Recipient     │
                         └─────────────────────┘
```


# 🧑‍💻 Author

Aditya Full Stack Developer GitHub: https://github.com/aditya32193213

---

# ⭐ Support

---

If you like this project, please ⭐ star the repository. Your support helps me grow as a developer ✨
# ⚙️ Installation

## 🔽 Clone Repositories

### Backend:

```bash
git clone https://github.com/aditya32193213/ai-orchestrator-backend.git
cd ai-orchestrator-frontend
```

### Install Dependencies
```bash
npm install
```

### Add Environment Variables
```bash
PORT=5000
GEMINI_API_KEY=your_key
N8N_WEBHOOK_URL=https://your-n8n-endpoint
```

### Start Server

### Development:
```bash
npm run dev
```

### Production
```bash
npm start
```