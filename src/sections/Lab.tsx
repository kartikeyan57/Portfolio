import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Zap } from 'lucide-react'
import { labComponents } from '../data/profile'
import { useFinePointer } from '../hooks/useFinePointer'

const ASSEMBLY_ORDER = ['pcb', 'esp32', 'imu', 'sensor', 'servo', 'oled', 'motor', 'battery']

export default function Lab() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [assembling, setAssembling] = useState(false)
  const [poweredCount, setPoweredCount] = useState(0)
  const isFine = useFinePointer()
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const active = hovered
  const activeComponent = labComponents.find((c) => c.id === active)
  const byId = Object.fromEntries(labComponents.map((c) => [c.id, c]))

  const runAssembly = () => {
    timeoutRef.current.forEach(clearTimeout)
    timeoutRef.current = []
    setAssembling(true)
    setPoweredCount(0)
    ASSEMBLY_ORDER.forEach((_, i) => {
      const t = setTimeout(() => setPoweredCount(i + 1), 400 * (i + 1))
      timeoutRef.current.push(t)
    })
    const done = setTimeout(() => setAssembling(false), 400 * (ASSEMBLY_ORDER.length + 2))
    timeoutRef.current.push(done)
  }

  useEffect(() => () => timeoutRef.current.forEach(clearTimeout), [])

  const isPowered = (id: string) => assembling && poweredCount >= ASSEMBLY_ORDER.indexOf(id) + 1

  const seenPairs = new Set<string>()
  const edges: { from: string; to: string }[] = []
  labComponents.forEach((c) => {
    c.connectsTo.forEach((t) => {
      const key = [c.id, t].sort().join('-')
      if (!seenPairs.has(key)) {
        seenPairs.add(key)
        edges.push({ from: c.id, to: t })
      }
    })
  })

  return (
    <section id="lab" className="relative mx-auto max-w-screen-2xl px-6 py-28 sm:px-10 lg:px-14 xl:px-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label text-xs text-signal"
          >
            THE LAB
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
          >
            An engineering workstation
          </motion.h2>
          <p className="mt-3 max-w-md text-sm text-ink/55">
            {isFine ? 'Hover a component to see what it does.' : 'Tap a component to see what it does.'}
          </p>
        </div>

        <button
          onClick={runAssembly}
          data-cursor="button"
          className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-mono text-[11px] tracking-wide text-paper transition-colors hover:bg-volt focus-ring"
        >
          <Play size={13} /> RUN ASSEMBLY SEQUENCE
        </button>
      </div>

      <div className="relative mt-12 h-[440px] overflow-hidden rounded-[28px] border border-paper/10 bg-ink sm:h-[480px] lg:h-[540px]">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {edges.map((e) => {
            const from = byId[e.from].position
            const to = byId[e.to].position
            const isHighlighted = active === e.from || active === e.to
            const bothPowered = isPowered(e.from) && isPowered(e.to)
            return (
              <motion.line
                key={`${e.from}-${e.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={isHighlighted || bothPowered ? 1 : 0.4}
                stroke={bothPowered ? '#FFD84D' : isHighlighted ? '#8DD8FF' : '#3a4560'}
                animate={{ opacity: isHighlighted || bothPowered ? 0.9 : 0.35 }}
                transition={{ duration: 0.3 }}
              />
            )
          })}
        </svg>

        {labComponents.map((c) => {
          const powered = isPowered(c.id)
          const isActive = active === c.id
          return (
            <motion.button
              key={c.id}
              data-cursor="explore"
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered((h) => (h === c.id ? null : h))}
              onClick={() => setHovered((h) => (h === c.id ? null : c.id))}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 focus-ring"
              style={{ left: `${c.position.x}%`, top: `${c.position.y}%` }}
              animate={{ scale: isActive ? 1.15 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.div
                animate={{
                  boxShadow: powered
                    ? '0 0 0 6px rgba(255,216,77,0.15), 0 0 24px rgba(255,216,77,0.4)'
                    : isActive
                      ? '0 0 0 6px rgba(141,216,255,0.15)'
                      : '0 0 0 0px rgba(0,0,0,0)',
                  borderColor: powered ? '#FFD84D' : isActive ? '#8DD8FF' : 'rgba(248,250,252,0.15)',
                }}
                className="flex h-14 w-14 items-center justify-center rounded-xl border bg-white/5 backdrop-blur-sm sm:h-16 sm:w-16"
              >
                <Zap size={16} className={powered ? 'text-beacon' : 'text-paper/70'} />
              </motion.div>
              <span className="font-mono text-[9px] tracking-widest text-paper/70">{c.label}</span>
            </motion.button>
          )
        })}

        <AnimatePresence>
          {activeComponent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-5 left-5 right-5 rounded-2xl border border-paper/10 bg-paper/95 p-4 backdrop-blur-md sm:left-5 sm:right-auto sm:w-64"
            >
              <p className="font-display text-sm font-bold text-ink">{activeComponent.label}</p>
              <div className="mt-1.5 flex flex-col gap-0.5">
                {activeComponent.detail.map((d) => (
                  <span key={d} className="font-mono text-[10px] tracking-wide text-ink/55">
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {assembling && poweredCount >= ASSEMBLY_ORDER.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute right-5 top-5 rounded-full bg-beacon px-4 py-2 font-mono text-[10px] tracking-wide text-ink"
            >
              SYSTEM ONLINE
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
