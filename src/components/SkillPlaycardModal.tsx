import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Cpu, Sparkles, Layers } from 'lucide-react'
import type { SkillPlaycard } from '../data/skillsData'
import { skillPlaycards } from '../data/skillsData'

type Props = {
  card: SkillPlaycard | null
  onClose: () => void
  onSelectCard: (card: SkillPlaycard) => void
}

const cardList = Object.values(skillPlaycards)

export default function SkillPlaycardModal({ card, onClose, onSelectCard }: Props) {
  const currentIndex = card ? cardList.findIndex((c) => c.id === card.id) : -1
  const prevCard = currentIndex > 0 ? cardList[currentIndex - 1] : cardList[cardList.length - 1]
  const nextCard = currentIndex < cardList.length - 1 ? cardList[currentIndex + 1] : cardList[0]

  const handlePrev = useCallback(() => {
    if (prevCard) onSelectCard(prevCard)
  }, [prevCard, onSelectCard])

  const handleNext = useCallback(() => {
    if (nextCard) onSelectCard(nextCard)
  }, [nextCard, onSelectCard])

  // Handle ESC key and arrow keys, prevent body scroll
  useEffect(() => {
    if (!card) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [card, onClose, handleNext, handlePrev])

  if (!card) return null

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${card.name} Playcard`}
        className="fixed inset-0 z-[1050] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/70 backdrop-blur-md"
        />

        {/* ─── 3D HOLOGRAPHIC TECH PLAYCARD ─── */}
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.88, rotateY: 18, y: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: -18, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          className="relative z-10 my-auto w-full max-w-[420px] rounded-3xl p-6 sm:p-7 shadow-2xl text-ink bg-paper border select-none overflow-hidden"
          style={{
            borderColor: `${card.accentColor}55`,
            boxShadow: `0 20px 50px -10px ${card.accentColor}35, 0 0 0 1px ${card.accentColor}30`,
          }}
        >
          {/* Subtle metallic foil sheen accent */}
          <div
            className="pointer-events-none absolute -top-28 -right-28 h-64 w-64 rounded-full opacity-20 blur-2xl"
            style={{ background: card.accentColor }}
          />

          {/* Playing Card Corner Index (Top-Left) */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-center leading-none font-mono">
              <span className="text-xl sm:text-2xl font-bold" style={{ color: card.accentColor }}>
                {card.suit}
              </span>
              <span className="text-[10px] font-extrabold tracking-tighter text-ink/70 mt-0.5">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Category & Tier Badge */}
            <div className="flex items-center gap-2">
              <span
                className="rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase border"
                style={{
                  backgroundColor: `${card.accentColor}15`,
                  borderColor: `${card.accentColor}40`,
                  color: card.accentColor,
                }}
              >
                {card.category} // {card.level}
              </span>

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close playcard"
                className="rounded-full p-1.5 text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink focus-ring"
                data-cursor="button"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Card Hero Title */}
          <div className="mt-4 pt-1">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
                {card.name}
              </h3>
              <Sparkles size={16} style={{ color: card.accentColor }} className="opacity-80" />
            </div>
            <p className="mt-1 font-mono text-xs font-semibold text-ink/70">
              {card.role}
            </p>
          </div>

          {/* Card Illustration / Tech Shield Band */}
          <div
            className="mt-4 rounded-xl border p-3.5 backdrop-blur-xs"
            style={{
              borderColor: `${card.accentColor}25`,
              backgroundColor: `${card.accentColor}08`,
            }}
          >
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider uppercase mb-2" style={{ color: card.accentColor }}>
              <Cpu size={14} />
              <span>TECHNICAL SPECIFICATIONS</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              {card.specs.map((spec, i) => (
                <div key={i} className="rounded-lg bg-paper/90 p-2 border border-ink/8 shadow-2xs">
                  <div className="text-ink/50 text-[10px] uppercase">{spec.label}</div>
                  <div className="font-bold text-ink mt-0.5 truncate">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description / Real-World Lab Application */}
          <div className="mt-4">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider uppercase text-ink/50 mb-1.5">
              <Layers size={13} />
              <span>LAB USAGE & METHODOLOGY</span>
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed text-ink/80">
              {card.summary}
            </p>
          </div>

          {/* Real-World Implementations */}
          <div className="mt-4 pt-2 border-t border-ink/8">
            <div className="text-[10px] font-mono font-semibold uppercase text-ink/50 mb-1.5">
              PROVEN IN PROJECTS
            </div>
            <div className="flex flex-wrap gap-1.5">
              {card.applications.map((app, i) => (
                <span
                  key={i}
                  className="rounded-md border border-ink/10 bg-ink/[0.03] px-2.5 py-1 font-mono text-[10px] font-medium text-ink/80"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Card Bottom Deck Navigation & Card Index */}
          <div className="mt-6 flex items-center justify-between pt-3 border-t border-ink/8 text-xs font-mono">
            <button
              onClick={handlePrev}
              className="group flex items-center gap-1 text-ink/60 transition-colors hover:text-ink focus-ring"
              data-cursor="button"
            >
              <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
              <span>PREV CARD</span>
            </button>

            <span className="text-[11px] text-ink/40 font-semibold tracking-wider">
              {currentIndex + 1} / {cardList.length}
            </span>

            <button
              onClick={handleNext}
              className="group flex items-center gap-1 text-ink/60 transition-colors hover:text-ink focus-ring"
              data-cursor="button"
            >
              <span>NEXT CARD</span>
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Inverted Playing Card Corner Index (Bottom-Right) */}
          <div className="absolute bottom-3 right-4 rotate-180 flex flex-col items-center leading-none font-mono opacity-40 pointer-events-none">
            <span className="text-base font-bold" style={{ color: card.accentColor }}>
              {card.suit}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
