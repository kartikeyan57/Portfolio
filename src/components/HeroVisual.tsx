import { useRef, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Cpu, CircuitBoard, Fan, Radar, Bot, Waves, type LucideIcon } from 'lucide-react'
import FloatingObject from './FloatingObject'
import { useFinePointer } from '../hooks/useFinePointer'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type HeroObject = {
  id: string
  icon: LucideIcon
  label: string
  sublabel?: string
  position: { x: number; y: number }
  depth: number
  accent: string
  delay: number
  size: 'sm' | 'md' | 'lg'
}

const objects: HeroObject[] = [
  { id: 'pcb', icon: CircuitBoard, label: 'CUSTOM PCB', position: { x: 16, y: 64 }, depth: 0.5, accent: '#2563EB', delay: 0, size: 'md' },
  { id: 'esp32', icon: Cpu, label: 'ESP32', sublabel: 'DUAL-CORE', position: { x: 50, y: 44 }, depth: 0.9, accent: '#172033', delay: 0.4, size: 'lg' },
  { id: 'motor', icon: Fan, label: 'PMSM MOTOR', position: { x: 20, y: 20 }, depth: 0.4, accent: '#FF8A3D', delay: 0.8, size: 'sm' },
  { id: 'drone', icon: Radar, label: 'DRONE NAV', position: { x: 80, y: 22 }, depth: 0.65, accent: '#8DD8FF', delay: 1.2, size: 'md' },
  { id: 'sensor', icon: Waves, label: 'ULTRASONIC', position: { x: 82, y: 64 }, depth: 0.55, accent: '#0F766E', delay: 0.2, size: 'sm' },
  { id: 'robot', icon: Bot, label: 'ROBOT UNIT', position: { x: 50, y: 84 }, depth: 0.35, accent: '#FB7185', delay: 1.6, size: 'md' },
]

const connections: [string, string][] = [
  ['pcb', 'esp32'],
  ['esp32', 'motor'],
  ['esp32', 'drone'],
  ['esp32', 'sensor'],
  ['esp32', 'robot'],
]

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const isFine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const enableParallax = isFine && !reduced

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enableParallax || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
    setPointer({ x: nx, y: ny })
  }

  const byId: Record<string, HeroObject> = Object.fromEntries(objects.map((o) => [o.id, o]))

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPointer({ x: 0, y: 0 })}
      className="relative h-[420px] w-full select-none sm:h-[480px] lg:h-[560px]"
    >
      {/* connecting traces */}
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {connections.map(([a, b], i) => {
          const from = byId[a].position
          const to = byId[b].position
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#2563EB"
              strokeOpacity={0.35}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.4 + i * 0.15, ease: 'easeInOut' }}
            />
          )
        })}
        {connections.map(([a, b], i) => {
          const from = byId[a].position
          const to = byId[b].position
          return (
            <motion.circle
              key={`pulse-${a}-${b}`}
              r={1.2}
              fill="#FFD84D"
              initial={{ opacity: 0 }}
              animate={{
                cx: [from.x, to.x],
                cy: [from.y, to.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 2.5 + i,
                delay: 1.8 + i * 0.5,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </svg>

      {objects.map((o) => (
        <FloatingObject
          key={o.id}
          icon={o.icon}
          label={o.label}
          sublabel={o.sublabel}
          position={o.position}
          depth={o.depth}
          pointer={pointer}
          accent={o.accent}
          driftDelay={o.delay}
          size={o.size}
          enableParallax={enableParallax}
        />
      ))}
    </div>
  )
}
