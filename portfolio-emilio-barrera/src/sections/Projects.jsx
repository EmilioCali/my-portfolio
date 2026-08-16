import { motion } from 'framer-motion'
import Container from '../components/Container'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Projects() {
  return (
    <section id="proyectos" data-cursor="dark" className="-mt-10 bg-bg-dark pb-24 pt-16 text-text-dark md:-mt-16 md:pb-32 md:pt-20">
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} className="mb-14 max-w-3xl">
          <span className="flex items-center gap-2 font-mono text-sm text-text-dark-secondary">
            <span className="h-px w-6 bg-text-dark-secondary" />
            Trabajo seleccionado
          </span>
          <h2 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight uppercase md:text-6xl">
            Proyectos que{' '}
            <span className="inline-block -skew-x-6 bg-white px-3 italic text-bg-dark">resuelven</span>
          </h2>
        </motion.div>

        <div className="lg:relative lg:left-1/2 lg:w-screen lg:-translate-x-1/2 lg:px-6 xl:px-10">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.div key={project.id} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: fadeUp.hidden, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: index * 0.1 } } }}>
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
