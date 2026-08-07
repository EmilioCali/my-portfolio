import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)

    // el punto central sigue al mouse de forma instantánea
    const dotX = useMotionValue(0)
    const dotY = useMotionValue(0)

    // el círculo sigue con un pequeño retraso elástico (efecto "trailing")
    const ringX = useSpring(dotX, { damping: 25, stiffness: 300, mass: 0.5 })
    const ringY = useSpring(dotY, { damping: 25, stiffness: 300, mass: 0.5 })

    useEffect(() => {
        // Solo activar en dispositivos con puntero fino (mouse), no en touch
        const hasFinePointer = window.matchMedia('(pointer: fine)').matches
        if (!hasFinePointer) return

        function handleMove(e) {
            dotX.set(e.clientX)
            dotY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }
        function handleLeave() {
            setIsVisible(false)
        }

        window.addEventListener('mousemove', handleMove)
        document.body.addEventListener('mouseleave', handleLeave)

        return () => {
            window.removeEventListener('mousemove', handleMove)
            document.body.removeEventListener('mouseleave', handleLeave)
        }
    }, [dotX, dotY, isVisible])

    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
        return null
    }

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}
        >
            {/* Punto central */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white"
                style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
            />
            {/* Círculo exterior */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50"
                style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
            />
        </div>
    )
}