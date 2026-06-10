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
      className="group flex w-full min-w-0 items-center gap-2 rounded-xl p-1 transition-colors hover:border-violet-500/35 hover:bg-violet-950/30 sm:w-[calc(50%-0.25rem)] sm:gap-3"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/5 sm:h-11 sm:w-11 ${tech.bg}`}
      >
        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${tech.accent}`} strokeWidth={2} />
      </div>
      <span className="min-w-0 truncate text-[10px] font-bold uppercase tracking-[0.08em] text-slate-200 sm:text-xs sm:tracking-[0.12em]">
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function Technologies() {
  return (
    <section
      id="stack"
      className="section-mobile-safe relative flex h-full flex-col justify-center overflow-y-auto overscroll-y-contain border-t border-white/5 bg-[#050510] px-6 text-white lg:overflow-hidden lg:pt-24 lg:pb-6"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 lg:h-full lg:min-h-0">
        <motion.div
          className="shrink-0 text-left mt-60 md:mt-0"
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
          className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:min-h-0 lg:flex-1 lg:grid-rows-2 lg:auto-rows-fr"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={item}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#0a0812]/60 p-4 backdrop-blur-sm md:p-5 lg:min-h-0"
            >
              <div className="mb-3 shrink-0 sm:mb-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-violet-400">
                  {cat.label}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{cat.description}</p>
              </div>
              <div className="flex flex-wrap content-start gap-2 lg:min-h-0 lg:flex-1">
                {cat.items.map((tech) => (
                  <TechIcon key={tech.name} tech={tech} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </section>
  );
}
