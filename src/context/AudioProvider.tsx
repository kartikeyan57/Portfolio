import { useEffect, useRef, useState, type ReactNode } from "react"
import { AudioContext } from "./audioStore"

const START_OFFSET_SECONDS = 4

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio("/timeless-instrumental.mp3")
    audio.loop = false
    audio.volume = 0.65
    audio.preload = "auto"

    const setStartOffset = () => {
      if (audio.currentTime < START_OFFSET_SECONDS) {
        audio.currentTime = START_OFFSET_SECONDS
      }
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      audio.currentTime = START_OFFSET_SECONDS
      audio.play().catch(() => {})
    }

    audio.addEventListener("loadedmetadata", setStartOffset)
    audio.addEventListener("canplay", setStartOffset)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener("loadedmetadata", setStartOffset)
      audio.removeEventListener("canplay", setStartOffset)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
      audioRef.current = null
    }
  }, [])

  const play = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime < START_OFFSET_SECONDS) {
        audioRef.current.currentTime = START_OFFSET_SECONDS
      }
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback prevented:", err)
      })
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlay,
        play,
        pause,
        trackTitle: "Timeless (Instrumental)",
        artist: "The Weeknd & Playboi Carti",
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}
