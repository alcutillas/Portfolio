import { Link, useLocation } from "react-router-dom";

import useActiveHomeSection from "../hooks/useActiveHomeSection";
import {
  isMobileNav,
  navigateHomeSection,
  scrollToHash,
  setActiveHomeSectionId,
} from "../utils/sectionScroll";



const navLinks = [

  { hash: "proyectos", label: "Proyectos" },

  { hash: "stack", label: "Stack" },

  { hash: "sobre-mi", label: "Sobre mí" },

];



export default function SiteNav({ className = "", logoOnly = false }) {

  const { pathname } = useLocation();

  const activeSectionId = useActiveHomeSection();

  const isHome = pathname === "/";



  const handleHashClick = (e, hash) => {

    e.preventDefault();

    if (pathname !== "/") {

      window.location.href = `/#${hash}`;

      return;

    }

    if (isMobileNav()) {

      navigateHomeSection(hash);

      return;

    }

    setActiveHomeSectionId(hash);

    scrollToHash(hash);

  };



  const handleLogoClick = (e) => {

    if (pathname !== "/") return;

    e.preventDefault();

    if (isMobileNav()) {

      navigateHomeSection("");

      return;

    }

    setActiveHomeSectionId("");

    document.getElementById("page-scroll")?.scrollTo({ top: 0, behavior: "smooth" });

  };



  return (

    <header

      className={`fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl ${className}`}

    >

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">

        <Link to="/" className="text-lg font-black tracking-tight text-white" onClick={handleLogoClick}>

          Alvaro<span className="text-violet-500">.dev</span>

        </Link>



        <nav className={`${logoOnly ? "hidden" : "hidden md:flex"} items-center gap-8`}>

          {navLinks.map(({ hash, label }) => (

            <a

              key={hash}

              href={`/#${hash}`}

              onClick={(e) => handleHashClick(e, hash)}

              className={`text-sm font-medium transition-colors duration-300 ${
                isHome && activeSectionId === hash
                  ? "text-violet-400"
                  : "text-slate-400 hover:text-white"
              }`}

            >

              {label}

            </a>

          ))}

        </nav>



        <a

          href="/#contacto"

          onClick={(e) => handleHashClick(e, "contacto")}

          className={`${logoOnly ? "hidden" : "hidden md:inline-flex"} rounded-lg px-4 py-2 text-sm font-bold text-[#050510] transition-all duration-300 ${
            isHome && activeSectionId === "contacto"
              ? "bg-violet-400 ring-2 ring-violet-300 ring-offset-2 ring-offset-[#050510]"
              : "bg-violet-500 hover:bg-violet-400"
          }`}

        >

          Contáctame

        </a>

      </div>

    </header>

  );

}

