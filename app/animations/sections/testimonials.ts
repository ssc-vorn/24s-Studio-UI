import type { gsap as GsapType } from 'gsap'
import { EASE } from '../constants'

/** Subtle card reveal — testimonials fade and settle without competing for attention. */
export function revealTestimonials(gsapInstance: typeof GsapType, cards: Element[], trigger: Element, reduced: boolean) {
  gsapInstance.fromTo(
    cards,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: reduced ? 0.001 : 0.7,
      stagger: reduced ? 0 : 0.1,
      ease: EASE.out,
      scrollTrigger: { trigger, start: 'top 80%' }
    }
  )
}
