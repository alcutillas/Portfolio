import { NavLink, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

import {

  BriefcaseBusiness,

  FolderKanban,

  Home,

  Code,

  Mail,

  Menu,

  User,

  X,

} from "lucide-react";

import { motion } from "framer-motion";

import SiteNav from "./SiteNav";

import { navigateHomeSection } from "../utils/sectionScroll";
import useActiveHomeSection from "../hooks/useActiveHomeSection";



const homeLinks = [

  { type: "section", id: "", label: "Inicio", icon: Home },

  { type: "section", id: "proyectos", label: "Proyectos", icon: FolderKanban },

  { type: "section", id: "stack", label: "Stack", icon: Code },

  { type: "section", id: "sobre-mi", label: "Sobre mí", icon: User },

  { type: "route", to: "/trabajos", label: "Trabajos", icon: BriefcaseBusiness },

  { type: "section", id: "contacto", label: "Contacto", icon: Mail },

];



const worksLinks = [

  { type: "route", to: "/", label: "Inicio", icon: Home },

  { type: "route", to: "/trabajos", label: "Trabajos", icon: BriefcaseBusiness },

  { type: "route", to: "/#contacto", label: "Contacto", icon: Mail },

];



function FloatingHeader({ contentAligned = false }) {

  const [dragging, setDragging] = useState(false);

  const [open, setOpen] = useState(false);

  const [position, setPosition] = useState({

    right: false,

    bottom: false,

  });



  const location = useLocation();

  const isHome = location.pathname === "/";

  const links = isHome ? homeLinks : worksLinks;



  const checkPosition = () => {

    const header = document.getElementById("floating-header");

    if (!header) return;



    const rect = header.getBoundingClientRect();



    setPosition({

      right: rect.left > window.innerWidth / 2,

      bottom: rect.top > window.innerHeight / 2,

    });

  };



  useEffect(() => {

    setOpen(false);

    if (isHome) return;



    const scrollContainer = document.getElementById("page-scroll");

    if (scrollContainer) {

      scrollContainer.scrollTo({ top: 0, behavior: "instant" });

      return;

    }



    window.scrollTo({ top: 0, behavior: "instant" });

  }, [location.pathname, isHome]);



  return (

    <motion.header

      id="floating-header"

      drag={!open}

      dragMomentum={false}

      onDragStart={() => setDragging(true)}

      onDragEnd={() => {

        checkPosition();



        setTimeout(() => {

          setDragging(false);

        }, 50);

      }}

      className={`${

        contentAligned ? "relative" : "fixed right-6 top-1"

      } z-50 ${

        open ? "cursor-default" : "cursor-grab active:cursor-grabbing"

      }`}

    >

      <div className="relative h-14 w-14">

        <button

          onClick={() => {

            if (dragging) return;



            checkPosition();

            setOpen(true);

          }}

          className={`absolute left-0 top-0 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-violet-600 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 ${

            open ? "pointer-events-none opacity-0" : "opacity-100"

          }`}

        >

          <Menu size={28} />

        </button>



        <nav

          className={`absolute left-0 flex flex-col items-center gap-3 rounded-full border border-white/10 bg-black/80 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 ${

            position.bottom ? "bottom-0 origin-bottom" : "top-0 origin-top"

          } ${

            open

              ? "pointer-events-auto scale-100 opacity-100"

              : "pointer-events-none scale-90 opacity-0"

          }`}

        >

          {position.bottom ? (

            <>

              {links.map((link) => (

                <FloatingNavItem

                  key={link.type === "section" ? link.id : link.to}

                  link={link}

                  position={position}

                  isHome={isHome}

                  onNavigate={() => setOpen(false)}

                />

              ))}

              <CloseButton position={position} onClose={() => setOpen(false)} />

            </>

          ) : (

            <>

              <CloseButton position={position} onClose={() => setOpen(false)} />

              {links.map((link) => (

                <FloatingNavItem

                  key={link.type === "section" ? link.id : link.to}

                  link={link}

                  position={position}

                  isHome={isHome}

                  onNavigate={() => setOpen(false)}

                />

              ))}

            </>

          )}

        </nav>

      </div>

    </motion.header>

  );

}



function FloatingNavItem({ link, position, isHome, onNavigate }) {

  const { pathname, hash } = useLocation();

  const activeSectionId = useActiveHomeSection();

  const Icon = link.icon;



  if (link.type === "section") {

    const isActive =

      isHome && (link.id === "" ? activeSectionId === "" : activeSectionId === link.id);



    return (

      <button

        type="button"

        onClick={() => {

          if (isHome) {

            navigateHomeSection(link.id);

          } else {

            window.location.href = link.id ? `/#${link.id}` : "/";

          }

          onNavigate();

        }}

        className={`group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${

          isActive

            ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.6)]"

            : "text-slate-300 hover:bg-white/10 hover:text-violet-400"

        }`}

      >

        <Icon size={22} />

        <span

          className={`pointer-events-none absolute whitespace-nowrap rounded-full bg-black/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 ${

            position.right

              ? "right-16 group-hover:-translate-x-1"

              : "left-16 group-hover:translate-x-1"

          }`}

        >

          {link.label}

        </span>

      </button>

    );

  }



  return (

    <NavLink

      to={link.to}

      onClick={onNavigate}

      className={({ isActive }) =>

        `group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${

          isActive || (link.to === "/#contacto" && pathname === "/" && hash === "#contacto")

            ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.6)]"

            : "text-slate-300 hover:bg-white/10 hover:text-violet-400"

        }`

      }

    >

      <Icon size={22} />

      <span

        className={`pointer-events-none absolute whitespace-nowrap rounded-full bg-black/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 ${

          position.right

            ? "right-16 group-hover:-translate-x-1"

            : "left-16 group-hover:translate-x-1"

        }`}

      >

        {link.label}

      </span>

    </NavLink>

  );

}



function CloseButton({ position, onClose }) {

  return (

    <button

      onClick={onClose}

      className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-violet-400"

    >

      <X size={22} />

      <span

        className={`pointer-events-none absolute whitespace-nowrap rounded-full bg-black/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 ${

          position.right

            ? "right-16 group-hover:-translate-x-1"

            : "left-16 group-hover:translate-x-1"

        }`}

      >

        Cerrar

      </span>

    </button>

  );

}



export default function Header() {

  const { pathname } = useLocation();

  const isHome = pathname === "/";

  const isWorks = pathname === "/trabajos";



  if (!isHome && !isWorks) {

    return <SiteNav />;

  }



  return (

    <>

      <SiteNav logoOnly={isWorks} />

      {isWorks ? (

        <div className="pointer-events-none fixed inset-x-0 top-1 z-50">

          <div className="mx-auto flex max-w-7xl justify-end px-6">

            <div className="pointer-events-auto">

              <FloatingHeader contentAligned />

            </div>

          </div>

        </div>

      ) : (

        <div className={isHome ? "md:hidden" : ""}>

          <FloatingHeader />

        </div>

      )}

    </>

  );

}

