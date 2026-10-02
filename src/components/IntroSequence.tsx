import { motion } from 'framer-motion'

type Props = {
  onDone: () => void
}

/**
 * Short cinematic boot sequence: dots appear, a trace draws itself,
 * a label ticks past, then the name reveals and the curtain lifts.
 * Skipped entirely when prefers-reduced-motion is set (handled by parent).
 */
export default function IntroSequence({ onDone }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-paper"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onAnimationComplete={() => {}}
    >
      <div className="relative flex flex-col items-center gap-6">
        <svg width="220" height="60" viewBox="0 0 220 60" fill="none" aria-hidden>
          <motion.circle
            cx="10"
            cy="30"
            r="4"
            fill="#FFD84D"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0 }}
          />
          <motion.path
            d="M14 30H206"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="210"
            cy="30"
            r="4"
            fill="#FF8A3D"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.6 }}
          />
        </svg>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.7, delay: 0.35, times: [0, 0.3, 0.7, 1] }}
          className="section-label absolute top-[68px] text-[11px] text-ink/50"
        >
          BOOTING ENGINEERING LAB…
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.75 }}
          className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
        >
          KARTIKEYAN SHARMA
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25, duration: 0.01 }}
        onAnimationComplete={onDone}
      />
    </motion.div>
  )
}
