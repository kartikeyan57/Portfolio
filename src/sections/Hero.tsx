import { motion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'
import HeroVisual from '../components/HeroVisual'
import PlayMeButton from '../components/PlayMeButton'
import { profile } from '../data/profile'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      {/* Multi-layered colorful atmospheric ambient glowing orbs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/3 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-45 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8DD8FF 0%, #2563EB35 45%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute top-10 right-10 -z-10 h-[480px] w-[480px] rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FF8A3D 0%, #FFD84D25 50%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 -z-10 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #0F766E 0%, transparent 70%)' }}
      />

      <div className="mx-auto grid max-w-screen-2xl gap-10 px-6 sm:px-10 lg:grid-cols-[1.1fr,0.9fr] lg:gap-12 lg:px-14 xl:px-20">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col justify-center">
          <motion.div variants={item}>
            <PlayMeButton />
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-[13vw] font-extrabold leading-[0.92] tracking-tighter text-ink sm:text-7xl lg:text-8xl"
          >
            KARTIKEYAN
            <br />
            SHARMA
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md font-display text-lg font-semibold text-ink sm:text-xl">
            <span className="text-volt">Electronics & Computer Engineering</span>
            <br />
            <span className="text-base font-normal text-ink/70">Robotics · IoT · Hardware · Automation</span>
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-lg text-base leading-relaxed text-ink/70">
            {profile.bio}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="#projects" cursorLabel="view">
              EXPLORE MY WORK <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              cursorLabel="view"
            >
              VIEW RESUME <ArrowUpRight size={16} />
            </MagneticButton>
          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  )
}
