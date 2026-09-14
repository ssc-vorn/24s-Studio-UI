import type { gsap as GsapType } from 'gsap'
import { EASE } from '../constants'

/**
 * HOME / Services — Layered Scroll Narrative, mirroring Creative Process's
 * numeral walk exactly: a sticky, near-invisible ghost title crossfades as
 * the active service changes, while the matching list title settles into
 * focus and the one it replaces recedes. Pure scroll-driven — no hover, no
 * click — called only from `useScrollStory`'s `onChange` hook.
 * Reduced motion: `useScrollStory` never calls `onChange` when reduced, so
 * this never runs — the template's default (first-service) resting state holds.
 */
export function animateServiceFocusChange(
  gsapInstance: typeof GsapType,
  ghosts: Element[],
  titles: Element[],
  activeIndex: number,
  previousIndex: number
) {
  const previousGhost = previousIndex >= 0 ? ghosts[previousIndex] : undefined
  const previousTitle = previousIndex >= 0 ? titles[previousIndex] : undefined
  if (previousIndex !== activeIndex && previousGhost && previousTitle) {
    gsapInstance.to(previousGhost, { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.out' })
    gsapInstance.to(previousTitle, { opacity: 0.4, scale: 0.98, duration: 0.5, ease: 'power2.out' })
  }

  const activeGhost = ghosts[activeIndex]
  const activeTitle = titles[activeIndex]
  if (!activeGhost || !activeTitle) return

  gsapInstance.fromTo(activeGhost, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' })
  gsapInstance.to(activeTitle, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' })
}

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
