import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { hash: "proyectos", label: "Proyectos" },
  { hash: "stack", label: "Stack" },
  { hash: "sobre-mi", label: "Sobre mí" },
];

function scrollToHash(hash) {
  document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
}

export default function SiteNav() {
  const { pathname } = useLocation();

  const handleHashClick = (e, hash) => {
    e.preventDefault();
    if (pathname !== "/") {
      window.location.href = `/#${hash}`;
      return;
    }
    scrollToHash(hash);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link
          to="/"
          className="text-lg font-black tracking-tight text-white"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              document.getElementById("page-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          Álvaro Cutillas López
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ hash, label }) => (
            <a
              key={hash}
              href={`/#${hash}`}
              onClick={(e) => handleHashClick(e, hash)}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="/#contacto"
          onClick={(e) => handleHashClick(e, "contacto")}
          className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-bold text-[#050510] transition-colors hover:bg-violet-400"
        >
          Contáctame
        </a>
      </div>
    </header>
  );
}
