import { handleContactSubmission } from "../lib/sendContact.js";

export default async function handler(req, res) {
  const path = (req.url || "").split("?")[0];

  if (path === "/api/contact" || path.endsWith("/api/contact")) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Método no permitido." });
    }

    const { status, body } = await handleContactSubmission(req.body);
    return res.status(status).json(body);
  }

  return res.status(404).json({ error: "Ruta no encontrada." });
}
