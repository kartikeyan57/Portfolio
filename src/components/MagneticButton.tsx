import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  href: string
  variant?: 'solid' | 'outline'
  cursorLabel?: 'button' | 'view' | 'explore'
  className?: string
  download?: boolean
  target?: string
  rel?: string
}

export default function MagneticButton({
  children,
  href,
  variant = 'solid',
  cursorLabel = 'button',
  className = '',
  download,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    setOffset({ x: relX * 0.25, y: relY * 0.35 })
  }

  const reset = () => setOffset({ x: 0, y: 0 })

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const id = Date.now()
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600)
  }

  const base =
    'relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold tracking-wide transition-colors focus-ring overflow-hidden'
  const styles =
    variant === 'solid'
      ? 'bg-ink text-paper hover:bg-volt'
      : 'border-2 border-ink text-ink hover:border-volt hover:text-volt'

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
      className="inline-block"
      data-cursor={cursorLabel}
    >
      <a
        href={href}
        onClick={handleClick}
        download={download}
        target={target}
        rel={rel}
        className={`${base} ${styles} ${className}`}
      >
        {children}
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute rounded-full bg-paper/30"
            style={{ left: r.x, top: r.y }}
            initial={{ width: 0, height: 0, opacity: 0.6, x: 0, y: 0 }}
            animate={{ width: 160, height: 160, opacity: 0, x: -80, y: -80 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </a>
    </motion.div>
  )
}
