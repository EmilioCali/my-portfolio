import { useState, useRef } from 'react'
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

// Fallback para íconos con color blanco/negro puro (invisibles o planos en hover)
function displayColor(color) {
  if (!color || color === '#FFFFFF' || color === '#000000') return '#94A3B8'
  return color
}

function TechCard({ tech, onHoverChange }) {
  const [hovered, setHovered] = useState(false)
  const IconComponent = iconMap[tech.icon]
  const brandColor = displayColor(tech.color)

  if (!IconComponent) {
    console.warn(`[TechMarquee] Ícono no encontrado: "${tech.icon}" para "${tech.name}"`)
  }

  function handleEnter() {
    setHovered(true)
    onHoverChange(true)
  }
  function handleLeave() {
    setHovered(false)
    onHoverChange(false)
  }

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="flex items-center gap-3 shrink-0 px-10 md:px-14 py-8"
    >
      {IconComponent && (
        <IconComponent
          className="text-3xl md:text-4xl transition-colors duration-300"
          style={{ color: hovered ? brandColor : 'rgba(255,255,255,0.4)' }}
        />
      )}
      <span
        className="text-xl md:text-2xl font-medium whitespace-nowrap transition-colors duration-300"
        style={{ color: hovered ? '#FFFFFF' : 'rgba(255,255,255,0.4)' }}
      >
        {tech.name}
      </span>
    </div>
  )
}

export default function TechMarquee() {
  const [paused, setPaused] = useState(false)
  const hoverCount = useRef(0)
  const items = [...technologies, ...technologies]

  // Cuenta cuántas cards tienen el mouse encima ahora mismo, para pausar
  // solo mientras al menos una lo tenga (evita parpadeos al pasar entre cards)
  function handleHoverChange(isHovering) {
    hoverCount.current += isHovering ? 1 : -1
    setPaused(hoverCount.current > 0)
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="marquee-track flex w-max"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {items.map((tech, i) => (
          <TechCard
            key={`${tech.name}-${i}`}
            tech={tech}
            onHoverChange={handleHoverChange}
          />
        ))}
      </div>

      {/* Fades laterales para que el corte del marquee no se vea abrupto */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  )
}