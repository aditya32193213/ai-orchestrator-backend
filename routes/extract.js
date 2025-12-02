import express from "express";
import multer from "multer";
import pdf from "pdf-parse-fixed";
import { callGemini } from "../services/geminiservice.js";

const router = express.Router();
const upload = multer();

/**
 * Normalize Gemini output for frontend display
 */
function normalizeGeminiResponse(geminiJSON) {
    if (!geminiJSON || typeof geminiJSON !== "object") {
        return {
            summary: "",
            answer: "",
            structured: {},
            fullParsed: {},
        };
    }

    return {
        summary: geminiJSON.summary || "",
        answer: geminiJSON.answer || "",
        structured: geminiJSON.structured || {},
        fullParsed: geminiJSON,
    };
}

router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No file uploaded",
            });
        }

        const pdfBuffer = req.file.buffer;
        const question =
            req.body.question ||
            "Summarize this document, answer related questions, and extract structured fields.";

        // 1️⃣ Extract text from PDF
        const pdfData = await pdf(pdfBuffer);
        const extractedText = pdfData.text;

        // 2️⃣ Call Gemini
        const geminiJSON = await callGemini(extractedText, question);

        if (!geminiJSON || typeof geminiJSON !== "object") {
            return res.status(500).json({
                success: false,
                error: "Gemini returned invalid response",
                raw: geminiJSON,
            });
        }

        // 3️⃣ Clean output for UI
        const cleaned = normalizeGeminiResponse(geminiJSON);

        // 4️⃣ Send response
// 4️⃣ Send response
            return res.json({
            success: true,
             summary: cleaned.summary,
             answer: cleaned.answer,
            structured: cleaned.structured,
            fullParsed: cleaned.fullParsed,
             question,  // ✅ Add this line
            subject: "",  // optionally filled later
            email: "",    // optionally filled later
            raw: geminiJSON, // for debugging
});


    } catch (err) {
        console.error("❌ Extract Error:", err);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

export default router;
