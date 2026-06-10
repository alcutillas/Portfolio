import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="sobre-mi" className="section-mobile-safe flex h-full flex-col justify-center items-center overflow-y-auto overscroll-y-contain border-t border-white/5 bg-[#070612] px-6 text-white lg:justify-center lg:overflow-hidden lg:py-0">
      <div className="mx-auto grid w-full max-w-7xl items-center justify-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative mx-auto flex w-full max-w-[220px] items-center justify-center overflow-hidden rounded-2xl sm:max-w-[260px] lg:mx-0 lg:max-w-none"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/fotopresentacion.jpg"
            alt="Álvaro Cutillas López"
            className="relative aspect-[4/5] w-full object-cover object-top rounded-2xl lg:h-110 lg:w-auto"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 text-left sm:gap-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-500 sm:tracking-[0.35em]">
            Sobre mí
          </p>
          <h2 className="text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl md:text-4xl">
            Mentalidad de desarrollador
          </h2>
          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
            Soy Álvaro Cutillas López, desarrollador web enfocado en crear interfaces
            modernas y backends sólidos. Me gusta entender el producto de punta a punta:
            desde la experiencia de usuario hasta la base de datos que la sostiene.
          </p>
          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
            Busco código claro, diseño cuidado y soluciones que escalen sin complicar el
            mantenimiento. Cada proyecto es una oportunidad para aprender y entregar algo
            que funcione bien en producción.
          </p>

          
        </motion.div>
      </div>
    </section>
  );
}
