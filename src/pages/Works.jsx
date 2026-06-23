import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Hand } from "lucide-react";
import { projects } from "../data/projects";
import useIsMobileNav from "../hooks/useIsMobileNav";

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

function ProjectPreview({ project, className = "" }) {
  const [imageOk, setImageOk] = useState(false);

  return (
    <div
      className={`relative h-full min-h-[140px] w-full overflow-hidden rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-[#0a0618] to-[#050510] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:rounded-2xl ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.2),transparent_55%)]" />
      {project.preview && (
        <img
          src={project.preview}
          alt={`Vista previa de ${project.title}`}
          className={`relative h-full w-full object-cover object-center transition-all duration-500 hover:scale-105 ${
            imageOk ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageOk(true)}
          onError={() => setImageOk(false)}
        />
      )}
      {!imageOk && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center sm:gap-3 sm:p-8">
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-violet-400/80 sm:text-xs">
            Preview
          </span>
          <p className="max-w-xs text-base font-black uppercase tracking-wide text-white/90 sm:text-lg">
            {project.title}
          </p>
          <p className="text-xs text-violet-300/60 sm:text-sm">
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
    <div className="flex h-full min-h-0 flex-col gap-4 py-4 sm:gap-6 sm:py-6 md:grid md:grid-cols-2 md:items-center md:gap-8 md:py-8 lg:gap-12 lg:py-10">
      <div className="flex min-h-0 shrink-0 flex-col justify-center gap-2 sm:gap-4 md:min-h-0 md:overflow-y-auto md:pr-2">
        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-violet-400 sm:text-xs">
          Proyecto {projects.findIndex((p) => p.id === project.id) + 1} / {projects.length}
        </span>
        <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          {project.title}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg">
          {project.description}
        </p>
        <div className="flex flex-col gap-2 sm:gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.28em] text-violet-500/80">
            Tecnologías
          </span>
          <ul className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-violet-500/30 bg-violet-950/50 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-violet-200 sm:px-4 sm:py-1.5 sm:text-xs"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-center md:flex-[1.1] md:min-h-0">
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="block h-full w-full min-h-[160px] max-h-[42dvh] sm:min-h-[200px] sm:max-h-[45dvh] md:max-h-none md:aspect-[16/10] md:min-h-0"
        >
          <ProjectPreview project={project} />
        </a>
      </div>
    </div>
  );
}

function SwipeHint({ visible }) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="pointer-events-none flex flex-col items-center gap-1.5"
    >
      <motion.div
        animate={{ x: [-6, 6, -6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-1 text-violet-400"
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
        <Hand size={18} className="text-violet-300" />
        <ChevronRight size={16} strokeWidth={2.5} />
      </motion.div>
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300/90">
        Desliza para cambiar
      </p>
    </motion.div>
  );
}

export default function Works() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [index, setIndex] = useState(() => getProjectIndex(searchParams.get("project")));
  const [direction, setDirection] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const locking = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const isMobileNav = useIsMobileNav();

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
      if (locking.current || projects.length === 0) return;

      const total = projects.length;
      const normalized = ((next % total) + total) % total;
      if (normalized === index) return;

      setHasInteracted(true);
      locking.current = true;
      const forward =
        next > index || (index === total - 1 && normalized === 0);
      setDirection(forward ? 1 : -1);
      setIndex(normalized);
      setSearchParams({ project: projects[normalized].id }, { replace: true });
      setTimeout(() => {
        locking.current = false;
      }, 900);
    },
    [index, setSearchParams],
  );

  const handleWheel = useCallback(
    (e) => {
      if (isMobileNav) return;
      if (locking.current) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 35) return;
      e.preventDefault();
      if (e.deltaY > 0) goTo(index + 1);
      else goTo(index - 1);
    },
    [goTo, index, isMobileNav],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const handleTouchStart = useCallback((e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const deltaX = touchStart.current.x - e.changedTouches[0].clientX;
      const deltaY = touchStart.current.y - e.changedTouches[0].clientY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX < 40 && absY < 40) return;

      if (absX >= absY) {
        if (deltaX > 0) goTo(index + 1);
        else goTo(index - 1);
      } else {
        if (deltaY > 0) goTo(index + 1);
        else goTo(index - 1);
      }
    },
    [goTo, index],
  );

  const project = projects[index];

  return (
    <main
      id="page-scroll"
      className="relative h-dvh overflow-hidden bg-[#050510] text-white"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute inset-x-0 bottom-0 z-20 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-4 sm:px-6">
          <AnimatePresence>
            {isMobileNav && !hasInteracted && (
              <SwipeHint visible />
            )}
          </AnimatePresence>

          <div className="flex w-full items-center justify-between gap-3">
            {isMobileNav ? (
              <button
                type="button"
                aria-label="Proyecto anterior"
                onClick={() => goTo(index - 1)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-950/60 text-violet-300 transition-colors active:bg-violet-900/60"
              >
                <ChevronLeft size={18} />
              </button>
            ) : (
              <div className="hidden md:block" aria-hidden />
            )}

            <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Ir a ${p.title}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? "h-2 w-6 bg-violet-500 sm:w-8"
                      : "h-2 w-2 bg-violet-500/30 hover:bg-violet-500/60 active:bg-violet-500/60"
                  }`}
                />
              ))}
            </div>

            {isMobileNav ? (
              <button
                type="button"
                aria-label="Proyecto siguiente"
                onClick={() => goTo(index + 1)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-950/60 text-violet-300 transition-colors active:bg-violet-900/60"
              >
                <ChevronRight size={18} />
              </button>
            ) : (
              <p className="hidden text-right text-[10px] uppercase tracking-[0.2em] text-slate-400 md:block">
                Scroll para cambiar
              </p>
            )}
          </div>

          {isMobileNav && (
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              {index + 1} / {projects.length}
            </p>
          )}
        </div>
      </div>

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
          className="absolute inset-0 pt-14 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pt-16 sm:pb-[calc(6rem+env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto h-full w-full max-w-7xl px-4 sm:px-6">
            <ProjectSlide project={project} />
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
