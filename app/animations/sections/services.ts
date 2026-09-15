import type { gsap as GsapType } from 'gsap'
import { DURATION, EASE, STAGGER } from '../constants'

/**
 * HOME / Services — scroll (mount, not scrubbed) — one coordinated timeline:
 * every row's separator draws in, title rises, meta/description settle,
 * staggered row to row rather than each property animating independently.
 * Replaces the old per-card scroll-scrubbed expand (ServiceItem) — this
 * section no longer has a scroll-driven "open" state at all, only this
 * single entrance.
 * Library: GSAP + ScrollTrigger (one trigger on the row list, no scrub).
 * Reduced motion: caller should skip this and set final state directly.
 */
export function animateServiceRowsReveal(
  gsapInstance: typeof GsapType,
  targets: { separators: Element[]; titles: Element[]; metas: Element[] },
  trigger: Element
) {
  return gsapInstance
    .timeline({ scrollTrigger: { trigger, start: 'top 75%' } })
    .fromTo(targets.separators, { scaleX: 0 }, { scaleX: 1, duration: DURATION.base, ease: EASE.inOut, stagger: STAGGER.base }, 0)
    .fromTo(targets.titles, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: DURATION.base, ease: EASE.out, stagger: STAGGER.base }, 0.1)
    .fromTo(targets.metas, { opacity: 0 }, { opacity: 1, duration: DURATION.base, stagger: STAGGER.base }, 0.2)
}

/**
 * HOME / Services — hover/tap (state change, not scroll) — the signature
 * moment: the previously-active service's media fades down while the newly
 * active one clip-reveals in from a slight zoom-out. Duration/easing match
 * the rest of the reveal language (DURATION.slow, power3.out) rather than
 * inventing new timing just for this interaction.
 */
export function crossfadeServiceMedia(gsapInstance: typeof GsapType, outgoing: Element | null, incoming: Element) {
  if (outgoing && outgoing !== incoming) {
    gsapInstance.to(outgoing, { opacity: 0, duration: DURATION.base, ease: EASE.out })
  }
  gsapInstance.fromTo(
    incoming,
    { clipPath: 'inset(0 0 100% 0)', scale: 0.92, opacity: 0 },
    { clipPath: 'inset(0 0 0% 0)', scale: 1, opacity: 1, duration: DURATION.slow, ease: EASE.out }
  )
}
