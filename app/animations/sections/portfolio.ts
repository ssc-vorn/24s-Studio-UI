import type { gsap as GsapType } from 'gsap'
import { EASE } from '../constants'

/** Phase 1 — outgoing cards. Fast, subtle exit before the dataset swaps. */
export function filterExit(gsapInstance: typeof GsapType, cards: Element[], reduced: boolean) {
  return gsapInstance.timeline().to(cards, {
    opacity: 0,
    y: (i: number) => (i % 2 === 0 ? -10 : 10),
    scale: 0.97,
    duration: reduced ? 0.001 : 0.32,
    stagger: reduced ? 0 : 0.025,
    ease: 'power2.in'
  })
}

/** Phase 3 — incoming cards, staggered in after the filtered dataset renders. */
export function filterEnter(gsapInstance: typeof GsapType, cards: Element[], reduced: boolean) {
  return gsapInstance.timeline().fromTo(
    cards,
    { opacity: 0, y: 30, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: reduced ? 0.001 : 0.6,
      stagger: reduced ? 0 : 0.06,
      ease: EASE.out,
      clearProps: 'transform'
    }
  )
}
