import { useMemo, useState } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { projects, categoryFilters, type Project } from '../data/profile'
import ProjectCard from './ProjectCard'
import ProjectModal from '../components/ProjectModal'

export default function ProjectGallery() {
  const [filter, setFilter] = useState<(typeof categoryFilters)[number]>('ALL')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered = useMemo(
    () => (filter === 'ALL' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  )

  return (
    <section id="projects" className="relative mx-auto max-w-screen-2xl px-6 py-28 sm:px-10 lg:px-14 xl:px-20">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute top-10 right-10 -z-10 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 -z-10 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #0F766E 0%, transparent 70%)' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-label text-xs text-signal"
      >
        PROJECTS
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
      >
        Things I've built
      </motion.h2>

      <LayoutGroup>
        <div className="mt-10 flex flex-wrap gap-2">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              data-cursor="button"
              onClick={() => setFilter(cat)}
              className="relative rounded-full px-4 py-2 font-mono text-[11px] font-semibold tracking-wide transition-all focus-ring"
            >
              {filter === cat ? (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-volt to-blue-600 shadow-md shadow-volt/30"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-ink/10 bg-white/70 shadow-2xs" />
              )}
              <span className={`relative z-10 ${filter === cat ? 'text-white' : 'text-ink/65 hover:text-volt'}`}>
                {cat}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </LayoutGroup>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={setSelectedProject}
        />
      )}
    </section>
  )
}
