import type { gsap as GsapType } from 'gsap'

/**
 * HOME / Creative Process — scroll — editorial numeral walk. No cards, no
 * imagery: a single oversized, near-invisible numeral sits sticky beside
 * the stage list and crossfades as the active stage changes, while the
 * corresponding list item settles into focus (full color, full scale) and
 * the one it replaces recedes (dimmed, slightly smaller). One shared
 * crossfade drives both, called from `useScrollStory`'s `onChange` hook.
 * Library: GSAP (direct tween on state change — the change itself is
 * discrete, tracked by useScrollStory's ScrollTrigger zones, not scrubbed).
 * Duration: ~0.5–0.8s. Easing: power2/power3 out.
 * Reduced motion: `useScrollStory` never calls `onChange` when reduced, so
 * this never runs — the template's default (first-stage) resting state
 * holds, which is why callers must give it a valid default, not a hidden one.
 */
export function animateProcessFocusChange(
  gsapInstance: typeof GsapType,
  numerals: Element[],
  titles: Element[],
  activeIndex: number,
  previousIndex: number
) {
  const previousNumeral = previousIndex >= 0 ? numerals[previousIndex] : undefined
  const previousTitle = previousIndex >= 0 ? titles[previousIndex] : undefined
  if (previousIndex !== activeIndex && previousNumeral && previousTitle) {
    gsapInstance.to(previousNumeral, { opacity: 0, scale: 0.94, duration: 0.6, ease: 'power2.out' })
    gsapInstance.to(previousTitle, { opacity: 0.4, scale: 0.97, duration: 0.5, ease: 'power2.out' })
  }

  const activeNumeral = numerals[activeIndex]
  const activeTitle = titles[activeIndex]
  if (!activeNumeral || !activeTitle) return

  gsapInstance.fromTo(activeNumeral, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' })
  gsapInstance.to(activeTitle, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' })
}
