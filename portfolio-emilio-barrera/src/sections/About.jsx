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
        <section data-cursor="dark" className="bg-bg-dark text-text-dark py-32 md:py-48">
            <Container className="max-w-screen-2xl">
                <div className="grid md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] gap-16 md:gap-x-48 lg:gap-x-56 items-start">

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={container}
                        className="flex flex-col gap-12 text-center md:text-left pt-4 md:pt-8"
                    >
                        <motion.h2
                            variants={fadeUp}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white uppercase"
                        >
                            Desarrollador Junior{' '}
                            <span className="inline-block bg-white text-bg-dark px-3 -skew-x-6 italic">
                                Full Stack
                            </span>
                        </motion.h2>

                        <motion.div variants={fadeUp}>
                            <AboutTextRotator />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={fadeUp}
                        className="relative md:justify-self-end w-full"
                    >
                        <div className="relative aspect-[4/5] max-w-sm md:max-w-[30rem] md:ml-auto rounded-2xl overflow-hidden bg-bg-dark-secondary">
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
