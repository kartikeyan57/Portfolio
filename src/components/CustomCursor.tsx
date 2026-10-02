import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/useFinePointer'

type Variant = 'default' | 'button' | 'view' | 'explore'

/**
 * Universal color luminance parser supporting:
 * - rgb(23, 32, 51) / rgba(23, 32, 51, 1)
 * - rgb(23 32 51) / rgb(23 32 51 / 1) (CSS Color 4)
 * - hex or float formats
 */
function parseRgbLuminance(colorStr: string): number | null {
  if (!colorStr || colorStr === 'transparent' || colorStr === 'rgba(0, 0, 0, 0)') {
    return null
  }
  const numbers = colorStr.match(/[\d.]+/g)
  if (!numbers || numbers.length < 3) return null
  const r = parseFloat(numbers[0])
  const g = parseFloat(numbers[1])
  const b = parseFloat(numbers[2])
  // If alpha is 0, element background is transparent
  if (numbers.length >= 4 && parseFloat(numbers[3]) === 0) {
    return null
  }
  // Standard perceived luminance formula (ITU-R BT.709)
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

const darkCache = new WeakMap<Element, boolean>()

/**
 * Detects whether an element or any of its ancestors has a dark background.
 * Uses native closest() for instant check of dark classes, and traverses computed styles.
 */
function isElementDark(el: Element | null): boolean {
  if (!el) return false

  const cached = darkCache.get(el)
  if (cached !== undefined) return cached

  // 1. Instant native check for dark classes and data attributes
  if (
    el.closest(
      '.bg-ink, .bg-slate-900, .bg-zinc-900, .bg-neutral-900, .bg-black, [data-theme="dark"], [data-dark="true"]'
    )
  ) {
    darkCache.set(el, true)
    return true
  }

  // 2. Computed background color inspection
  let curr: Element | null = el
  while (curr && curr !== document.documentElement && curr !== document.body) {
    if (curr instanceof HTMLElement) {
      const inlineBg = curr.style.backgroundColor
      if (inlineBg) {
        const lum = parseRgbLuminance(inlineBg)
        if (lum !== null) {
          const dark = lum < 0.45
          darkCache.set(el, dark)
          return dark
        }
      }
      const style = window.getComputedStyle(curr)
      const lum = parseRgbLuminance(style.backgroundColor)
      if (lum !== null) {
        const dark = lum < 0.45
        darkCache.set(el, dark)
        return dark
      }
    }
    curr = curr.parentElement
  }
  darkCache.set(el, false)
  return false
}

/**
 * IEEE/ANSI Standard NOR Logic Gate Icon for the custom cursor tracker.
 * Vertically oriented like a normal cursor (output pin points UP towards targets).
 * Features an authentic OR body curve + output inversion NOT bubble, with direct input pins.
 * Retains dual-contrast vector casing (pure SVG) for 100% anti-camouflage and native Retina/4K DPI.
 */
function NorGate({
  isButton = false,
  isPressed = false,
  isLabel = false,
  isDark = false,
}: {
  isButton?: boolean
  isPressed?: boolean
  isLabel?: boolean
  isDark?: boolean
}) {
  const effectiveDark = isDark || isLabel

  // High-contrast outer casing: provides instant contrast against opposite luminance
  const casingStroke = effectiveDark ? '#050811' : '#FFFFFF'

  // Precision core line color
  const coreStroke = effectiveDark
    ? isButton
      ? '#FFD84D'
      : '#38BDF8'
    : isButton
      ? '#2563EB'
      : '#0F172A'

  // Gate shield fill: opaque backdrop so text underneath cannot camouflage the gate interior
  const bodyFill = effectiveDark
    ? isButton
      ? 'rgba(255, 216, 77, 0.25)'
      : 'rgba(15, 23, 42, 0.92)'
    : isButton
      ? 'rgba(37, 99, 235, 0.18)'
      : 'rgba(255, 255, 255, 0.94)'

  // Target dot color
  const dotColor = effectiveDark
    ? isButton
      ? '#FFD84D'
      : '#38BDF8'
    : '#2563EB'

  const svgWidth = isLabel ? 16 : 28
  const svgHeight = isLabel ? 26 : 44
  const outerWidth = isLabel ? 3.4 : 4.4
  const innerWidth = isLabel ? 1.5 : 2.0

  return (
    <svg
      viewBox="0 -2 26 46"
      className="overflow-visible"
      shapeRendering="geometricPrecision"
      style={{
        width: svgWidth,
        height: svgHeight,
      }}
    >
      {/* LAYER 1: HIGH-CONTRAST VECTOR CASING (Pure vector halo, zero camouflage) */}
      {/* Bottom input pins casing (connect directly to curved back of the gate) */}
      <line
        x1="8"
        y1="29.5"
        x2="8"
        y2="39"
        stroke={casingStroke}
        strokeWidth={outerWidth}
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="29.5"
        x2="18"
        y2="39"
        stroke={casingStroke}
        strokeWidth={outerWidth}
        strokeLinecap="round"
      />
      <circle cx="8" cy="39" r={isLabel ? 1.8 : 2.5} fill={casingStroke} />
      <circle cx="18" cy="39" r={isLabel ? 1.8 : 2.5} fill={casingStroke} />

      {/* Main NOR gate body casing + solid HUD shield fill */}
      <path
        d="M 3 32 C 3 23, 8 16.5, 13 12.5 C 18 16.5, 23 23, 23 32 Q 13 27 3 32 Z"
        fill={bodyFill}
        stroke={casingStroke}
        strokeWidth={outerWidth}
        strokeLinejoin="round"
      />

      {/* Inversion NOT bubble casing */}
      <circle cx="13" cy="10" r={isLabel ? 2.8 : 4.2} fill={casingStroke} />

      {/* Output pin casing extending from bubble to pointer tip */}
      <line
        x1="13"
        y1="7.8"
        x2="13"
        y2="2"
        stroke={casingStroke}
        strokeWidth={outerWidth}
        strokeLinecap="round"
      />
      <circle cx="13" cy="2" r={isLabel ? 1.8 : 2.5} fill={casingStroke} />

      {/* Center target dot casing */}
      <circle cx="13" cy="22" r={isPressed ? 3.6 : 3.0} fill={casingStroke} />

      {/* LAYER 2: SHARP HIGH-DPI CORE STROKE (Subpixel vector precision) */}
      {/* Bottom input pins core */}
      <line
        x1="8"
        y1="29.5"
        x2="8"
        y2="39"
        stroke={coreStroke}
        strokeWidth={innerWidth}
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="29.5"
        x2="18"
        y2="39"
        stroke={coreStroke}
        strokeWidth={innerWidth}
        strokeLinecap="round"
      />
      <circle cx="8" cy="39" r={isLabel ? 1.0 : 1.3} fill={coreStroke} />
      <circle cx="18" cy="39" r={isLabel ? 1.0 : 1.3} fill={coreStroke} />

      {/* Main NOR gate body outline */}
      <path
        d="M 3 32 C 3 23, 8 16.5, 13 12.5 C 18 16.5, 23 23, 23 32 Q 13 27 3 32 Z"
        fill="none"
        stroke={coreStroke}
        strokeWidth={innerWidth}
        strokeLinejoin="round"
      />

      {/* Inversion NOT bubble core */}
      <circle
        cx="13"
        cy="10"
        r={isLabel ? 1.5 : 2.2}
        fill={bodyFill}
        stroke={coreStroke}
        strokeWidth={innerWidth}
      />

      {/* Output pin core (pointing straight UP to target) */}
      <line
        x1="13"
        y1="7.8"
        x2="13"
        y2="2"
        stroke={coreStroke}
        strokeWidth={innerWidth}
        strokeLinecap="round"
      />
      <circle cx="13" cy="2" r={isLabel ? 1.0 : 1.3} fill={coreStroke} />

      {/* Precision logic target dot at center */}
      <circle
        cx="13"
        cy="22"
        r={isPressed ? 2.3 : 1.6}
        fill={dotColor}
      />
    </svg>
  )
}

/**
 * Desktop-only custom cursor with NOR logic gate tracker.
 * Any element can opt in with `data-cursor="button" | "view" | "explore"`.
 */
export default function CustomCursor() {
  const isFine = useFinePointer()
  const [variant, setVariant] = useState<Variant>('default')
  const [visible, setVisible] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const hasInitializedRef = useRef(false)
  const lastTargetRef = useRef<Element | null>(null)
  const lastVariantRef = useRef<Variant>('default')
  const lastDarkRef = useRef(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 42, stiffness: 800, mass: 0.08, restDelta: 0.001 })
  const springY = useSpring(y, { damping: 42, stiffness: 800, mass: 0.08, restDelta: 0.001 })

  useEffect(() => {
    if (!isFine) return

    document.body.classList.add('cursor-enabled')

    const updateTargetState = (targetEl: Element | null) => {
      if (!targetEl || targetEl === lastTargetRef.current) return
      lastTargetRef.current = targetEl

      const cursorTarget = targetEl.closest('[data-cursor]') as HTMLElement | null
      const nextVariant = (cursorTarget?.getAttribute('data-cursor') as Variant) || 'default'
      if (nextVariant !== lastVariantRef.current) {
        lastVariantRef.current = nextVariant
        setVariant(nextVariant)
      }

      const dark = isElementDark(targetEl)
      if (dark !== lastDarkRef.current) {
        lastDarkRef.current = dark
        setIsDark(dark)
      }
    }

    const handleMove = (e: PointerEvent | MouseEvent) => {
      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true
        x.jump(e.clientX)
        y.jump(e.clientY)
        springX.jump(e.clientX)
        springY.jump(e.clientY)
        setVisible(true)
      } else {
        x.set(e.clientX)
        y.set(e.clientY)
      }

      updateTargetState(e.target as Element | null)
    }

    const handleScroll = () => {
      const curX = x.get()
      const curY = y.get()
      if (curX >= 0 && curY >= 0) {
        const el = document.elementFromPoint(curX, curY)
        updateTargetState(el)
      }
    }

    const handleLeave = () => {
      setVisible(false)
      hasInitializedRef.current = false
      lastTargetRef.current = null
    }

    const handleDown = () => setIsPressed(true)
    const handleUp = () => setIsPressed(false)

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      document.body.classList.remove('cursor-enabled')
    }
  }, [isFine, x, y, springX, springY])

  if (!isFine) return null

  const isLabel = variant === 'view' || variant === 'explore'
  const isButton = variant === 'button'

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center will-change-transform"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: isLabel ? '-50%' : '-4px',
      }}
      animate={{
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.15 }}
    >
      {isLabel ? (
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 350 }}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-ink px-3 py-1.5 shadow-xl backdrop-blur-sm"
        >
          <NorGate isLabel />
          <span className="font-mono text-[10px] font-semibold tracking-wider text-paper">
            {variant.toUpperCase()}
          </span>
        </motion.div>
      ) : (
        <motion.div
          animate={{
            scale: isPressed ? 0.88 : isButton ? 1.25 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 350 }}
          style={{ transformOrigin: 'center 4px' }}
          className="flex items-center justify-center"
        >
          <NorGate isButton={isButton} isPressed={isPressed} isDark={isDark} />
        </motion.div>
      )}
    </motion.div>
  )
}
