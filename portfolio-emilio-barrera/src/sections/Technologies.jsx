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
    <section data-cursor="dark" className="bg-bg-dark text-text-dark py-24 md:py-32 overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col gap-3 mb-16"
        >
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
    </section>
  )
}