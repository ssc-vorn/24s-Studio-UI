import type { gsap as GsapType } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

/**
 * HOME / Creative Process — scroll — "Layered Scroll Narrative" v2. Each
 * stage is a self-contained card pinned via CSS `position: sticky` with an
 * increasing z-index per stage, so later cards physically cover earlier
 * ones as the page scrolls — that core stacking effect is pure CSS and
 * works even if GSAP never initializes.
 *
 * Three independent GSAP layers sit on top of that CSS foundation:
 *  - `animateLayerEntrance` — a card lifts and fades into place the first
 *    time it's approached, so the sequence reads as enter → hold → recede
 *    rather than just appearing pre-placed.
 *  - `animateLayeredRecede` — as a card's wrapper scrolls past, it scales
 *    down, softens (a light blur) and dims under a dark overlay, reading
 *    as sliding back in depth under the next card rather than being
 *    abruptly clipped away.
 *  - `trackActiveLayer` — a lightweight, non-scrubbed tracker (independent
 *    of the two above) driving the section's progress indicator; safe to
 *    run under reduced motion since it's discrete state, not motion.
 *
 * Library: GSAP + ScrollTrigger. Reduced motion: caller should skip
 * entrance/recede entirely — cards still stack correctly via CSS alone.
 */
export function animateLayerEntrance(gsapInstance: typeof GsapType, stageEls: HTMLElement[]) {
  stageEls.forEach((stage) => {
    const card = stage.querySelector('[data-layer-card]')
    if (!card) return
    gsapInstance.fromTo(
      card,
      { opacity: 0, y: 56 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: stage, start: 'top 85%' } }
    )
  })
}

export function animateLayeredRecede(gsapInstance: typeof GsapType, stageEls: HTMLElement[]) {
  stageEls.forEach((stage, index) => {
    if (index === stageEls.length - 1) return

    const card = stage.querySelector('[data-layer-card]')
    const overlay = stage.querySelector('[data-layer-overlay]')
    if (!card) return

    const tl = gsapInstance.timeline({
      scrollTrigger: { trigger: stage, start: 'bottom bottom', end: 'bottom top', scrub: true }
    })
    tl.to(card, { scale: 0.92, filter: 'blur(3px)', ease: 'none' }, 0)
    if (overlay) tl.to(overlay, { opacity: 0.55, ease: 'none' }, 0)
  })
}

export function trackActiveLayer(
  scrollTrigger: typeof ScrollTriggerType,
  stageEls: HTMLElement[],
  onActivate: (index: number) => void
) {
  stageEls.forEach((stage, index) => {
    scrollTrigger.create({
      trigger: stage,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => onActivate(index),
      onEnterBack: () => onActivate(index)
    })
  })
}
