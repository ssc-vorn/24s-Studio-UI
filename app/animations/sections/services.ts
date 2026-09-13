import type { gsap as GsapType } from 'gsap'
import { EASE } from '../constants'

/** Editorial stagger — each row clips up into place rather than a plain fade. */
export function revealServiceRows(gsapInstance: typeof GsapType, rows: Element[], trigger: Element, reduced: boolean) {
  gsapInstance.fromTo(
    rows,
    { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: reduced ? 0.001 : 0.9,
      stagger: reduced ? 0 : 0.12,
      ease: EASE.out,
      scrollTrigger: { trigger, start: 'top 78%' }
    }
  )
}
