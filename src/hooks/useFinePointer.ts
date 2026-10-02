import { useEffect, useState } from 'react'

/** True for devices with a precise pointer (mouse/trackpad), false for touch. */
export function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)')
    setIsFine(query.matches)
    const handler = (e: MediaQueryListEvent) => setIsFine(e.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  return isFine
}
