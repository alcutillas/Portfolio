import { handleContactSubmission } from "../lib/sendContact.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  const { status, body } = await handleContactSubmission(req.body);
  return res.status(status).json(body);
}
