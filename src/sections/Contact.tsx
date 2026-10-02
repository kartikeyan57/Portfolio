import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { profile } from '../data/profile'
import MagneticButton from '../components/MagneticButton'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32 sm:px-10 lg:px-14 xl:px-20">
      {/* Multi-layered atmospheric ambient lights */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFD84D 0%, #FF8A3D30 50%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-10 -z-10 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #0F766E 0%, transparent 70%)' }}
      />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/15 px-3.5 py-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-xs font-semibold text-signal uppercase tracking-wider">
            GET IN TOUCH // COLLABORATE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-3 font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl"
        >
          Let's build{' '}
          <span className="bg-gradient-to-r from-signal via-volt to-circuit bg-clip-text text-transparent">
            something exceptional
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="mx-auto mt-5 max-w-lg text-lg text-ink/70"
        >
          Whether it's robotics, electronics, IoT or an interesting engineering challenge — I'm always eager to
          collaborate, build, and explore.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <MagneticButton href={`mailto:${profile.email}`}>
            <Mail size={16} /> EMAIL ME
          </MagneticButton>
          <MagneticButton href={profile.linkedin} variant="outline" target="_blank" rel="noreferrer">
            <Linkedin size={16} /> LINKEDIN
          </MagneticButton>
          <MagneticButton href={profile.github} variant="outline" target="_blank" rel="noreferrer">
            <Github size={16} /> GITHUB
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
