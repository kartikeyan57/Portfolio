import { AnimatePresence, motion } from 'framer-motion'
import { Pause } from 'lucide-react'
import { useAudio } from '../context/useAudio'

export default function FloatingAudioPlayer() {
  const { isPlaying, togglePlay, trackTitle, artist } = useAudio()

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-ink/10 bg-paper/90 px-4 py-2 shadow-2xl shadow-ink/10 backdrop-blur-md"
        >
          <div className="flex h-3.5 items-end gap-[2.5px]" aria-hidden>
            <span className="w-[2.5px] rounded-full bg-volt animate-eq-1" />
            <span className="w-[2.5px] rounded-full bg-volt animate-eq-2" />
            <span className="w-[2.5px] rounded-full bg-volt animate-eq-3" />
            <span className="w-[2.5px] rounded-full bg-volt animate-eq-4" />
          </div>

          <div className="flex flex-col pr-1 text-left leading-tight">
            <span className="font-mono text-[10px] font-semibold text-ink tracking-tight">
              {trackTitle}
            </span>
            <span className="font-mono text-[8px] text-ink/60 uppercase">
              {artist}
            </span>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            data-cursor="button"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-volt focus-ring"
            aria-label="Pause audio"
          >
            <Pause size={12} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
