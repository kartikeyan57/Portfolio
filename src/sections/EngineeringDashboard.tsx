import { motion } from 'framer-motion'
import { dashboard } from '../data/profile'

const accentStyles = {
  volt: {
    text: 'text-volt',
    dot: 'bg-volt shadow-[0_0_8px_#2563EB]',
    bar: 'from-volt via-skyline to-volt',
    bg: 'bg-gradient-to-b from-volt/[0.07] via-skyline/[0.03] to-white',
    badge: 'bg-volt/12 text-volt border border-volt/25',
    border: 'border-volt/25 hover:border-volt/70 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.22)]',
  },
  signal: {
    text: 'text-signal',
    dot: 'bg-signal shadow-[0_0_8px_#FF8A3D]',
    bar: 'from-signal via-beacon to-signal',
    bg: 'bg-gradient-to-b from-signal/[0.08] via-beacon/[0.03] to-white',
    badge: 'bg-signal/12 text-signal border border-signal/25',
    border: 'border-signal/25 hover:border-signal/70 hover:shadow-[0_20px_40px_-10px_rgba(255,138,61,0.22)]',
  },
  circuit: {
    text: 'text-circuit',
    dot: 'bg-circuit shadow-[0_0_8px_#0F766E]',
    bar: 'from-circuit via-teal-300 to-circuit',
    bg: 'bg-gradient-to-b from-circuit/[0.08] via-teal-50/50 to-white',
    badge: 'bg-circuit/12 text-circuit border border-circuit/25',
    border: 'border-circuit/25 hover:border-circuit/70 hover:shadow-[0_20px_40px_-10px_rgba(15,118,110,0.22)]',
  },
  beacon: {
    text: 'text-[#9a7800]',
    dot: 'bg-beacon shadow-[0_0_8px_#FFD84D]',
    bar: 'from-beacon via-amber-400 to-beacon',
    bg: 'bg-gradient-to-b from-beacon/[0.14] via-amber-50/40 to-white',
    badge: 'bg-beacon/25 text-[#854d0e] border border-beacon/40',
    border: 'border-beacon/35 hover:border-beacon/70 hover:shadow-[0_20px_40px_-10px_rgba(255,216,77,0.25)]',
  },
}

export default function EngineeringDashboard() {
  // Quadruple items to guarantee a seamless -50% loop across all screen widths
  const conveyorItems = [...dashboard, ...dashboard, ...dashboard, ...dashboard]

  return (
    <section className="relative overflow-hidden pt-4 pb-16 sm:pt-6 sm:pb-24">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-12 left-1/4 -z-10 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8DD8FF 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 right-1/4 -z-10 h-80 w-80 rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FF8A3D 0%, transparent 70%)' }}
      />

      {/* Conveyor Belt Track Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right gradient fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-paper via-paper/90 to-transparent sm:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-paper via-paper/90 to-transparent sm:w-36" />

        {/* Continuous moving conveyor ribbon */}
        <div className="flex w-max gap-6 animate-conveyor hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {conveyorItems.map((item, index) => {
            const acc = accentStyles[item.accent || 'volt']
            const moduleNum = String((index % dashboard.length) + 1).padStart(2, '0')

            return (
              <motion.div
                key={`${item.id}-${index}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                data-cursor="explore"
                className={`group relative flex h-[215px] w-[340px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border ${acc.border} ${acc.bg} p-6 shadow-sm transition-all duration-300 sm:h-[240px] sm:w-[430px] sm:p-7 md:w-[470px]`}
              >
                {/* Top luminous accent bar */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${acc.bar}`} />

                {/* Top: Category label + module index + tag */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold tracking-wider ${acc.text}`}>
                      {moduleNum}
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-widest text-ink/50 uppercase">
                      // {item.label}
                    </span>
                  </div>
                  {item.tag && (
                    <span className={`rounded-full px-3 py-1 font-mono text-[10px] font-semibold tracking-wide ${acc.badge}`}>
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Center: BIG, bold headline & clear description */}
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-volt sm:text-3xl lg:text-[32px]">
                    {item.value}
                  </h3>
                  {item.subvalue && (
                    <p className="mt-2 text-sm leading-relaxed text-ink/70 sm:text-[15px]">
                      {item.subvalue}
                    </p>
                  )}
                </div>

                {/* Bottom: Mechanical conveyor telemetry footer */}
                <div className="flex items-center justify-between border-t border-ink/8 pt-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-ink/60">
                    <span className={`h-2 w-2 rounded-full ${acc.dot}`} />
                    <span className="font-semibold">TELEMETRY ACTIVE</span>
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-semibold ${acc.text}`}>
                    SPEC // 0{index % dashboard.length + 1}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
