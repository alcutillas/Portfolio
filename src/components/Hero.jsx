import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { isMobileNav, navigateHomeSection, scrollToHash } from "../utils/sectionScroll";

const TYPEABLE = new Set([
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L",
  "Z", "X", "C", "V", "B", "N", "M",
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
]);

const TYPEWRITER_PHRASES = [
  "Hola, soy Álvaro",
  "npm run dev",
  "const dev = true",
  "<WebDeveloper />",
  "git push origin main",
];

function Key({ children, style = {}, delay = 0, onPress }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -2, 0],
      transition: { duration: 2.0, repeat: Infinity, delay, ease: "easeInOut" },
    });
  }, [controls, delay]);

  const handlePress = useCallback(async () => {
    controls.stop();
    await controls.start({
      y: [0, 5, -2, 0],
      transition: { duration: 0.18, ease: "easeOut" },
    });
    controls.start({
      y: [0, -2, 0],
      transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
    });
    onPress?.();
  }, [controls, onPress]);

  return (
    <motion.div
      animate={controls}
      className="flex cursor-pointer select-none items-center justify-center rounded-lg bg-[#090414] text-[10px] font-black text-violet-300"
      style={{
        height: "2.4rem",
        boxShadow: "0 6px 0 rgba(76,29,149,0.85), 0 8px 16px rgba(0,0,0,0.5)",
        ...style,
      }}
      onHoverStart={() => {
        controls.stop();
        controls.start({ y: -6, transition: { duration: 0.15, ease: "easeOut" } });
      }}
      onHoverEnd={() => {
        controls.start({
          y: [0, -3, 0],
          transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
        });
      }}
      onTapStart={() => {
        controls.stop();
        controls.start({ y: 5, transition: { duration: 0.08, ease: "easeIn" } });
      }}
      onTap={handlePress}
      onTapCancel={() => {
        controls.start({
          y: [0, -3, 0],
          transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
        });
      }}
      whileTap={{
        boxShadow: "0 2px 0 rgba(76,29,149,0.9), 0 2px 6px rgba(0,0,0,0.5)",
        backgroundColor: "#120820",
      }}
    >
      {children}
    </motion.div>
  );
}

function useTypewriter(active) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplay("");
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const phrase = TYPEWRITER_PHRASES[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        setDisplay(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1800);
          return;
        }
        timeoutId = setTimeout(tick, 55 + Math.random() * 45);
      } else {
        charIndex -= 1;
        setDisplay(phrase.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % TYPEWRITER_PHRASES.length;
          timeoutId = setTimeout(tick, 400);
          return;
        }
        timeoutId = setTimeout(tick, 28);
      }
    };

    timeoutId = setTimeout(tick, 500);
    return () => clearTimeout(timeoutId);
  }, [active]);

  return display;
}

function TypeDisplay({ typed, screenOnly = false }) {
  const isEmpty = typed.length === 0;
  const typewriterText = useTypewriter(isEmpty);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-violet-500/25 bg-[#06030f] px-4 py-3 shadow-[0_0_30px_rgba(139,92,246,0.12)] ${
        screenOnly ? "" : "mb-3"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-transparent to-transparent" />
      <div className="relative flex min-h-[1.25rem] items-center gap-2">
        <span className="select-none font-mono text-[10px] text-violet-500/60">›</span>
        <span className="font-mono text-sm tracking-wider">
          <span className={isEmpty ? "text-violet-300/90" : "text-violet-200"}>
            {(isEmpty ? typewriterText : typed) || "\u00a0"}
          </span>
          <motion.span
            className="ml-0.5 inline-block h-[14px] w-[2px] align-middle bg-violet-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </span>
      </div>
    </div>
  );
}

function KeyboardAnimation({ screenOnly = false }) {
  const [typed, setTyped] = useState("");

  const handleKeyPress = useCallback((label) => {
    if (label === "↵") {
      setTyped("");
      return;
    }
    if (label === "⌫") {
      setTyped((t) => t.slice(0, -1));
      return;
    }
    if (label === "SPACE") {
      setTyped((t) => (t.length < 32 ? t + " " : t));
      return;
    }
    if (TYPEABLE.has(label)) {
      setTyped((t) => (t.length < 32 ? t + label : t));
    }
  }, []);

  const rows = [
    [
      { label: "ESC", flex: 1.2 },
      { label: "1", flex: 1 },
      { label: "2", flex: 1 },
      { label: "3", flex: 1 },
      { label: "4", flex: 1 },
      { label: "5", flex: 1 },
      { label: "6", flex: 1 },
      { label: "7", flex: 1 },
      { label: "8", flex: 1 },
      { label: "9", flex: 1 },
      { label: "0", flex: 1 },
      { label: "⌫", flex: 1.4 },
    ],
    [
      { label: "TAB", flex: 1.5 },
      { label: "Q", flex: 1 },
      { label: "W", flex: 1 },
      { label: "E", flex: 1 },
      { label: "R", flex: 1 },
      { label: "T", flex: 1 },
      { label: "Y", flex: 1 },
      { label: "U", flex: 1 },
      { label: "I", flex: 1 },
      { label: "O", flex: 1 },
      { label: "P", flex: 1 },
    ],
    [
      { label: "CAPS", flex: 1.8 },
      { label: "A", flex: 1 },
      { label: "S", flex: 1 },
      { label: "D", flex: 1 },
      { label: "F", flex: 1 },
      { label: "G", flex: 1 },
      { label: "H", flex: 1 },
      { label: "J", flex: 1 },
      { label: "K", flex: 1 },
      { label: "L", flex: 1 },
      { label: "↵", flex: 1.7 },
    ],
    [
      { label: "SHIFT", flex: 2.2 },
      { label: "Z", flex: 1 },
      { label: "X", flex: 1 },
      { label: "C", flex: 1 },
      { label: "V", flex: 1 },
      { label: "B", flex: 1 },
      { label: "N", flex: 1 },
      { label: "M", flex: 1 },
      { label: "SHIFT", flex: 2.2 },
    ],
    [
      { label: "CTRL", flex: 1.4 },
      { label: "ALT", flex: 1.2 },
      { label: "SPACE", flex: 5 },
      { label: "ALT", flex: 1.2 },
      { label: "CTRL", flex: 1.4 },
    ],
  ];

  return (
    <motion.div
      className={`relative z-10 flex w-full flex-col rounded-[2rem] lg:border border-violet-500/20 lg:bg-violet-950/20 backdrop-blur-xl ${
        screenOnly ? "max-w-md gap-0 py-4" : "mx-auto max-w-xl gap-2 p-6"
      }`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="absolute -inset-10 -z-10 rounded-full bg-violet-600/15 blur-3xl" />
      <TypeDisplay typed={screenOnly ? "" : typed} screenOnly={screenOnly} />
      {!screenOnly &&
        rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5">
          {row.map((key, index) => (
            <Key
              key={`${key.label}-${rowIndex}-${index}`}
              delay={(rowIndex * row.length + index) * 0.04}
              style={{ flexGrow: key.flex, minWidth: 0 }}
              onPress={() => handleKeyPress(key.label)}
            >
              {key.label}
            </Key>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

function scrollToSection(id) {
  if (isMobileNav()) {
    navigateHomeSection(id);
    return;
  }
  scrollToHash(id);
}

export default function Hero() {
  return (
    <section className="section-mobile-safe relative flex h-full min-h-0 flex-col justify-center overflow-y-auto overscroll-y-contain bg-[#050510] px-6 text-white lg:overflow-hidden lg:pt-16 lg:pb-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-violet-700/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 py-4 lg:grid-cols-2 lg:gap-16 lg:py-8">
        <motion.div
          className="flex flex-col items-start gap-8 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex w-full flex-col items-start gap-3">
            <div className="max-w-md lg:hidden">
              <KeyboardAnimation screenOnly />
            </div>
            <h1 className="m-0 max-w-xl text-4xl font-black uppercase leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Desarrollando tu web a medida
            </h1>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-slate-400 md:text-lg">
            Desarrollador web full stack especializado en experiencias digitales
            escalables, interfaces modernas con React y diferentes backends.
            Álvaro Cutillas López.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/trabajos"
              className="rounded-lg bg-violet-500 px-4 py-3 text-sm font-bold text-[#050510] transition-colors hover:bg-violet-400"
            >
              Ver mis trabajos
            </Link>
            <button
              type="button"
              onClick={() => scrollToSection("contacto")}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-bold text-white transition-colors hover:border-violet-500/50 hover:text-violet-300"
            >
              Hablemos
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        <div className="relative z-10 hidden items-center justify-center lg:flex">
          <KeyboardAnimation />
        </div>
      </div>
    </section>
  );
}
