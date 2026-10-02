import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"
import { useAudio } from "../context/useAudio"

export default function PlayMeButton() {
  const { isPlaying, togglePlay } = useAudio()

  return (
    <motion.button
      type="button"
      onClick={togglePlay}
      data-cursor="button"
      className={`group mb-5 inline-flex w-fit items-center gap-2.5 rounded-full border px-4 py-1.5 font-mono text-xs font-semibold tracking-wider transition-all duration-300 focus-ring select-none ${
        isPlaying
          ? "border-signal/60 bg-signal/20 text-signal shadow-[0_0_24px_rgba(255,138,61,0.3)] hover:bg-signal/25"
          : "border-signal/40 bg-signal/10 text-signal hover:border-signal hover:bg-signal/20 hover:scale-[1.02] active:scale-[0.98]"
      }`}
      whileTap={{ scale: 0.96 }}
      aria-label={isPlaying ? "Pause Timeless instrumental" : "Play Timeless instrumental"}
    >
      {isPlaying ? (
        <>
          {/* Animated 4-bar sound equalizer */}
          <div className="flex h-3.5 items-end gap-[3px]" aria-hidden>
            <span className="w-[2.5px] rounded-full bg-signal animate-eq-1" />
            <span className="w-[2.5px] rounded-full bg-signal animate-eq-2" />
            <span className="w-[2.5px] rounded-full bg-signal animate-eq-3" />
            <span className="w-[2.5px] rounded-full bg-signal animate-eq-4" />
          </div>
          <span className="uppercase">NOW PLAYING: TIMELESS</span>
          <Pause size={12} className="opacity-70 transition-opacity group-hover:opacity-100" />
        </>
      ) : (
        <>
          <div className="relative flex items-center justify-center">
            <span className="absolute h-3 w-3 rounded-full bg-signal/40 animate-ping" />
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-signal text-paper">
              <Play size={8} className="translate-x-[0.5px] fill-current" />
            </span>
          </div>
          <span className="uppercase">PLAY ME</span>
          <span className="text-[10px] font-sans font-medium tracking-normal opacity-70">
            · TIMELESS (THE WEEKND)
          </span>
        </>
      )}
    </motion.button>
  )
}
