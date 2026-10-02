import { motion } from 'framer-motion'
import { profile, interests } from '../data/profile'
import CircuitLine from '../components/CircuitLine'

const lines = [
  `${profile.name} is a B.Tech Electronics & Computer Engineering student at Bennett University.`,
  'He learns by building — putting sensors, motors, boards and code together into physical systems that work.',
  'That means treating every project as a small lab: wire something up, break it, understand why, rebuild it better.',
]

const interestColorMap: Record<string, string> = {
  Robotics: 'bg-volt/10 text-volt border-volt/30 hover:bg-volt hover:text-white',
  Electronics: 'bg-signal/10 text-signal border-signal/30 hover:bg-signal hover:text-white',
  IoT: 'bg-circuit/10 text-circuit border-circuit/30 hover:bg-circuit hover:text-white',
  Drones: 'bg-skyline/30 text-[#0284c7] border-skyline/50 hover:bg-skyline hover:text-ink',
  'Motors & Controllers': 'bg-beacon/30 text-[#854d0e] border-beacon/50 hover:bg-beacon hover:text-ink',
  'PCB Design': 'bg-coral/15 text-[#be123c] border-coral/35 hover:bg-coral hover:text-white',
  Automation: 'bg-purple-500/10 text-purple-600 border-purple-500/30 hover:bg-purple-600 hover:text-white',
  'Hardware Integration': 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30 hover:bg-emerald-600 hover:text-white',
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-screen-2xl px-6 py-28 sm:px-10 lg:px-14 xl:px-20">
      {/* Ambient warm circuit glow */}
      <div
        className="pointer-events-none absolute top-20 right-10 -z-10 h-96 w-96 rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFD84D 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 -z-10 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8DD8FF 0%, transparent 70%)' }}
      />

      <div className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:gap-16 xl:gap-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label text-xs text-signal"
          >
            ABOUT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            Who's behind
            <br />
            the circuits?
          </motion.h2>

          <div className="relative mt-8 h-16 w-40">
            <CircuitLine
              d="M4 10 H80 V50 H136"
              viewBox="0 0 160 60"
              nodes={[{ cx: 4, cy: 10, color: '#FFD84D' }, { cx: 136, cy: 50, color: '#FF8A3D' }]}
            />
          </div>
        </div>

        <div>
          <div className="space-y-5">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="max-w-2xl text-lg leading-relaxed text-ink/75"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {interests.map((interest, i) => {
              const colorCls = interestColorMap[interest] || 'bg-volt/10 text-volt border-volt/30'
              return (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.42 + i * 0.05, type: 'spring', stiffness: 250, damping: 18 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className={`rounded-full border px-4 py-2 font-mono text-[11px] font-semibold tracking-wide transition-all shadow-2xs ${colorCls}`}
                >
                  {interest}
                </motion.span>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
