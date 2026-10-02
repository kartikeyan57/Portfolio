import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/profile'

const statusStyles: Record<Project['status'], string> = {
  'IN DEVELOPMENT': 'bg-beacon/25 text-[#854d0e] border border-beacon/40',
  PROTOTYPE: 'bg-skyline/30 text-[#0369a1] border border-skyline/40',
  COMPLETED: 'bg-circuit/15 text-circuit border border-circuit/30',
  'RESEARCH / EXPERIMENTATION': 'bg-coral/20 text-[#be123c] border border-coral/35',
}

const categoryThemes: Record<string, { bar: string; badge: string; glow: string }> = {
  ROBOTICS: {
    bar: 'from-volt via-skyline to-volt',
    badge: 'bg-volt/10 text-volt border border-volt/25',
    glow: 'hover:border-volt/50 hover:shadow-[0_16px_36px_-10px_rgba(37,99,235,0.18)]',
  },
  IOT: {
    bar: 'from-circuit via-teal-300 to-circuit',
    badge: 'bg-circuit/10 text-circuit border border-circuit/25',
    glow: 'hover:border-circuit/50 hover:shadow-[0_16px_36px_-10px_rgba(15,118,110,0.18)]',
  },
  DRONES: {
    bar: 'from-signal via-beacon to-signal',
    badge: 'bg-signal/10 text-signal border border-signal/25',
    glow: 'hover:border-signal/50 hover:shadow-[0_16px_36px_-10px_rgba(255,138,61,0.18)]',
  },
  ELECTRONICS: {
    bar: 'from-beacon via-amber-400 to-beacon',
    badge: 'bg-beacon/25 text-[#854d0e] border border-beacon/35',
    glow: 'hover:border-beacon/60 hover:shadow-[0_16px_36px_-10px_rgba(255,216,77,0.22)]',
  },
  RESEARCH: {
    bar: 'from-coral via-rose-300 to-coral',
    badge: 'bg-coral/15 text-[#be123c] border border-coral/30',
    glow: 'hover:border-coral/50 hover:shadow-[0_16px_36px_-10px_rgba(251,113,133,0.18)]',
  },
}

export default function ProjectCard({
  project,
  onSelect,
}: {
  project: Project
  onSelect: () => void
}) {
  const primaryCat = project.categories[0] || 'ROBOTICS'
  const theme = categoryThemes[primaryCat] || categoryThemes.ROBOTICS

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
      data-cursor="view"
      className={`group relative flex h-[225px] sm:h-[235px] flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-white p-6 sm:p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 ${theme.glow} focus-ring cursor-pointer select-none`}
    >
      {/* Top luminous accent gradient bar */}
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.bar}`} />

      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-volt">
            {project.name}
          </h3>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide ${statusStyles[project.status]}`}>
            {project.status}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase ${theme.badge}`}>
            {primaryCat}
          </span>
        </div>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink/65">
          {project.tagline}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-ink/8 pt-3.5 font-mono text-[11px] font-bold text-volt">
        <span>VIEW PROJECT DETAILS</span>
        <ArrowUpRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </div>
  )
}
