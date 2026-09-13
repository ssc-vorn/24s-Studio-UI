import type { gsap as GsapType } from 'gsap'

/**
 * HOME / Manifesto — scroll — word-by-word reveal scrubbed to scroll position.
 * Library: GSAP + ScrollTrigger (scrub). Easing: none (tracks scroll directly).
 * Mobile: identical, just a shorter scroll distance since the block is narrower.
 * Reduced motion: words render at full opacity immediately, no scrub.
 */
export function animateManifestoReveal(gsapInstance: typeof GsapType, words: Element[], trigger: Element, reduced: boolean) {
  if (reduced) {
    gsapInstance.set(words, { opacity: 1 })
    return
  }

  gsapInstance.set(words, { opacity: 0.18 })
  gsapInstance.to(words, {
    opacity: 1,
    stagger: 0.02,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top 75%',
      end: 'bottom 55%',
      scrub: 0.4
    }
  })
}
