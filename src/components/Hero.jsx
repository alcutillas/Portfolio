import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// Teclas que producen texto visible en el display
const TYPEABLE = new Set([
  "Q","W","E","R","T","Y","U","I","O","P",
  "A","S","D","F","G","H","J","K","L",
  "Z","X","C","V","B","N","M",
  "1","2","3","4","5","6","7","8","9","0",
]);

function Key({ children, style = {}, delay = 0, onPress }) {
  const controls = useAnimation();

  // Animación idle: flotación suave
  useEffect(() => {
    controls.start({
      y: [0, -3, 0],
      transition: {
        duration: 2.6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      },
    });
  }, [controls, delay]);

  const handlePress = useCallback(async () => {
    // Cancela idle, simula pulsación física: baja rápido, sube con rebote
    controls.stop();
    await controls.start({
      y: [0, 5, -2, 0],
      transition: { duration: 0.18, ease: "easeOut" },
    });
    // Retoma idle
    controls.start({
      y: [0, -3, 0],
      transition: {
        duration: 2.6,
        repeat: Infinity,
        delay: 0,
        ease: "easeInOut",
      },
    });
    onPress?.();
  }, [controls, onPress]);

  return (
    <motion.div
      animate={controls}
      className="flex items-center justify-center rounded-lg bg-[#090414] text-[10px] font-black text-violet-300 select-none cursor-pointer"
      style={{
        height: "2.4rem",
        boxShadow: "0 6px 0 rgba(76,29,149,0.85), 0 8px 16px rgba(0,0,0,0.5)",
        ...style,
      }}
      onHoverStart={() => {
        controls.stop();
        controls.start({
          y: -6,
          transition: { duration: 0.15, ease: "easeOut" },
        });
      }}
      onHoverEnd={() => {
        controls.start({
          y: [0, -3, 0],
          transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
        });
      }}
      onTapStart={() => {
        controls.stop();
        controls.start({
          y: 5,
          transition: { duration: 0.08, ease: "easeIn" },
        });
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

function TypeDisplay({ typed }) {
  const isEmpty = typed.length === 0;

  return (
    <div className="relative mb-3 overflow-hidden rounded-xl border border-violet-500/25 bg-[#06030f] px-4 py-3 shadow-[0_0_30px_rgba(139,92,246,0.12)]">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-transparent to-transparent" />
      {/* Scanlines decorativas */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)" }}
      />
      <div className="relative flex items-center gap-2 min-h-[1.25rem]">
        <span className="text-[10px] font-mono text-violet-500/60 select-none">›</span>
        <span className="font-mono text-sm tracking-wider">
          {isEmpty ? (
            <span className="text-violet-500/30 italic text-xs">escribe algo...</span>
          ) : (
            <span className="text-violet-200">{typed}</span>
          )}
          <motion.span
            className="inline-block w-[2px] h-[14px] bg-violet-400 ml-0.5 align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </span>
      </div>
    </div>
  );
}

function KeyboardAnimation() {
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
      className="relative mx-auto flex w-full flex-col gap-2 rounded-[2rem] border border-violet-500/20 bg-violet-950/20 p-6 backdrop-blur-xl"
    >
      <div className="absolute -inset-10 -z-10 rounded-full bg-violet-600/15 blur-3xl" />

      <TypeDisplay typed={typed} />

      {rows.map((row, rowIndex) => (
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

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050510] px-6 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-purple-600/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 py-24 lg:grid-cols-2 lg:gap-16">

        {/* Left column */}
        <div className="relative z-10 flex flex-col items-start gap-12">

          {/* Badge */}
          <span className="inline-flex items-center gap-3 rounded-full border border-violet-600/60 bg-violet-950/40 px-4 py-2 text-xs uppercase tracking-[0.35em] text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
            <span className="text-violet-400">&lt;/&gt;</span>
            Web Developer
          </span>

          {/* Name */}
          <div className="flex items-end p-0 gap-5">
            <h1 className="m-0 text-5xl uppercase md:text-7xl">
              Álvaro
            </h1>
            <h2 className="m-0 text-violet-600 text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
              Cutillas López
            </h2>
          </div>


          {/* CTAs */}
          <div className="flex flex-row items-center gap-8">
            <Link to="/trabajos" className="cta">
              <span>Ver trabajos</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </Link>

            <Link to="/contacto" className="btn-to-contact">
              <span>
                Contactar
                <Send size={18} />
              </span>
            </Link>
          </div>

        </div>

        {/* Right column — keyboard */}
        <div className="relative flex-col hidden items-center justify-center lg:flex">
          {/* Photo card */}
          <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-violet-500/30 bg-white/[0.03] p-3 shadow-[0_0_50px_rgba(139,92,246,0.2)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/15 via-transparent to-transparent" />
            <img
              src="/fotopresentacion.jpg"
              alt="Álvaro Cutillas López"
              className="relative h-64 w-full rounded-[1.5rem] object-cover object-top"
            />
          </div>
          <KeyboardAnimation />
        </div>
      </div>
    </section>
  );
}
