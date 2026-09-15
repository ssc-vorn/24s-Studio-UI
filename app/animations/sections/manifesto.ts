import type { gsap as GsapType } from 'gsap'
import { DURATION } from '../constants'

interface ManifestoTargets {
  pinRoot: HTMLElement
  container: HTMLElement
  phrases: HTMLElement[]
  supporting: HTMLElement
}

/**
 * HOME / Manifesto — scroll — a kinetic phrase sequence rather than a single
 * flowing paragraph: each phrase fully fades out before the next fades in —
 * deliberately not a true crossfade, which left two phrases legible on top
 * of each other for a stretch of scroll (caught by scrubbing through this
 * frame-by-frame: real double-exposed, unreadable text, not just a subtle
 * blend). A clean sequential cut reads far better than an overlapping fade.
 *
 * The section stays visually parked via CSS `position: sticky` (not GSAP's
 * `pin: true` — this codebase deliberately keeps pinned-scroll effects on
 * plain sticky everywhere, per the cross-browser motion reliability work
 * done earlier: sticky avoids GSAP's pin-spacer DOM insertion, which is one
 * less thing that can interact badly with Lenis). `pinRoot` is the tall
 * scroll-runway wrapper the sticky element lives inside; the ScrollTrigger
 * scrubs across that wrapper's full height. Easing: none (tracks scroll
 * directly — a scrub should never feel like it's "easing" on its own, only
 * the user's own scroll speed should).
 *
 * Template default (and the entire reduced-motion path): phrases stacked in
 * normal document flow, fully visible — a perfectly readable multi-line
 * statement with zero JS. This function only runs for the full-motion path;
 * it measures the tallest phrase first (so collapsing them to `position:
 * absolute` for the sequence doesn't collapse the container's height), then
 * builds the scrub timeline. Reduced motion, and no-JS/SSR, never reach
 * this at all — the default template state already *is* their correct
 * final state, so there's nothing to explicitly set.
 */
export function animateManifestoSequence(gsapInstance: typeof GsapType, { pinRoot, container, phrases, supporting }: ManifestoTargets) {
  const tallest = Math.max(...phrases.map((el) => el.offsetHeight))
  gsapInstance.set(container, { height: tallest })
  gsapInstance.set(phrases, { position: 'absolute', top: 0, left: 0, width: '100%', opacity: 0, y: 28 })
  gsapInstance.set(supporting, { opacity: 0, y: 16 })

  const BEAT = DURATION.slow
  const HOLD = DURATION.base

  const tl = gsapInstance.timeline({
    scrollTrigger: {
      trigger: pinRoot,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      invalidateOnRefresh: true
    }
  })

  let cursor = 0
  phrases.forEach((phrase, i) => {
    const isLast = i === phrases.length - 1
    tl.fromTo(phrase, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: BEAT, ease: 'none' }, cursor)
    cursor += BEAT + HOLD
    if (!isLast) {
      tl.to(phrase, { opacity: 0, y: -28, duration: BEAT, ease: 'none' }, cursor)
      cursor += BEAT
    }
  })

  tl.fromTo(supporting, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: BEAT, ease: 'none' }, cursor + HOLD * 0.5)
}
