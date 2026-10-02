import { useContext } from "react"
import { AudioContext } from "./audioStore"

export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return ctx
}
