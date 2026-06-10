import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

function projectUrl(id) {
  return `/trabajos?project=${id}`;
}

function Tag({ children }) {
  return (
    <span className="rounded-md border border-violet-500/25 bg-violet-950/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-300">
      {children}
    </span>
  );
}

function ProjectCard({ project, className = "", large = false }) {
  return (
    <Link
      to={projectUrl(project.id)}
      className={`group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0a14] transition-colors hover:border-violet-500/40 ${className}`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-gradient-to-br from-violet-950/80 to-[#050510] aspect-[16/10] sm:aspect-[2/1] ${
          large ? "lg:aspect-auto lg:min-h-0 lg:flex-[1.2]" : "lg:aspect-auto lg:min-h-0 lg:flex-1"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.25),transparent_60%)]" />
        {project.preview && (
          <img
            src={project.preview}
            alt=""
            className="h-full w-full object-cover object-center opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        
        <div className="absolute bottom-3 right-3 flex max-w-[85%] flex-wrap justify-end gap-1.5">
          {project.technologies.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <div className={`flex shrink-0 flex-col gap-2 p-4 ${large ? "lg:p-5" : ""}`}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-left text-sm font-black uppercase tracking-tight text-white lg:text-base">
            {project.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-violet-400 opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
        <p className="line-clamp-2 text-left text-xs leading-relaxed text-slate-400 lg:text-sm">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

function WideProjectCard({ project }) {
  return (
    <Link
      to={projectUrl(project.id)}
      className="group grid h-full min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0a14] transition-colors hover:border-violet-500/40 lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-gradient-to-br from-violet-950/80 to-[#050510] sm:aspect-[2/1] lg:aspect-auto lg:min-h-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)]" />
        {project.preview && (
          <img
            src={project.preview}
            alt=""
            className="h-full w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <div className="absolute bottom-3 right-3 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 p-4 text-left lg:p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-black uppercase tracking-tight text-white">
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-violet-400 opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

export default function FeaturedProjects() {
  const [main, side, wide] = projects;

  return (
    <section
      id="proyectos"
      className="section-mobile-safe flex h-full flex-col py-20 overflow-y-auto overscroll-y-contain bg-[#050510] px-6 text-white lg:overflow-hidden lg:pt-24 lg:pb-8"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:h-full lg:gap-10">
        <motion.div
          className="flex shrink-0 flex-wrap items-end justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-left">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
              Proyectos destacados
            </h2>
            <p className="mt-1 max-w-lg text-sm text-slate-400">
              Pulsa un proyecto para ver el detalle completo.
            </p>
          </div>
          <Link
            to="/trabajos"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-violet-500/40 bg-violet-950/40 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-violet-200 transition-colors hover:border-violet-400 hover:bg-violet-900/40"
          >
            Ver todos
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        <div className="flex flex-col gap-4 lg:grid lg:min-h-0 lg:flex-1 lg:grid-rows-[1fr_minmax(0,38%)] lg:gap-7">
          <div className="flex flex-col gap-4 lg:grid lg:min-h-0 lg:grid-cols-3 lg:gap-7">
            <motion.div
              className="min-h-0 lg:col-span-2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <ProjectCard project={main} large className="h-full" />
            </motion.div>
            <motion.div
              className="min-h-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <ProjectCard project={side} className="h-full" />
            </motion.div>
          </div>

          <motion.div
            className="min-h-0"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <WideProjectCard project={wide} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
