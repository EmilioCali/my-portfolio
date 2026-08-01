import { useEffect, useRef } from 'react'

export default function HeroBackground() {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: -9999, y: -9999 })

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrame
        let cssWidth = 0
        let cssHeight = 0
        let cols, rows

        const GAP = 46
        const LINE_COLOR = '15, 23, 42'
        const NODE_COLOR = '15, 23, 42'
        const GLOW_COLOR = '34, 23, 166'
        const GLOW_RADIUS = 90 // antes 160 -> ahora más corto, como pediste

        function resize(entry) {
            // Tomamos el tamaño REAL renderizado del contenedor, no offsetWidth
            // (offsetWidth puede leerse antes de que el layout termine en pantallas grandes)
            const rect = entry
                ? entry.contentRect
                : canvas.getBoundingClientRect()

            cssWidth = Math.round(rect.width)
            cssHeight = Math.round(rect.height)

            // Limitamos el DPR a 2 -> evita buffers gigantes en monitores externos
            // con devicePixelRatio mal reportado (causa raíz del bloque azul)
            const dpr = Math.min(window.devicePixelRatio || 1, 2)

            canvas.width = cssWidth * dpr
            canvas.height = cssHeight * dpr
            canvas.style.width = `${cssWidth}px`
            canvas.style.height = `${cssHeight}px`

            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.scale(dpr, dpr)

            cols = Math.ceil(cssWidth / GAP) + 2
            rows = Math.ceil(cssHeight / GAP) + 2
        }

        function handleMouseMove(e) {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }
        function handleMouseLeave() {
            mouseRef.current = { x: -9999, y: -9999 }
        }

        function nodePos(i, j, offset) {
            const wave = Math.sin(offset + i * 0.4 + j * 0.3)
            return { x: i * GAP, y: j * GAP + wave * 16, wave }
        }

        function draw(offset) {
            ctx.clearRect(0, 0, cssWidth, cssHeight)
            const { x: mx, y: my } = mouseRef.current

            const nodes = []
            for (let i = 0; i < cols; i++) {
                nodes[i] = []
                for (let j = 0; j < rows; j++) {
                    nodes[i][j] = nodePos(i, j, offset)
                }
            }

            function proximityBoost(p) {
                const d = Math.hypot(p.x - mx, p.y - my)
                if (d > GLOW_RADIUS) return 0
                return 1 - d / GLOW_RADIUS
            }

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const p = nodes[i][j]
                    const boost = proximityBoost(p)
                    const opacity = 0.06 + Math.abs(p.wave) * 0.05 + boost * 0.35
                    const color = boost > 0.05 ? GLOW_COLOR : LINE_COLOR

                    if (i < cols - 1) {
                        const right = nodes[i + 1][j]
                        ctx.strokeStyle = `rgba(${color}, ${opacity})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(right.x, right.y)
                        ctx.stroke()
                    }
                    if (j < rows - 1) {
                        const down = nodes[i][j + 1]
                        ctx.strokeStyle = `rgba(${color}, ${opacity})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(down.x, down.y)
                        ctx.stroke()
                    }
                }
            }

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const p = nodes[i][j]
                    const boost = proximityBoost(p)
                    const opacity = 0.12 + Math.abs(p.wave) * 0.18 + boost * 0.6
                    const color = boost > 0.05 ? GLOW_COLOR : NODE_COLOR
                    const radius = 1.3 + boost * 1.5

                    ctx.beginPath()
                    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(${color}, ${opacity})`
                    ctx.fill()
                }
            }

            if (mx > -1000) {
                const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, GLOW_RADIUS)
                gradient.addColorStop(0, `rgba(${GLOW_COLOR}, 0.08)`)
                gradient.addColorStop(1, `rgba(${GLOW_COLOR}, 0)`)
                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(mx, my, GLOW_RADIUS, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        let offset = 0
        function animate() {
            offset += 0.01
            draw(offset)
            animationFrame = requestAnimationFrame(animate)
        }

        // ResizeObserver en vez de window.resize -> mide el contenedor real,
        // no la ventana, y se dispara con el tamaño correcto ya estabilizado
        const observer = new ResizeObserver(([entry]) => resize(entry))
        observer.observe(canvas.parentElement)

        resize()
        animate()
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            cancelAnimationFrame(animationFrame)
            observer.disconnect()
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden bg-bg-light">
            <canvas ref={canvasRef} className="block" />
        </div>
    )
}