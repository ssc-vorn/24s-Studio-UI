import type { gsap } from 'gsap'
import { DURATION, EASE, STAGGER } from '../constants'

export type RevealVariant = 'fade-up' | 'fade-down' | 'fade' | 'clip' | 'scale' | 'split-left' | 'split-right'

interface RevealOptions {
  variant?: RevealVariant
  delay?: number
  stagger?: number
  duration?: number
  reduced?: boolean
}

const FROM: Record<RevealVariant, gsap.TweenVars> = {
  'fade-up': { opacity: 0, y: 48 },
  'fade-down': { opacity: 0, y: -32 },
  fade: { opacity: 0 },
  clip: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  scale: { opacity: 0, scale: 0.94 },
  'split-left': { opacity: 0, x: -56 },
  'split-right': { opacity: 0, x: 56 }
}

const TO: Record<RevealVariant, gsap.TweenVars> = {
  'fade-up': { opacity: 1, y: 0 },
  'fade-down': { opacity: 1, y: 0 },
  fade: { opacity: 1 },
  clip: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
  scale: { opacity: 1, scale: 1 },
  'split-left': { opacity: 1, x: 0 },
  'split-right': { opacity: 1, x: 0 }
}

export function revealFrom(variant: RevealVariant = 'fade-up') {
  return FROM[variant]
}

export function revealTo(
  gsapInstance: typeof gsap,
  variant: RevealVariant = 'fade-up',
  { delay = 0, stagger = STAGGER.base, duration = DURATION.slow, reduced = false }: RevealOptions = {}
) {
  if (reduced) {
    return { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.2, delay: 0, stagger: 0 }
  }
  return {
    ...TO[variant],
    duration,
    delay,
    stagger,
    ease: EASE.out
  }
}
