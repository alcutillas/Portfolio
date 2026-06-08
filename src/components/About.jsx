import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="sobre-mi" className="flex h-screen flex-col justify-center border-t border-white/5 bg-[#070612] px-6 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative overflow-hidden rounded-2xl flex justify-center items-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/fotopresentacion.jpg"
            alt="Álvaro Cutillas López"
            className="relative aspect-[4/5] h-110 object-cover object-top rounded-2xl"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 text-left"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-500">
            Sobre mí
          </p>
          <h2 className="text-3xl font-black uppercase leading-tight tracking-tight md:text-4xl">
            Mentalidad de desarrollador
          </h2>
          <p className="text-base leading-relaxed text-slate-400">
            Soy Álvaro Cutillas López, desarrollador web enfocado en crear interfaces
            modernas y backends sólidos. Me gusta entender el producto de punta a punta:
            desde la experiencia de usuario hasta la base de datos que la sostiene.
          </p>
          <p className="text-base leading-relaxed text-slate-400">
            Busco código claro, diseño cuidado y soluciones que escalen sin complicar el
            mantenimiento. Cada proyecto es una oportunidad para aprender y entregar algo
            que funcione bien en producción.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div className="text-left">
              <p className="text-4xl font-black text-white md:text-5xl">10+</p>
              <p className="mt-1 text-sm text-slate-500">Proyectos realizados</p>
            </div>
            <div className="text-left">
              <p className="text-4xl font-black text-white md:text-5xl">2+</p>
              <p className="mt-1 text-sm text-slate-500">Años desarrollando</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
