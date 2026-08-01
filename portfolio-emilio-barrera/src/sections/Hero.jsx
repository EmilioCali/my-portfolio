import { motion } from 'framer-motion'
import Container from '../components/Container'
import Button from '../components/Button'
import HeroBackground from '../components/HeroBackground'

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
}

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center text-text-light">
            <HeroBackground />

            <Container>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 flex flex-col items-start text-left gap-6 max-w-3xl"
                >
                    <motion.span
                        variants={itemVariants}
                        className="flex items-center gap-2 text-sm text-text-light-secondary font-mono"
                    >
                        <span className="w-6 h-px bg-text-light-secondary"/>
                        Full Stack Developer
                    </motion.span>

                    <motion.h1
                        variants={itemVariants}
                        className="text-hero md:text-hero-lg font-bold tracking-tight leading-[1.02] font-sans"
                    >
                        Emilio Sebastián
                        <br />
                            Barrera Cali
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-text-light-secondary max-w-xl font-light"
                    >
                        Desarrollo y dispuesto aprender constantemente nuevas tecnologías para crear experiencias web únicas y funcionales.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex gap-4 mt-4">
                        <Button variant="primary" as="a" href="#proyectos">
                            Ver proyectos
                        </Button>
                        <Button variant="secondary" as="a" href="#contacto">
                            Contacto
                        </Button>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    )
}