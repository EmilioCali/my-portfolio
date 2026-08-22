import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Container from '../components/Container'
import TimelineMarker from '../components/TimelineMarker'
import ScrambleText from '../components/ScrambleText'
import { timeline } from '../data/timeline'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
}

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

// Un color fijo por período, tomado de tu paleta de marca
const PERIOD_COLORS = ['#6E5699', '#2217A6', '#F59E0B']
const VISIBLE_COUNT = 2

function YearColumn({ period, color }) {
    const [expanded, setExpanded] = useState(false)
    const visibleItems = expanded ? period.items : period.items.slice(0, VISIBLE_COUNT)
    const hasMore = period.items.length > VISIBLE_COUNT

    return (
        <motion.div variants={fadeUp} className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">
                    <ScrambleText text={period.year} />
                </h3>
                {period.isCurrent && (
                    <span className="text-xs font-mono uppercase tracking-widest" style={{ color }}>
                        Presente
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-8">
                {visibleItems.map((item) => (
                    <div key={item.title} className="flex flex-col gap-1.5">
                        <h4 className="text-base font-semibold text-white">{item.title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                        <span className="text-xs font-mono text-white/30 mt-1">{item.date}</span>
                    </div>
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={() => setExpanded((v) => !v)}
                    className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 self-start"
                >
                    {expanded ? 'Ver menos' : 'Ver más'}
                    <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <ChevronDown size={16} />
                    </motion.span>
                </button>
            )}
        </motion.div>
    )
}

export default function Experience() {
    return (
        <section data-cursor="dark" className="bg-black text-white py-24 md:py-32">
            <Container className="max-w-screen-2xl">

                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    className="text-5xl md:text-6xl font-bold tracking-tight mb-20 md:mb-28"
                >
                    Experiencia
                </motion.h2>

                {/* Línea horizontal con marcadores por año */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={container}
                    className="relative grid grid-cols-3 gap-6 md:gap-10 mb-14"
                >
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/15" />

                    {timeline.map((period, i) => (
                        <div key={period.year} className="relative flex justify-start">
                            <div className="relative z-10 bg-black pr-4">
                                <TimelineMarker color={PERIOD_COLORS[i]} isCurrent={period.isCurrent} />
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Contenido por año, 3 columnas alineadas */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={container}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 items-start"
                >
                    {timeline.map((period, i) => (
                        <YearColumn key={period.year} period={period} color={PERIOD_COLORS[i]} />
                    ))}
                </motion.div>

            </Container>
        </section>
    )
}