import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'
import { profile } from '../data/profile'

export default function ResumeCTA() {
  return (
    <section className="relative mx-auto max-w-screen-xl px-6 pb-28 text-center sm:px-10 lg:px-14 xl:px-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[36px] border-2 border-volt/25 bg-gradient-to-br from-white via-skyline/[0.14] to-volt/[0.08] p-12 shadow-xl shadow-volt/10 sm:p-16"
      >
        {/* Corner glowing atmospheric lights */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-45 blur-2xl"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-35 blur-2xl"
          style={{ background: 'radial-gradient(circle, #FF8A3D 0%, transparent 70%)' }}
        />

        <div className="relative z-10">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/15 px-3.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            <span className="font-mono text-xs font-semibold text-signal uppercase tracking-wider">
              RESUME
            </span>
          </div>

          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Want the full blueprint?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/70">
            See my complete engineering experience, lab research, education, and technical project portfolio.
          </p>

          <div className="mt-8 flex justify-center">
            <MagneticButton
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              cursorLabel="view"
            >
              VIEW FULL RESUME <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
