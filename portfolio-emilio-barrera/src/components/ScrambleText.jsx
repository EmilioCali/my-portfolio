import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const CHARS = '0123456789'

export default function ScrambleText({ text, className = '' }) {
    const [display, setDisplay] = useState(text)
    const hasPlayed = useRef(false)

    function scramble() {
        if (hasPlayed.current) return
        hasPlayed.current = true

        let frame = 0
        const totalFrames = 18
        const interval = setInterval(() => {
            frame++
            const revealCount = Math.floor((frame / totalFrames) * text.length)

            const next = text
                .split('')
                .map((char, i) => {
                    if (i < revealCount) return char
                    return CHARS[Math.floor(Math.random() * CHARS.length)]
                })
                .join('')

            setDisplay(next)

            if (frame >= totalFrames) {
                clearInterval(interval)
                setDisplay(text)
            }
        }, 40)
    }

    return (
        <motion.span
            onViewportEnter={scramble}
            viewport={{ once: true, amount: 0.6 }}
            className={`font-mono tabular-nums ${className}`}
        >
            {display}
        </motion.span>
    )
}