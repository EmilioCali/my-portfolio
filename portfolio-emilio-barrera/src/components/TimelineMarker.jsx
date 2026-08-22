import { motion } from 'framer-motion'
import { Sparkle } from 'lucide-react'

export default function TimelineMarker({ color, isCurrent = false }) {
    return (
        <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
            {isCurrent && (
                <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: color, opacity: 0.25 }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}

            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                style={{ color }}
            >
                <Sparkle size={18} fill="currentColor" strokeWidth={1} />
            </motion.div>
        </div>
    )
}