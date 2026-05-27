import { Link } from "react-router-dom";
import { Lightbulb } from "lucide-react"
import { Send } from "lucide-react"



export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050510] text-white px-6">

      <div className="relative max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-2 align-middle">
        <div className="flex flex-col gap-4 justify-center items-center text-left">
            
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-600 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white w-fit">
            <span className="text-violet-400 text-sm">&lt;/&gt;</span>

            WEB Developer
          </p>

          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Álvaro Cutillas López
          </h1>

          <div className="flex flex-row items-center gap-10">
            <Link
              to="/trabajos"
              className="cta"
            >
              <span>Ver trabajos</span>

              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </Link>

            <Link
              to="/contacto"
              className="btn-to-contact"
            >
              <span>
                Contactar
                <Send size={18} />
                
              </span>
            </Link>
          </div>
        </div>

        <div className="relative min-h-[500px] flex items-center justify-center">
          <div className="absolute w-80 h-80 rounded-full blur-3xl" />

          <div className="relative w-72 h-90 rounded-3xl  bg-zinc-950 border border-white/10 flex items-center justify-center">
            <span className="text-slate-400">
              <img src="public/fotopresentacion.jpg" alt="Developer" className="w-full h-full object-cover rounded-3xl"/>
            </span>
          </div>

          <div className="absolute top-46 left-4 bg-black/50 border border-white/10 rounded-2xl p-5 backdrop-blur">
            <p className="text-sm text-slate-400 mb-3">App.jsx</p>
            <pre className="text-sm text-violet-300">
              {`const Developer = () => {
                return <Hero />
              }`}
            </pre>
          </div>

          <div className="absolute bottom-40 right-0 bg-black/50 border border-white/10 rounded-2xl p-5 backdrop-blur">
            <p className="text-sm text-slate-400 mb-3">Hero.jsx</p>
            <pre className="text-sm text-violet-300">
              {'export default function Experience ( )'}
            </pre>
          </div>
         

          <div className="absolute top-28 right-4 bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur">
            <p className="text-violet-400 text-3xl font-bold">&lt;/&gt;</p>
            <p className="text-sm text-slate-300 mt-3">
              Limpio. Rápido.
              <br />
              Escalable.
            </p>
          </div>

          <div className="absolute bottom-58 left-2 bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur">
          <Lightbulb className="text-violet-400 text-3xl w-8 h-8 mx-auto mb-1" />
            <p className="text-sm text-slate-300 mt-3">
              Tu idea 
              <br />
              en producción.

            </p>
          </div>
        </div>
      </div>

    </section>
  );
}