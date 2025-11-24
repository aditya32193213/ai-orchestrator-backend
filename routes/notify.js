import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text, question, extractedJson } = req.body;

    // Email now comes from extractedJson.email
    const email = extractedJson?.email;

    if (!email) {
      return res.status(400).json({ error: "Recipient email is required" });
    }

    // Final payload to n8n
    const payload = {
      text,
      question,
      extractedJson,
      email, // flatten email for easier access in n8n
    };

    const n8nWebhook = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhook) {
      return res
        .status(500)
        .json({ error: "N8N_WEBHOOK_URL is not defined in .env" });
    }

    const response = await axios.post(n8nWebhook, payload);

    res.json({
      success: true,
      n8nResponse: response.data,
    });
  } catch (error) {
    console.error("Notify Error:", error);
    res.status(500).json({
      error: "Failed to send to n8n",
      details: error.message,
    });
  }
});

export default router;
