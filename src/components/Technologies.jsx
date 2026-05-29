import { motion } from "framer-motion";
import {
  Atom,
  Braces,
  Code2,
  Coffee,
  Container,
  Database,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Server,
  Wind,
} from "lucide-react";

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces rápidas, accesibles y mantenibles.",
    items: [
      { name: "HTML", icon: Code2, accent: "text-orange-400", bg: "bg-orange-500/10" },
      { name: "CSS", icon: Palette, accent: "text-sky-400", bg: "bg-sky-500/10" },
      { name: "JavaScript", icon: Braces, accent: "text-amber-300", bg: "bg-amber-500/10" },
      { name: "React", icon: Atom, accent: "text-cyan-400", bg: "bg-cyan-500/10" },
      { name: "Tailwind", icon: Wind, accent: "text-teal-400", bg: "bg-teal-500/10" },
    ],
  },
  {
    id: "backend",
    label: "Backend & datos",
    description: "Lógica de negocio, APIs y persistencia.",
    items: [
      { name: "PHP", icon: Server, accent: "text-indigo-400", bg: "bg-indigo-500/10" },
      { name: "Java", icon: Coffee, accent: "text-red-400", bg: "bg-red-500/10" },
      { name: "SQL", icon: Database, accent: "text-blue-400", bg: "bg-blue-500/10" },
    ],
  },
  {
    id: "tools",
    label: "DevOps & CMS",
    description: "Control de versiones, contenedores y despliegue.",
    items: [
      { name: "Git & GitHub", icon: GitBranch, accent: "text-slate-200", bg: "bg-white/10" },
      { name: "Docker", icon: Container, accent: "text-sky-300", bg: "bg-sky-500/10" },
      { name: "WordPress", icon: Globe, accent: "text-violet-300", bg: "bg-violet-500/10" },
    ],
  },
];

const highlights = [
  { label: "Frontend moderno", icon: Layers },
  { label: "APIs y bases de datos", icon: Database },
  { label: "Código versionado", icon: GitBranch },
  { label: "Despliegue en contenedores", icon: Container },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

function TechIcon({ tech }) {
  const Icon = tech.icon;
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-[#0c0a14]/80 px-3 py-3 transition-colors hover:border-violet-500/35 hover:bg-violet-950/30"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/5 ${tech.bg}`}
      >
        <Icon className={`h-5 w-5 ${tech.accent}`} strokeWidth={2} />
      </div>
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-200">
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function Technologies() {
  return (
    <section
      id="stack"
      className="relative flex h-full max-h-[100vh] flex-col overflow-hidden border-t border-white/5 bg-[#050510] px-6 pt-24 pb-8  text-white"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-700/10 blur-[100px]" />

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col gap-6 lg:gap-8">
        <motion.div
          className="shrink-0 text-left lg:max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-500">
            Herramientas del oficio
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-4xl">
            Arsenal técnico
          </h2>
        </motion.div>

        <div className="grid min-h-0 flex-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="flex min-h-0 flex-col gap-5 overflow-y-auto pr-1 scrollbar-hide lg:col-span-7"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={item}
                className="h-full rounded-2xl border border-white/10 bg-[#0a0812]/60 p-3 backdrop-blur-sm md:p-4"
              >
                <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-violet-400">
                      {cat.label}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">{cat.description}</p>
                  </div>
                </div>
                <motion.div
                  className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {cat.items.map((tech) => (
                    <motion.div key={tech.name} variants={item}>
                      <TechIcon tech={tech} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex min-h-0 flex-col justify-between gap-6 lg:col-span-5"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-violet-500/20 bg-violet-950/40 p-6 md:p-8">
              <p className="text-left text-base leading-relaxed text-slate-300 md:text-lg">
                Trabajo con un stack orientado al{" "}
                <span className="font-bold text-white">frontend moderno</span> y al backend
                clásico cuando el proyecto lo requiere: interfaces con React, estilos con
                Tailwind, APIs con PHP o Java, y datos con SQL.
              </p>
              <p className="mt-4 text-left text-sm leading-relaxed text-slate-500">
                También uso WordPress para sitios gestionables, Docker para entornos
                reproducibles y Git para un flujo de trabajo ordenado. Priorizo código
                legible y experiencias fluidas en cualquier dispositivo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {highlights.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0c0a14] p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15">
                    <Icon className="h-4 w-4 text-violet-400" strokeWidth={2} />
                  </div>
                  <p className="text-left text-[11px] font-bold uppercase leading-snug tracking-wide text-slate-300">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-[#0c0a14] p-4">
              {[
                { value: "11+", label: "Tecnologías" },
                { value: "3", label: "Áreas" },
                { value: "100%", label: "Enfoque web" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-black text-violet-400">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
