import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { skillCategories } from '../data/profile'
import { skillPlaycards, type SkillPlaycard } from '../data/skillsData'
import SkillPlaycardModal from '../components/SkillPlaycardModal'

const hubColors = ['#2563EB', '#FF8A3D', '#0F766E']

const hubConfig: Record<
  string,
  {
    subtitle: string
    gradient: string
  }
> = {
  Electronics: {
    subtitle: 'CIRCUITS & MCU',
    gradient: 'radial-gradient(circle at 35% 30%, #3b82f6 0%, #2563eb 65%, #1d4ed8 100%)',
  },
  Software: {
    subtitle: 'CODE & EDA',
    gradient: 'radial-gradient(circle at 35% 30%, #fb923c 0%, #ff8a3d 65%, #ea580c 100%)',
  },
  Engineering: {
    subtitle: 'CAD & HARDWARE',
    gradient: 'radial-gradient(circle at 35% 30%, #14b8a6 0%, #0f766e 65%, #115e59 100%)',
  },
}

function Constellation({
  title,
  skills,
  color,
  delay,
  onSelectTopic,
}: {
  title: string
  skills: string[]
  color: string
  delay: number
  onSelectTopic: (topicName: string) => void
}) {
  const radius = 36
  const config = hubConfig[title] || {
    subtitle: 'SYSTEMS',
    gradient: `radial-gradient(circle at 35% 30%, ${color} 0%, ${color} 100%)`,
  }

  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[380px] sm:h-[420px] sm:max-w-[420px]">
      {/* Ambient glow behind constellation hub */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 m-auto h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />

      <svg className="absolute inset-0 h-full w-full overflow-visible pointer-events-none" viewBox="0 0 100 100" aria-hidden>
        {skills.map((_, i) => {
          const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2
          const x = 50 + radius * Math.cos(angle)
          const y = 50 + radius * Math.sin(angle)
          return (
            <motion.line
              key={i}
              x1={50}
              y1={50}
              x2={x}
              y2={y}
              stroke={color}
              strokeWidth={1.25}
              strokeOpacity={0.45}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: delay + i * 0.06 }}
            />
          )
        })}
      </svg>

      {/* ─── CENTRAL CIRCLE HUB ─── */}
      <motion.button
        onClick={() => onSelectTopic(title)}
        data-cursor="view"
        aria-label={`Inspect ${title} playcard`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group absolute inset-0 m-auto flex h-[106px] w-[106px] sm:h-[118px] sm:w-[118px] flex-col items-center justify-center rounded-full border-2 border-white/50 text-center focus-ring transition-all select-none px-2"
        style={{
          background: config.gradient,
          boxShadow: `0 0 0 8px ${color}20, 0 20px 38px -6px ${color}55, inset 0 2px 3px rgba(255,255,255,0.45)`,
        }}
      >
        <span className="font-display text-xs sm:text-[14px] font-black tracking-wider text-white uppercase drop-shadow-sm leading-tight">
          {title}
        </span>
        
        <span className="mt-1 font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-widest text-white/80 uppercase">
          {config.subtitle}
        </span>
      </motion.button>

      {/* ─── SATELLITE SKILL NODES ─── */}
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2
        const x = 50 + radius * Math.cos(angle)
        const y = 50 + radius * Math.sin(angle)
        return (
          <div
            key={skill}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ scale: 1.15, zIndex: 20 }}
              whileTap={{ scale: 0.94 }}
              transition={{ delay: delay + 0.15 + i * 0.06, type: 'spring', stiffness: 260, damping: 18 }}
            >
              <button
                onClick={() => onSelectTopic(skill)}
                data-cursor="view"
                aria-label={`Inspect ${skill} playcard`}
                className="animate-drift flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-semibold transition-all shadow-xs backdrop-blur-xs hover:shadow-lg focus-ring cursor-pointer"
                style={{
                  animationDelay: `${i * 0.4}s`,
                  borderColor: `${color}45`,
                  backgroundColor: `${color}14`,
                  color: color,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                <span>{skill}</span>
              </button>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

export default function Skills() {
  const [activeCard, setActiveCard] = useState<SkillPlaycard | null>(null)

  const handleSelectTopic = (topicName: string) => {
    const found = skillPlaycards[topicName]
    if (found) {
      setActiveCard(found)
    } else {
      const matched = Object.values(skillPlaycards).find(
        (c) => c.name.toLowerCase() === topicName.toLowerCase(),
      )
      if (matched) setActiveCard(matched)
    }
  }

  return (
    <section id="skills" className="relative mx-auto max-w-screen-2xl px-6 py-28 sm:px-10 lg:px-14 xl:px-20">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-10 left-1/4 -z-10 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-10 right-1/4 -z-10 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FF8A3D 0%, transparent 70%)' }}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label text-xs text-signal"
          >
            SKILLS & TOOLING
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Skill constellation
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/80 px-3.5 py-1 text-[11px] font-mono font-medium text-ink/70 backdrop-blur-sm shadow-xs"
        >
          <Sparkles size={13} className="text-volt" />
          <span>CLICK ANY TOPIC TO INSPECT PLAYCARD</span>
        </motion.div>
      </div>

      <div className="mt-16 grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <Constellation
            key={cat.title}
            title={cat.title}
            skills={cat.skills}
            color={hubColors[i % hubColors.length]}
            delay={i * 0.15}
            onSelectTopic={handleSelectTopic}
          />
        ))}
      </div>

      {/* ─── SKILL PLAYCARD MODAL ─── */}
      <SkillPlaycardModal
        card={activeCard}
        onClose={() => setActiveCard(null)}
        onSelectCard={setActiveCard}
      />
    </section>
  )
}
