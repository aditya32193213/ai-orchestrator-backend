import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import extractRoute from "./routes/extract.js";
import notifyRoute from "./routes/notify.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/extract", extractRoute);   // POST file + question
app.use("/api/notify", notifyRoute);     // POST extractedJson + text + question + email

app.get("/", (req, res) => res.json({ ok: true, service: "AI Orchestrator Backend" }));

const PORT = process.env.PORT||5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});