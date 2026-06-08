import { useState } from "react";
import { motion } from "framer-motion";

const initialForm = { name: "", email: "", type: "web", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "No se pudo enviar el mensaje.");
      }

      setStatus("success");
      setFeedback("Mensaje enviado. Te responderé pronto.");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setFeedback(err.message || "Error al enviar. Inténtalo de nuevo.");
    }
  };

  return (
    <section
      id="contacto"
      className="flex h-full min-h-0 flex-col justify-center border-t border-white/5 bg-[#070612] px-6 py-16 text-white"
    >
      <div className="mx-auto w-full max-w-2xl">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Creemos juntos
          </h2>
          <p className="mt-4 text-slate-400">
            ¿Tienes un proyecto en mente? Cuéntame qué necesitas y te responderé lo antes
            posible.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-white/10 bg-[#0c0a14] p-6 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-left">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Nombre
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={status === "loading"}
                placeholder="Tu nombre"
                className="w-full rounded-lg border border-white/10 bg-[#050510] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-violet-500/50 disabled:opacity-60"
              />
            </label>
            <label className="block text-left">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === "loading"}
                placeholder="tu@email.com"
                className="w-full rounded-lg border border-white/10 bg-[#050510] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-violet-500/50 disabled:opacity-60"
              />
            </label>
          </div>

          <label className="block text-left">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Tipo de proyecto
            </span>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full rounded-lg border border-white/10 bg-[#050510] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-violet-500/50 disabled:opacity-60"
            >
              <option value="web">Desarrollo web</option>
              <option value="ecommerce">E-commerce</option>
              <option value="wordpress">WordPress</option>
              <option value="other">Otro</option>
            </select>
          </label>

          <label className="block text-left">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Mensaje
            </span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              disabled={status === "loading"}
              rows={4}
              placeholder="Describe tu idea o necesidad..."
              className="w-full resize-none rounded-lg border border-white/10 bg-[#050510] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-violet-500/50 disabled:opacity-60"
            />
          </label>

          {feedback && (
            <p
              role="status"
              className={`text-center text-sm ${
                status === "success" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {feedback}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-violet-500 py-3.5 text-sm font-bold uppercase tracking-wider text-[#050510] transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Enviando..." : "Iniciar colaboración"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
