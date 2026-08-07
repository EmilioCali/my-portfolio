import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const statements = [
    'Bienvenido a este espacio donde comparto mi trayectoria, mi forma de pensar y mi camino dentro del mundo del desarrollo de software. Mi nombre es Emilio Barrera Cali, soy estudiante de Informática con especialización en Desarrollo de Software y me apasiona crear soluciones digitales que generen un impacto real. Mi enfoque se basa en identificar problemas, analizar procesos y transformarlos mediante tecnología, buscando siempre automatizar tareas repetitivas, mejorar la eficiencia y construir herramientas que aporten valor a las personas y empresas.',

    'Fuera del código encuentro en el deporte una de mis mayores fuentes de disciplina y crecimiento personal. Correr se ha convertido en una práctica que me recuerda la importancia de la constancia, la paciencia y la mejora continua. Cada entrenamiento representa un proceso de aprendizaje similar al desarrollo de software: pequeños avances diarios que, con dedicación y perseverancia, terminan convirtiéndose en grandes resultados.',

    'Soy un desarrollador Full Stack apasionado por construir aplicaciones modernas combinando una arquitectura sólida, buenas prácticas de desarrollo y experiencias de usuario intuitivas. Disfruto transformar ideas en productos digitales funcionales y escalables, cuidando tanto la estructura interna del software como los detalles visuales que permiten crear aplicaciones profesionales, eficientes y agradables para quienes las utilizan.',

    'Actualmente soy Co-Fundador de Environment IA junto a mi socio Edgar Catalán, una startup enfocada en el desarrollo de software, automatización de procesos e integración de inteligencia artificial en soluciones reales para empresas guatemaltecas. Nuestro objetivo es aprovechar la tecnología para optimizar procesos, resolver necesidades específicas y demostrar cómo las herramientas digitales pueden convertirse en aliados estratégicos para el crecimiento de los negocios.',
]

const AUTOPLAY_MS = 5500

const arrowClass =
    'hidden md:flex absolute top-1 w-9 h-9 rounded-full border border-text-dark-secondary/25 items-center justify-center text-text-dark-secondary hover:border-primary hover:text-primary transition-colors duration-200'

export default function AboutTextRotator() {
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const isPaused = useRef(false)

    const go = useCallback((i, dir = 1) => {
        setDirection(dir)
        setIndex((i + statements.length) % statements.length)
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isPaused.current) go(index + 1, 1)
        }, AUTOPLAY_MS)
        return () => clearInterval(timer)
    }, [index, go])

    const variants = {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 16 : -16, y: 8 }),
        center: { opacity: 1, x: 0, y: 0 },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -16 : 16, y: -8 }),
    }

    return (
        <div className="flex flex-col gap-6">
            <div
                onMouseEnter={() => (isPaused.current = true)}
                onMouseLeave={() => (isPaused.current = false)}
                className="relative min-h-[160px] md:min-h-[130px] flex items-start px-0 md:px-14"
            >
                <button
                    onClick={() => go(index - 1, -1)}
                    className={`${arrowClass} left-0`}
                    aria-label="Anterior"
                >
                    <ChevronLeft size={16} />
                </button>

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.p
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto md:mx-0 text-justify"
                        style={{
                            background: 'linear-gradient(90deg, #94A3B8 0%, #F8FAFC 60%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {statements[index]}
                    </motion.p>
                </AnimatePresence>

                <button
                    onClick={() => go(index + 1, 1)}
                    className={`${arrowClass} right-0`}
                    aria-label="Siguiente"
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="flex justify-center md:justify-start gap-2">
                {statements.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => go(i, i > index ? 1 : -1)}
                        className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-primary' : 'w-1 bg-text-dark-secondary/40'
                            }`}
                        aria-label={`Ver punto ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}