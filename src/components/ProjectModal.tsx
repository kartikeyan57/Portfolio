import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, X, Cpu, CheckCircle2, Sliders } from 'lucide-react'
import type { Project } from '../data/profile'
import { projects } from '../data/profile'

const statusStyles: Record<Project['status'], string> = {
  'IN DEVELOPMENT': 'bg-beacon/20 text-[#8a6d00]',
  PROTOTYPE: 'bg-skyline/25 text-[#0a4a75]',
  COMPLETED: 'bg-circuit/15 text-circuit',
  'RESEARCH / EXPERIMENTATION': 'bg-coral/15 text-[#b53a52]',
}

export default function ProjectModal({
  project,
  onClose,
  onSelectProject,
}: {
  project: Project
  onClose: () => void
  onSelectProject?: (p: Project) => void
}) {
  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      className="fixed inset-0 z-[1000] flex flex-col overflow-y-auto bg-paper text-ink"
    >
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-ink/8 bg-paper/90 px-6 py-4 backdrop-blur-md sm:px-10 lg:px-16">
        <button
          onClick={onClose}
          data-cursor="button"
          className="group flex items-center gap-2 font-mono text-xs font-semibold tracking-wide text-ink/70 transition-colors hover:text-volt focus-ring"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>BACK TO ALL PROJECTS</span>
        </button>

        <div className="flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 font-mono text-[10px] tracking-wide ${statusStyles[project.status]}`}>
            {project.status}
          </span>
          <button
            onClick={onClose}
            aria-label="Close project view"
            data-cursor="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:bg-ink hover:text-paper focus-ring"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main full-page content */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 sm:px-10 sm:py-16">
        {/* Project Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.categories.map((cat) => (
              <span key={cat} className="rounded-full bg-mist px-3 py-1 font-mono text-[10px] tracking-wider text-ink/70">
                {cat}
              </span>
            ))}
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {project.name}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink/70 sm:text-xl">
            {project.tagline}
          </p>
        </div>

        {/* Two-column layout: Overview & Features + Hardware Specs */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.25fr,0.75fr] lg:gap-16">
          {/* Left / Primary Column */}
          <div className="space-y-12">
            {/* Overview */}
            {project.description && (
              <div>
                <h2 className="section-label mb-4 text-xs text-signal">SYSTEM OVERVIEW</h2>
                <div className="rounded-3xl border border-ink/8 bg-white p-7 sm:p-9 shadow-sm">
                  <p className="text-base leading-relaxed text-ink/80 sm:text-lg">
                    {project.description}
                  </p>
                </div>
              </div>
            )}

            {/* Key Features */}
            <div>
              <h2 className="section-label mb-4 text-xs text-signal">KEY CAPABILITIES & FEATURES</h2>
              <div className="rounded-3xl border border-ink/8 bg-white p-7 sm:p-9 shadow-sm">
                <ul className="space-y-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-circuit" />
                      <span className="text-sm font-medium leading-relaxed text-ink/80 sm:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Note callout if present */}
            {project.note && (
              <div className="rounded-2xl border border-beacon/30 bg-beacon/10 p-5 text-sm text-ink/80">
                <span className="font-mono text-xs font-semibold text-[#8a6d00]">NOTE: </span>
                {project.note}
              </div>
            )}
          </div>

          {/* Right / Secondary Column: Tech Stack & Specs */}
          <div className="space-y-8">
            {/* Hardware & Components */}
            <div>
              <h2 className="section-label mb-4 flex items-center gap-2 text-xs text-signal">
                <Cpu size={14} /> HARDWARE STACK
              </h2>
              <div className="rounded-3xl border border-ink/8 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {project.components.map((c) => (
                    <span
                      key={c}
                      className="rounded-xl border border-ink/8 bg-mist px-3 py-1.5 font-mono text-xs font-medium text-ink/80"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            {project.specs && project.specs.length > 0 && (
              <div>
                <h2 className="section-label mb-4 flex items-center gap-2 text-xs text-signal">
                  <Sliders size={14} /> SPECIFICATIONS
                </h2>
                <div className="divide-y divide-ink/8 rounded-3xl border border-ink/8 bg-white shadow-sm overflow-hidden">
                  {project.specs.map((spec, i) => (
                    <div key={i} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:justify-between">
                      <span className="font-mono text-[10px] tracking-wider text-ink/50">{spec.label}</span>
                      <span className="font-display text-sm font-semibold text-ink text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Status Panel */}
            <div className="rounded-3xl border border-ink/8 bg-white p-6 shadow-sm">
              <span className="font-mono text-[10px] tracking-wider text-ink/50">LIFECYCLE STATUS</span>
              <p className="mt-2 font-display text-lg font-bold text-ink">{project.status}</p>
              <p className="mt-1 text-xs text-ink/60">
                {project.status === 'COMPLETED'
                  ? 'Hardware tested and operational.'
                  : project.status === 'PROTOTYPE'
                    ? 'Working prototype constructed and under testing.'
                    : project.status === 'IN DEVELOPMENT'
                      ? 'Active schematics, firmware and hardware build in progress.'
                      : 'Research experiments and algorithmic validation.'}
              </p>
            </div>
          </div>
        </div>

        {/* Project Carousel Navigation / Footer */}
        <div className="mt-20 border-t border-ink/8 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {prevProject && onSelectProject ? (
              <button
                onClick={() => onSelectProject(prevProject)}
                data-cursor="button"
                className="group flex items-center gap-2 text-left font-mono text-xs text-ink/60 transition-colors hover:text-volt focus-ring"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                <div>
                  <span className="block text-[10px] uppercase text-ink/40">PREVIOUS</span>
                  <span className="font-display text-sm font-semibold text-ink group-hover:text-volt">
                    {prevProject.name}
                  </span>
                </div>
              </button>
            ) : <div />}
          </div>

          <button
            onClick={onClose}
            data-cursor="button"
            className="rounded-full bg-ink px-6 py-3 font-mono text-xs font-semibold tracking-wide text-paper transition-colors hover:bg-volt focus-ring"
          >
            RETURN TO ALL PROJECTS
          </button>

          <div>
            {nextProject && onSelectProject ? (
              <button
                onClick={() => onSelectProject(nextProject)}
                data-cursor="button"
                className="group flex items-center gap-2 text-right font-mono text-xs text-ink/60 transition-colors hover:text-volt focus-ring"
              >
                <div>
                  <span className="block text-[10px] uppercase text-ink/40">NEXT</span>
                  <span className="font-display text-sm font-semibold text-ink group-hover:text-volt">
                    {nextProject.name}
                  </span>
                </div>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            ) : <div />}
          </div>
        </div>
      </main>
    </div>
  )
}
