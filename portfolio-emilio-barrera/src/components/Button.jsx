import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const variants = {
    primary: 'bg-text-light text-bg-light hover:bg-text-light/85',
    secondary: 'bg-white border border-text-light/15 text-text-light hover:border-text-light/30',
}

export default function Button({
    children,
    variant = 'primary',
    as = 'button',
    showArrow = false,
    className = '',
    ...props
}) {
    const Component = motion[as]

    return (
        <Component
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`
        inline-flex items-center gap-2
        px-6 py-3.5 rounded-full
        text-sm font-medium
        transition-colors duration-200
        ${variants[variant]}
        ${className}
      `}
            {...props}
        >
            {children}
            {showArrow && <ArrowRight size={16} />}
        </Component>
    )
}