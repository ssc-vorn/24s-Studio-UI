export const EASE = {
  editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
  cinematic: 'cubic-bezier(0.65, 0, 0.35, 1)',
  out: 'power3.out',
  inOut: 'power2.inOut'
} as const

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  cinematic: 1.6
} as const

export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14
} as const
