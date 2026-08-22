import { motion } from 'framer-motion'
import Container from '../components/Container'
import TechMarquee from '../components/TechMarquee'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Technologies() {
  return (
    <section data-cursor="dark" className="bg-black text-white pt-8 pb-4 md:pt-10 md:pb-8 overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col items-center gap-2 mb-6"
        >
          <span className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-white">
            Background tecnológico
          </span>
        </motion.div>
      </Container>

      {/* Full-bleed: el marquee sale del ancho del Container */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <TechMarquee />
      </motion.div>

      {/* Línea divisoria, marca el cierre de la sección */}
      <div className="mt-8 md:mt-10 border-t border-white/15" />
    </section>
  )
}