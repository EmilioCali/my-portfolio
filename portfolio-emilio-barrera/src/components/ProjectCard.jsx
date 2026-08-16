import { motion } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import CodeCard from './CodeCard'

const ease = [0.16, 1, 0.3, 1]

export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35, ease }}
      className="group relative flex min-h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7"
    >
      <span className="mb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-text-dark-secondary">
        {String(index + 1).padStart(2, '0')} / {project.category}
      </span>
      <CodeCard fileName={project.fileName} codeLines={project.codeLines} variant={project.codeVariant} />
      <div className="mt-7 pr-10">
        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{project.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-text-dark-secondary">{project.description}</p>
      </div>
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Abrir repositorio de ${project.title} en GitHub`}
        className="absolute bottom-6 right-6 rounded-full border border-white/20 p-2 text-xl text-white transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-black"
      >
        <SiGithub />
      </a>
    </motion.article>
  )
}
