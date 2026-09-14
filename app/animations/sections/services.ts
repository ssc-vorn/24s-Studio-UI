import type { gsap as GsapType } from 'gsap'
import { EASE } from '../constants'

/**
 * HOME / Services — full-width content grid, no sticky panel and no single
 * "active" state: every service is equal weight. Stage one of the section's
 * two-layer scroll narrative — each card (title included) clips up into
 * place as it enters view. Stage two, driven separately per card from
 * ServiceList's own ScrollTrigger instances, reveals each card's detail
 * (summary + capabilities) only once the user scrolls further in.
 */
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
