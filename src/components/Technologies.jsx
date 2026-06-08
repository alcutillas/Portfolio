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
    description: "Bases del desarrollo web en el navegador.",
    items: [
      { name: "HTML", icon: Code2, accent: "text-orange-400", bg: "bg-orange-500/10" },
      { name: "CSS", icon: Palette, accent: "text-sky-400", bg: "bg-sky-500/10" },
      { name: "JavaScript", icon: Braces, accent: "text-amber-300", bg: "bg-amber-500/10" },
      { name: "Tailwind", icon: Wind, accent: "text-teal-400", bg: "bg-teal-500/10" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    description: "Bibliotecas y metaframeworks para aplicaciones.",
    items: [
      { name: "React", icon: Atom, accent: "text-cyan-400", bg: "bg-cyan-500/10" },
      { name: "Next.js", icon: Layers, accent: "text-white", bg: "bg-white/10" },
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

const stats = [
  { value: "12", label: "Tecnologías" },
  { value: "4", label: "Áreas" },
  { value: "2+", label: "Años de experiencia" },
  { value: "10+", label: "Proyectos" },
];

function TechIcon({ tech }) {
  const Icon = tech.icon;
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="group w-[48%] flex items-center gap-3 rounded-xl p-1 transition-colors hover:border-violet-500/35 hover:bg-violet-950/30"
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
      className="relative flex h-full min-h-0 flex-col overflow-hidden border-t border-white/5 bg-[#050510] px-6 pt-24 pb-6 text-white"
    >
      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col gap-4">
        <motion.div
          className="shrink-0 text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-500">
            Herramientas del oficio
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-4xl">
            Desarrollo web
          </h2>
        </motion.div>

        <motion.div
          className="grid min-h-0 grid-cols-1 grid-rows-4 gap-3 auto-rows-fr md:grid-cols-2 md:grid-rows-2 md:gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={item}
              className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-[#0a0812]/60 p-4 backdrop-blur-sm md:p-5"
            >
              <div className="mb-4 shrink-0">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-violet-400">
                  {cat.label}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{cat.description}</p>
              </div>
              <div className="flex min-h-0 flex-1 flex-wrap content-start gap-2">
                {cat.items.map((tech) => (
                  <TechIcon key={tech.name} tech={tech} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="shrink-0 rounded-2xl border border-violet-500/20 bg-violet-950/40 p-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center text-center">
                <p className="text-2xl font-black text-violet-300 md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
