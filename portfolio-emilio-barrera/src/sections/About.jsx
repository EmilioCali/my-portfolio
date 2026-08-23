import { motion } from 'framer-motion'
import Container from '../components/Container'
import AboutTextRotator from '../components/AboutTextRotator'
import mePhoto from '../assets/me.jpeg'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
}

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

export default function About() {
    return (
        <section data-cursor="dark" className="overflow-hidden bg-black pt-16 pb-20 text-white sm:pt-20 sm:pb-32 md:pt-24 md:pb-48">
            <Container className="max-w-screen-2xl">

                {/* Título general de la sección, centrado */}
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    className="mb-12 text-center text-[clamp(2.4rem,11vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white uppercase sm:mb-16 md:mb-24"
                >
                    Desarrollador
                    <br />
                    <span className="inline-block bg-white text-black px-3 -skew-x-6 italic">
                        Full Stack
                    </span>
                </motion.h2>

                {/* Texto pegado al borde izquierdo, foto pegada al borde derecho */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-16 md:gap-10">

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={container}
                        className="flex w-full min-w-0 flex-col gap-8 text-center md:max-w-lg md:text-left lg:max-w-2xl shrink-0"
                    >
                        <motion.div variants={fadeUp}>
                            <AboutTextRotator />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={fadeUp}
                        className="relative w-full md:w-auto shrink-0"
                    >
                        <div className="relative aspect-[4/5] max-w-sm md:max-w-[32rem] mx-auto md:mx-0 rounded-2xl overflow-hidden bg-bg-dark-secondary">
                            <img
                                src={mePhoto}
                                alt="Emilio Barrera"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                </div>
            </Container>
        </section>
    )
}
