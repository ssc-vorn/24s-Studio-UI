import type { gsap as GsapType } from 'gsap'
import { DURATION, EASE, STAGGER } from '../constants'

interface HeroTargets {
  background: Element | null
  eyebrow: Element | null
  headingLines: Element[]
  paragraph: Element | null
  ctas: Element | null
  scrollIndicator: Element | null
}

/**
 * HOME / Hero — page load — cinematic entrance.
 * Library: GSAP. Duration: ~2.4s total. Easing: power3.out (power4 for background).
 * Sequence: background reveal → eyebrow → headline clip reveal (staggered lines)
 * → supporting text → CTAs → scroll indicator.
 * Reduced motion: all targets snap directly to their resting state, no motion.
 */
export function animateHeroEntrance(gsapInstance: typeof GsapType, targets: HeroTargets, reduced: boolean) {
  const tl = gsapInstance.timeline({ defaults: { ease: EASE.out } })

  if (reduced) {
    tl.set(
      [targets.background, targets.eyebrow, ...targets.headingLines, targets.paragraph, targets.ctas, targets.scrollIndicator],
      { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' }
    )
    return tl
  }

  tl.fromTo(targets.background, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: DURATION.cinematic, ease: 'power4.out' })
    .fromTo(targets.eyebrow, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: DURATION.base }, '-=1.1')
    .fromTo(
      targets.headingLines,
      { opacity: 0, y: 56, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: DURATION.cinematic, stagger: STAGGER.loose },
      '-=0.5'
    )
    .fromTo(targets.paragraph, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: DURATION.base }, '-=0.75')
    .fromTo(targets.ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: DURATION.base }, '-=0.55')
    .fromTo(targets.scrollIndicator, { opacity: 0 }, { opacity: 1, duration: DURATION.base }, '-=0.25')

  return tl
}
