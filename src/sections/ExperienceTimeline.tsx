import { motion } from 'framer-motion'
import { Cog, Radio } from 'lucide-react'
import { experience } from '../data/profile'

const icons = { orange: Cog, blue: Radio } as const
const accents = {
  orange: {
    text: 'text-signal',
    bg: 'bg-signal',
    ring: 'ring-signal/30',
    card: 'border-l-4 border-l-signal bg-gradient-to-r from-signal/[0.04] to-white border border-ink/10',
    badge: 'bg-signal/12 text-[#c2410c] border border-signal/25 font-semibold',
  },
  blue: {
    text: 'text-volt',
    bg: 'bg-volt',
    ring: 'ring-volt/30',
    card: 'border-l-4 border-l-volt bg-gradient-to-r from-volt/[0.04] to-white border border-ink/10',
    badge: 'bg-volt/12 text-volt border border-volt/25 font-semibold',
  },
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative mx-auto max-w-screen-2xl px-6 py-28 sm:px-10 lg:px-14 xl:px-20">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-10 -z-10 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 -z-10 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FF8A3D 0%, transparent 70%)' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-label text-xs text-signal"
      >
        EXPERIENCE
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
      >
        Where I have been
      </motion.h2>

      <div className="relative mt-16 pl-8 sm:pl-10">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
          className="absolute left-0 top-1 h-full w-0.5 bg-gradient-to-b from-signal via-beacon to-volt"
        />

        <div className="flex flex-col gap-16">
          {experience.map((entry, i) => {
            const Icon = icons[entry.accent]
            const a = accents[entry.accent]
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-8 top-1.5 -translate-x-1/2 sm:-left-10">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 300, damping: 16 }}
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${a.bg} ring-4 ${a.ring}`}
                  >
                    <Icon size={13} className="text-paper" />
                  </motion.span>
                </div>

                <div className={`rounded-3xl p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${a.card}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-bold text-ink">{entry.org}</h3>
                    {entry.period && <span className="font-mono text-[11px] font-semibold text-ink/50">{entry.period}</span>}
                  </div>
                  <p className={`mt-1 font-mono text-xs font-bold tracking-wide ${a.text}`}>{entry.role.toUpperCase()}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.topics.map((topic, ti) => (
                      <motion.span
                        key={topic}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + ti * 0.035 }}
                        className={`rounded-xl px-3 py-1.5 font-mono text-xs ${a.badge}`}
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
