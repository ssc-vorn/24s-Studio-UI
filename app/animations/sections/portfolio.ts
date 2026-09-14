import type { gsap as GsapType } from 'gsap'
import { EASE } from '../constants'

/**
 * PROJECT CARD — scroll — a card's media wipes in first (clip-path + subtle
 * zoom-settle), then its title, then category/year a beat behind. One
 * shared timeline shape reused by Selected Work (home) and the Work archive
 * grid so every project card enters the same way everywhere — the
 * "consistent interaction language" the design calls for.
 * Library: GSAP + ScrollTrigger (per-card trigger, no scrub/pin).
 * Reduced motion: caller should skip calling this and set the final state
 * directly instead (see ProjectPreview's `[data-reveal]` targets).
 */
export function animateCardReveal(gsapInstance: typeof GsapType, card: Element, start = 'top 85%') {
  const media = card.querySelector('[data-reveal="media"]')
  const metaTitle = card.querySelector('[data-reveal="meta-title"]')
  const metaDetail = card.querySelector('[data-reveal="meta-detail"]')

  return gsapInstance
    .timeline({ scrollTrigger: { trigger: card, start } })
    .fromTo(
      media,
      { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
      { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(metaTitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.45')
    .fromTo(metaDetail, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
}

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
