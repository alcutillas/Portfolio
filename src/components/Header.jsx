import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-center gap-5 px-6 py-4">
        {[
          { to: "/", label: "Inicio" },
          { to: "/trabajos", label: "Trabajos" },
          { to: "/contacto", label: "Contacto" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 uppercase ${
                isActive
                  ? "bg-violet-600 text-white shadow-[0_0_10px_rgba(139,92,246,0.55)]"
                  : "text-slate-500 hover:bg-white/10 hover:text-violet-600"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}