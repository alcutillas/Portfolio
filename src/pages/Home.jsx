import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import Hero from "../components/Hero";

import FeaturedProjects from "../components/FeaturedProjects";

import Technologies from "../components/Technologies";

import About from "../components/About";

import Contact from "../components/Contact";

import useIsMobileNav from "../hooks/useIsMobileNav";

import {
  HOME_SECTIONS,
  scrollToHash,
  setActiveHomeSectionId,
} from "../utils/sectionScroll";



function sectionIndexFromHash(hash) {

  const id = hash.replace("#", "");

  const index = HOME_SECTIONS.indexOf(id);

  return index >= 0 ? index : 0;

}



export default function Home() {

  const { hash } = useLocation();

  const isMobileNav = useIsMobileNav();

  const [mobileIndex, setMobileIndex] = useState(() => sectionIndexFromHash(hash));



  useEffect(() => {

    const onNav = (event) => {

      const id = event.detail?.id ?? "";

      const index = HOME_SECTIONS.indexOf(id);

      if (index >= 0) setMobileIndex(index);

    };



    window.addEventListener("home-section-nav", onNav);

    return () => window.removeEventListener("home-section-nav", onNav);

  }, []);



  useEffect(() => {

    if (!hash) {

      setActiveHomeSectionId("");

      if (isMobileNav) setMobileIndex(0);

      return;

    }



    const index = sectionIndexFromHash(hash);

    const sectionId = hash.replace("#", "");

    if (HOME_SECTIONS.includes(sectionId)) {

      setActiveHomeSectionId(sectionId);

    }

    if (isMobileNav) {

      setMobileIndex(index);

      return;

    }



    const timer = setTimeout(() => scrollToHash(hash.replace("#", "")), 150);

    return () => clearTimeout(timer);

  }, [hash, isMobileNav]);



  const sections = (

    <>

      <section className="h-dvh shrink-0 snap-start snap-always lg:h-screen">

        <Hero />

      </section>



      <section className="h-dvh shrink-0 snap-start snap-always lg:h-screen">

        <FeaturedProjects />

      </section>



      <section className="h-dvh shrink-0 snap-start snap-always lg:h-screen">

        <Technologies />

      </section>



      <section className="h-dvh shrink-0 snap-start snap-always lg:h-screen">

        <About />

      </section>



      <section className="h-dvh shrink-0 snap-start snap-always lg:h-screen">

        <Contact />

      </section>

    </>

  );



  return (

    <main

      id="page-scroll"

      className={`h-dvh bg-[#050510] scrollbar-hide ${

        isMobileNav

          ? "overflow-hidden touch-none"

          : "overflow-y-scroll overscroll-y-contain snap-y snap-mandatory scroll-smooth lg:h-screen"

      }`}

    >

      {isMobileNav ? (

        <div

          className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"

          style={{ transform: `translateY(-${mobileIndex * 100}dvh)` }}

        >

          {sections}

        </div>

      ) : (

        sections

      )}

    </main>

  );

}

