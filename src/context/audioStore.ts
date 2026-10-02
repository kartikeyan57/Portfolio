import { createContext } from "react"

export type AudioContextType = {
  isPlaying: boolean
  togglePlay: () => void
  play: () => void
  pause: () => void
  trackTitle: string
  artist: string
}

export const AudioContext = createContext<AudioContextType | null>(null)
