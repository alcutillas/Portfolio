import nodemailer from "nodemailer";

const CONTACT_TO = process.env.CONTACT_TO || "alvaromurada1@gmail.com";
const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];

const projectTypes = {
  web: "Desarrollo web",
  ecommerce: "E-commerce",
  wordpress: "WordPress",
  other: "Otro",
};

function isSmtpConfigured() {
  return requiredEnv.every((key) => process.env[key]);
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  if (!isSmtpConfigured()) {
    return res.status(503).json({
      error: "El servidor de correo no está configurado. Revisa las variables de entorno.",
    });
  }

  const { name, email, type, message } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Nombre, email y mensaje son obligatorios." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "El email no es válido." });
  }

  const projectLabel = projectTypes[type] || projectTypes.other;
  const safeName = String(name).trim().slice(0, 120);
  const safeEmail = String(email).trim().slice(0, 160);
  const safeMessage = String(message).trim().slice(0, 5000);

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Portfolio — ${safeName}" <${process.env.SMTP_USER}>`,
      replyTo: safeEmail,
      to: CONTACT_TO,
      subject: `[Portfolio] Nuevo contacto — ${projectLabel}`,
      text: [
        `Nombre: ${safeName}`,
        `Email: ${safeEmail}`,
        `Tipo de proyecto: ${projectLabel}`,
        "",
        "Mensaje:",
        safeMessage,
      ].join("\n"),
      html: `
        <h2>Nuevo mensaje desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Tipo de proyecto:</strong> ${projectLabel}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${safeMessage.replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error al enviar email:", err);
    return res.status(500).json({ error: "No se pudo enviar el mensaje. Inténtalo más tarde." });
  }
}
