import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "../data/projects";

function getProjectIndex(id) {
  if (!id) return 0;
  const i = projects.findIndex((p) => p.id === id);
  return i >= 0 ? i : 0;
}

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

function ProjectPreview({ project }) {
  const [imageOk, setImageOk] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-[#0a0618] to-[#050510] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.2),transparent_55%)]" />
      {project.preview && (
        <img
          src={project.preview}
          alt={`Vista previa de ${project.title}`}
          className={`relative h-full w-full object-cover object-top transition-opacity duration-500 ${
            imageOk ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageOk(true)}
          onError={() => setImageOk(false)}
        />
      )}
      {!imageOk && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
          <span className="text-xs font-black uppercase tracking-[0.35em] text-violet-400/80">
            Preview
          </span>
          <p className="max-w-xs text-lg font-black uppercase tracking-wide text-white/90">
            {project.title}
          </p>
          <p className="text-sm text-violet-300/60">
            Coloca la captura en{" "}
            <span className="font-mono text-violet-400">{project.preview}</span>
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectSlide({ project }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex min-h-0 flex-[1] flex-col justify-center gap-6 px-6 py-8 md:px-12 md:py-10">
        <span className="text-xs font-black uppercase tracking-[0.35em] text-violet-400">
          Proyecto
        </span>
        <h2 className="text-4xl font-black uppercase leading-tight tracking-tight text-white md:text-5xl">
          {project.title}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          {project.description}
        </p>
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.28em] text-violet-500/80">
            Tecnologías
          </span>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-violet-500/30 bg-violet-950/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-200"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        {project.url && project.url !== "#" && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-wider text-violet-400 transition-colors hover:text-violet-300"
          >
            Ver sitio
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      <div className="min-h-0 flex-[1] px-6 pb-8 pt-2 md:px-12 md:pb-12">
        <ProjectPreview project={project} />
      </div>
    </div>
  );
}

export default function Works() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [index, setIndex] = useState(() => getProjectIndex(searchParams.get("project")));
  const [direction, setDirection] = useState(1);
  const locking = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (!searchParams.get("project")) {
      setSearchParams({ project: projects[0].id }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const fromUrl = getProjectIndex(searchParams.get("project"));
    setIndex((prev) => {
      if (prev === fromUrl) return prev;
      setDirection(fromUrl > prev ? 1 : -1);
      return fromUrl;
    });
  }, [searchParams]);

  const goTo = useCallback(
    (next) => {
      if (next < 0 || next >= projects.length || locking.current) return;
      locking.current = true;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
      setSearchParams({ project: projects[next].id }, { replace: true });
      setTimeout(() => {
        locking.current = false;
      }, 900);
    },
    [index, setSearchParams],
  );

  const handleWheel = useCallback(
    (e) => {
      if (locking.current) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 35) return;
      e.preventDefault();
      if (e.deltaY > 0) goTo(index + 1);
      else goTo(index - 1);
    },
    [goTo, index],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(index + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const project = projects[index];

  return (
    <main
      id="page-scroll"
      className="relative h-screen overflow-hidden bg-[#050510] text-white"
      onWheel={handleWheel}
      onTouchStart={(e) => {
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        const delta = touchStartY.current - e.changedTouches[0].clientY;
        if (Math.abs(delta) < 50) return;
        if (delta > 0) goTo(index + 1);
        else goTo(index - 1);
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-violet-700/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="absolute left-6 top-8 z-20 md:left-12">
        <h1 className="text-violet-600">Trabajos</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">
          {index + 1} / {projects.length}
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Ir a ${p.title}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-violet-500"
                : "w-2 bg-violet-500/30 hover:bg-violet-500/60"
            }`}
          />
        ))}
      </div>

      <p className="absolute bottom-8 right-6 z-20 hidden text-[10px] uppercase tracking-[0.2em] text-slate-600 md:block">
        Scroll para cambiar
      </p>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={project.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 280, damping: 32 },
            opacity: { duration: 0.35 },
          }}
          className="absolute inset-0 pt-20"
        >
          <ProjectSlide project={project} />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
