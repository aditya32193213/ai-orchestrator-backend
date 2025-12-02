import axios from "axios";

export async function callGemini(extractedText, question) {

  const prompt = `
You are an expert document analyst.

Your tasks:
1. Write a clear summary of the document.
2. Provide a direct answer to the question.
3. Extract 8–12 structured key-value pairs as an ARRAY.

IMPORTANT — RETURN JSON EXACTLY LIKE THIS:

{
  "summary": "short summary",
  "answer": "direct answer",
  "structured": [
    { "field": "Field name 1", "value": "value 1" },
    { "field": "Field name 2", "value": "value 2" },
    { "field": "Field name 3", "value": "value 3" }
  ]
}

RULES:
- structured MUST ALWAYS be a NON-EMPTY ARRAY (minimum 5 items).
- NEVER return an empty object.
- NEVER return markdown or backticks.
- NEVER escape quotes.
- MUST return only valid JSON.
- If data is missing in document, return "Not Available" as value.

Document:
${extractedText}

Question:
${question}
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        response_mime_type: "application/json",
      },
    }
  );

  const rawText =
    response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";


  let parsed = null;

  try {
    parsed = JSON.parse(rawText);

    // 🔧 Ensure structured is ALWAYS a valid array
    if (!Array.isArray(parsed.structured) || parsed.structured.length === 0) {
      console.log("⚠️ Gemini returned empty or invalid structured data. Fixing it.");

      parsed.structured = [
        { field: "Status", value: "AI returned incomplete structured data" }
      ];
    }
  } catch (err) {
    console.log("❌ JSON Parse Failed — Returning fallback");

    parsed = {
      summary: "Unable to generate full structured output.",
      answer: "",
      structured: [
        { field: "Raw Output", value: rawText || "No data received" }
      ],
    };
  }

  console.log("FINAL PARSED JSON:", parsed);
  return parsed;
}
