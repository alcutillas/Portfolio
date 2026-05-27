

import {
  Code2,
  Atom,
  Database,
  GitBranch,
  PencilRuler,
  Server,
  Cloud,
  MonitorCog,
  Container,
} from "lucide-react"

const technologies = [
  { name: "HTML", image: "/technologies/html.webp" },
  { name: "CSS", image: "/technologies/css.webp" },
  { name: "JavaScript", image: "/technologies/js.webp" },
  { name: "TypeScript", image: "/technologies/ts.webp" },
  { name: "React", image: "/technologies/react.webp" },
  { name: "PHP", image: "/technologies/php.webp" },
  { name: "Tailwind", image: "/technologies/tailwind.webp" },
  { name: "SQL", image: "/technologies/sql.webp" },
  { name: "Git & GitHub",image: "/technologies/github.webp" },
  { name: "Figma", image: "/technologies/figma.webp" },
  { name: "jQuery", image: "/technologies/jquery.webp" },
  { name: "Bootstrap", image: "/technologies/bootstrap.webp" },
  { name: "Java", image: "/technologies/java.webp" },
  { name: "Docker", image: "/technologies/docker.webp" },
  { name: "Nginx", image: "/technologies/nginx.webp" },
  { name: "AWS", image: "/technologies/aws.webp" },
  { name: "WordPress", image: "/technologies/wp.webp" },
  { name: "Windows Server", image: "/technologies/winserver.webp" },
]

export default function Technologies() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-6 py-24 text-slate-950">
      
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-7xl flex-col justify-center gap-12">

            <h2 className="text-violet-600">
              Stack tecnológico
            </h2>


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7">
          {technologies.map((tech) => (
            <article
              key={tech.name}
              className="mx-auto group flex w-40 h-36 flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-violet-400 "
            >
              <img
                src={tech.image}
                alt={tech.name}
                className="h-12 w-12 object-contain transition-all duration-300 group-hover:scale-110"
                />

              <h3 className="text-center text-xs font-black uppercase tracking-[0.18em] text-slate-900">
                {tech.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}