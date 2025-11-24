import express from "express";
import multer from "multer";
import pdf from "pdf-parse-fixed";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const question = req.body.question;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfData = await pdf(file.buffer);
    const extractedText = pdfData.text;

    const output = {
      text: extractedText,
      question: question || "",
      extractedJson: {
        email: "",
      },
    };

    return res.json(output);

  } catch (error) {
    console.error("Extract Error:", error);
    res.status(500).json({
      error: "Failed to extract document",
      details: error.message,
    });
  }
});

export default router;
