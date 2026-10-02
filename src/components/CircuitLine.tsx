import { motion } from 'framer-motion'

type Props = {
  d: string
  viewBox?: string
  className?: string
  color?: string
  delay?: number
  duration?: number
  nodes?: { cx: number; cy: number; r?: number; color?: string }[]
}

/**
 * A self-drawing circuit trace. Pass an SVG path `d` and optional node
 * dots that appear once the trace finishes drawing.
 */
export default function CircuitLine({
  d,
  viewBox = '0 0 400 200',
  className = '',
  color = '#2563EB',
  delay = 0,
  duration = 1.4,
  nodes = [],
}: Props) {
  return (
    <svg viewBox={viewBox} className={className} fill="none" aria-hidden>
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.3 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration, delay, ease: 'easeInOut' }}
      />
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={n.r ?? 4}
          fill={n.color ?? color}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: delay + duration * 0.7 + i * 0.1, duration: 0.4, ease: 'backOut' }}
        />
      ))}
    </svg>
  )
}
