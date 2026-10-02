import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  label: string
  sublabel?: string
  position: { x: number; y: number } // percentage within container
  depth: number // 0 (far) – 1 (near): controls parallax strength
  pointer: { x: number; y: number } // normalized -1..1
  accent: string
  driftDelay?: number
  size?: 'sm' | 'md' | 'lg'
  enableParallax: boolean
}

export default function FloatingObject({
  icon: Icon,
  label,
  sublabel,
  position,
  depth,
  pointer,
  accent,
  driftDelay = 0,
  size = 'md',
  enableParallax,
}: Props) {
  const strength = 26
  const parX = enableParallax ? pointer.x * depth * strength : 0
  const parY = enableParallax ? pointer.y * depth * strength : 0

  const dims = size === 'lg' ? 'h-16 w-16' : size === 'sm' ? 'h-11 w-11' : 'h-14 w-14'
  const iconSize = size === 'lg' ? 26 : size === 'sm' ? 16 : 20

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <motion.div
        animate={{ x: parX, y: parY }}
        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 0.6 }}
      >
        <motion.div
          className="animate-drift"
          style={{ animationDelay: `${driftDelay}s` }}
          whileHover={{ scale: 1.12, rotate: 3 }}
          data-cursor="explore"
        >
          <div className="group relative flex flex-col items-center">
            <div
              className={`${dims} flex items-center justify-center rounded-2xl border border-ink/10 bg-paper/90 backdrop-blur-sm transition-shadow`}
              style={{ boxShadow: `0 0 0 1px ${accent}22 inset, 0 8px 24px rgba(23,32,51,0.08)` }}
            >
              <Icon size={iconSize} color={accent} strokeWidth={1.75} />
            </div>
            <div className="pointer-events-none absolute top-full mt-2 flex flex-col items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="whitespace-nowrap rounded-md bg-ink px-2 py-0.5 font-mono text-[9px] tracking-wider text-paper">
                {label}
                {sublabel ? ` · ${sublabel}` : ''}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
