import { Link } from "react-router-dom";

const social = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:contacto@ejemplo.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050510] px-6 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-left">
          <Link to="/" className="text-lg font-black tracking-tight">
            Álvaro<span className="text-violet-500">.dev</span>
          </Link>
          <p className="mt-2 text-xs text-slate-500">
            © {new Date().getFullYear()} Álvaro Cutillas López. Todos los derechos reservados.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {social.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-400 transition-colors hover:text-violet-400"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
