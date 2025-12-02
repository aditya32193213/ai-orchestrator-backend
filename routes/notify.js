import express from "express";
import { triggerN8N } from "../services/n8nservice.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      email,
      subject = "",
      body = "",        
      summary = "",
      answer = "",
      structured = {},
      question = "",
      metadata = {}
    } = req.body || {};

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: email"
      });
    }

    let structuredArray = [];

    if (Array.isArray(structured)) {
      structuredArray = structured;
    } else if (typeof structured === "object" && structured !== null) {
      structuredArray = Object.entries(structured).map(([key, value]) => ({
        field: key,
        value
      }));
    }

    if (structuredArray.length === 0) {
      structuredArray.push({
        field: "Info",
        value: "No structured data returned by AI"
      });
    }

    const payload = {
      email,
      subject,
      body,
      summary,
      answer,
      structured: structuredArray,
      question,
      metadata,
      sentAt: new Date().toISOString(),
    };

    console.log("FINAL PAYLOAD TO N8N →\n", JSON.stringify(payload, null, 2));

    const n8nResponse = await triggerN8N(payload);

    return res.json({
      success: true,
      message: "Forwarded to n8n webhook successfully",
      n8nResponse: n8nResponse || {}
    });

  } catch (err) {
    console.error("notify.js error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to forward to n8n webhook",
      error: err.message
    });
  }
});

export default router;
