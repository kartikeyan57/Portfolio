import { motion } from 'framer-motion'
import { education } from '../data/profile'

export default function Education() {
  return (
    <section className="relative mx-auto max-w-screen-2xl px-6 py-28 sm:px-10 lg:px-14 xl:px-20">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-label text-xs text-signal"
      >
        EDUCATION
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative mt-8 overflow-hidden rounded-[28px] border-2 border-dashed border-volt/30 bg-white p-10 sm:p-14"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]" aria-hidden>
          <defs>
            <pattern id="edu-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" fill="none" stroke="#2563EB" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#edu-grid)" />
        </svg>

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-mono text-[11px] tracking-widest text-volt">B.TECH — ELECTRONICS & COMPUTER ENGINEERING</span>
            <h3 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{education.institution}</h3>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-volt/10 font-display text-xs font-semibold text-volt">
            BU
          </div>
        </div>
      </motion.div>
    </section>
  )
}
