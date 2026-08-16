import {
  SiJavascript, SiSharp, SiTypescript, SiPython, SiReact, SiTailwindcss, SiHtml5, SiCss,
  SiVite, SiNodedotjs, SiFastify, SiDotnet, SiSpringboot, SiOpenapiinitiative, SiMongodb,
  SiPostgresql, SiMysql, SiMongoose, SiDocker, SiVercel, SiRender, SiGit, SiGithub,
  SiPostman, SiPnpm, SiCursor,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { Bot } from 'lucide-react'
import { technologies } from '../data/technologies'

const iconMap = {
  SiJavascript, SiSharp, SiTypescript, SiPython, SiReact, SiTailwindcss, SiHtml5, SiCss,
  SiVite, SiNodedotjs, SiFastify, SiDotnet, SiSpringboot, SiOpenapiinitiative, SiMongodb,
  SiPostgresql, SiMysql, SiMongoose, SiDocker, SiVercel, SiRender, SiGit, SiGithub,
  SiPostman, SiPnpm, SiCursor,
  FaJava,
  SiOpenai: Bot,
}

function TechCard({ tech }) {
  const IconComponent = iconMap[tech.icon]

  if (!IconComponent) {
    console.warn(`[TechMarquee] Ícono no encontrado: "${tech.icon}" para "${tech.name}"`)
  }

  return (
    <div className="flex items-center gap-3 shrink-0 px-8 md:px-10 py-6 group">
      {IconComponent && (
        <IconComponent
          className="text-2xl md:text-3xl text-white/40 group-hover:text-white transition-colors duration-300"
        />
      )}
      <span className="text-lg md:text-xl font-medium text-white/40 group-hover:text-white whitespace-nowrap transition-colors duration-300">
        {tech.name}
      </span>
    </div>
  )
}

export default function TechMarquee() {
  const items = [...technologies, ...technologies]

  return (
    <div className="relative overflow-hidden">
      <div className="marquee-track flex w-max">
        {items.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>

      {/* Fades laterales para que el corte del marquee no se vea abrupto */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-bg-dark to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-bg-dark to-transparent pointer-events-none z-10" />
    </div>
  )
}
