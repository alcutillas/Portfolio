import Hero from "../components/Hero"
import Technologies from "../components/Technologies"


import { motion } from "framer-motion"

export default function Home() {
  return (
    <main
     id="page-scroll"
     className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
    >

      <section className="h-screen snap-start">
        <motion.section
        className="h-screen snap-start"
        initial={{ opacity: 1, scale: 1, y: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1]
        }}
        >
        <Hero />
        </motion.section>
      </section>

      <motion.section
        className="h-screen snap-start"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1]
        }}
        viewport={{ once: false, amount: 0.40 }}
        >
        <Technologies />
        </motion.section>

    </main>
  )
}


/*
export default function Home() {
  return (
    <main
     id="page-scroll"
     className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
    >
        <Hero />
        <Technologies />
    </main>
  )
}
  */