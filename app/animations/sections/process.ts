import type { gsap as GsapType } from 'gsap'

/**
 * HOME / Creative Process — scroll — "Layered Scroll Narrative". Each stage
 * is a self-contained card pinned via CSS `position: sticky` with an
 * increasing z-index per stage, so later cards physically cover earlier
 * ones as the page scrolls — that core stacking effect is pure CSS and
 * works even if GSAP never initializes. This only adds the recede
 * flourish on top of it: as a card's own wrapper scrolls past, its scale
 * eases down and a dark overlay scrubs in, so it reads as sliding back in
 * depth under the next layer rather than being abruptly clipped away.
 * Library: GSAP + ScrollTrigger (one scrub per card, no pin — CSS sticky
 * already handles that part). Duration: tied to scroll, not time.
 * Reduced motion: caller should skip calling this entirely — cards still
 * stack correctly via CSS, just without the scale/dim motion.
 */
export function animateLayeredRecede(gsapInstance: typeof GsapType, stageEls: HTMLElement[]) {
  stageEls.forEach((stage, index) => {
    if (index === stageEls.length - 1) return

    const card = stage.querySelector('[data-layer-card]')
    const overlay = stage.querySelector('[data-layer-overlay]')
    if (!card) return

    const tl = gsapInstance.timeline({
      scrollTrigger: { trigger: stage, start: 'bottom bottom', end: 'bottom top', scrub: true }
    })
    tl.to(card, { scale: 0.92, ease: 'none' }, 0)
    if (overlay) tl.to(overlay, { opacity: 0.55, ease: 'none' }, 0)
  })
}
