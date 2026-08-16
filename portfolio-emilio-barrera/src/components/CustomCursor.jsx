import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [cursorTone, setCursorTone] = useState('dark')
    const frameRef = useRef(null)
    const pointerRef = useRef({ x: 0, y: 0 })
    const dotX = useMotionValue(0)
    const dotY = useMotionValue(0)
    const ringX = useSpring(dotX, { damping: 25, stiffness: 300, mass: 0.5 })
    const ringY = useSpring(dotY, { damping: 25, stiffness: 300, mass: 0.5 })

    useEffect(() => {
        const hasFinePointer = window.matchMedia('(pointer: fine)').matches
        if (!hasFinePointer) return

        function handleMove(e) {
            dotX.set(e.clientX)
            dotY.set(e.clientY)
            setIsVisible(true)

            pointerRef.current = { x: e.clientX, y: e.clientY }
            if (frameRef.current) return

            frameRef.current = window.requestAnimationFrame(() => {
                const { x, y } = pointerRef.current
                const section = document.elementFromPoint(x, y)?.closest('[data-cursor]')
                const nextTone = section?.getAttribute('data-cursor') === 'dark' ? 'light' : 'dark'
                setCursorTone((currentTone) => currentTone === nextTone ? currentTone : nextTone)
                frameRef.current = null
            })
        }
        function handleLeave() {
            setIsVisible(false)
        }

        window.addEventListener('mousemove', handleMove)
        document.body.addEventListener('mouseleave', handleLeave)
        return () => {
            window.removeEventListener('mousemove', handleMove)
            document.body.removeEventListener('mouseleave', handleLeave)
            if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
        }
    }, [dotX, dotY])

    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
        return null
    }

    return (
        <div
            className="cursor-layer"
            style={{
                opacity: isVisible ? 1 : 0,
                '--cursor-color': cursorTone === 'light' ? '#F8FAFC' : '#121010',
            }}
        >
            <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} />
            <motion.div className="cursor-ring" style={{ x: ringX, y: ringY }} />
        </div>
    )
}
