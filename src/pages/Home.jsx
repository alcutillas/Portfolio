import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import FeaturedProjects from "../components/FeaturedProjects";
import Technologies from "../components/Technologies";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <main
      id="page-scroll"
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#050510] scrollbar-hide"
    >
      <section className="h-screen shrink-0 snap-start snap-always">
        <Hero />
      </section>

      <section className="h-screen shrink-0 snap-start snap-always">
        <FeaturedProjects />
      </section>

      <section className="h-screen shrink-0 snap-start snap-always">
        <Technologies />
      </section>

      <section className="min-h-screen shrink-0 snap-start snap-always">
        <About />
      </section>

      <section className="min-h-screen shrink-0 snap-start snap-always">
        <Contact />
      </section>
    </main>
  );
}
