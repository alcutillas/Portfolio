import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { handleContactSubmission, isSmtpConfigured } from "../lib/sendContact.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json({ limit: "32kb" }));

app.post("/api/contact", async (req, res) => {
  const { status, body } = await handleContactSubmission(req.body);
  res.status(status).json(body);
});

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
  if (!isSmtpConfigured()) {
    console.warn("SMTP no configurado. Copia .env.example a .env y añade tus credenciales.");
  }
});
