import type { gsap as GsapType } from 'gsap'
import { DURATION } from '../constants'

interface HeroEntranceTargets {
  background: Element | null
  eyebrow: Element | null
  headingLines: Element[]
  paragraph: Element | null
  ctas: Element | null
  clientsLabel: Element | null
  clientsList: Element[]
  scrollIndicator: Element | null
}

/**
 * HOME / Hero — page load — cinematic entrance, timed to an explicit
 * schedule (absolute positions, not relative offsets) rather than this
 * codebase's usual "-=X" chaining: background 0 → eyebrow 0.35s → each
 * headline line 0.45/0.58/0.70s → paragraph 0.90s → CTAs 1.05s → clients
 * label 1.15s → client wordmarks 1.25s, landing everything by ~1.6s total.
 * Headline lines are GSAP SplitText `.lines` (mask-wrapped by SplitText
 * itself), so this only tweens opacity/y — the clip reveal is already the
 * mask, not a second clip-path animation on top of it.
 * Library: GSAP. Easing: power3/power4.out throughout, no bounce/overshoot.
 * Reduced motion: every target snaps directly to its resting state.
 */
export function animateHeroEntrance(gsapInstance: typeof GsapType, targets: HeroEntranceTargets, reduced: boolean) {
  const tl = gsapInstance.timeline({ defaults: { ease: 'power3.out' } })

  if (reduced) {
    tl.set(
      [
        targets.background,
        targets.eyebrow,
        ...targets.headingLines,
        targets.paragraph,
        targets.ctas,
        targets.clientsLabel,
        ...targets.clientsList,
        targets.scrollIndicator
      ],
      { opacity: 1, y: 0, scale: 1 }
    )
    return tl
  }

  tl.fromTo(targets.background, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' }, 0)
    .fromTo(targets.eyebrow, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: DURATION.fast }, 0.35)

  targets.headingLines.forEach((line, index) => {
    tl.fromTo(line, { opacity: 0, y: 56 }, { opacity: 1, y: 0, duration: 0.5 }, 0.45 + index * 0.13)
  })

  tl.fromTo(targets.paragraph, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: DURATION.fast }, 0.9)
    .fromTo(targets.ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: DURATION.fast }, 1.05)
    .fromTo(targets.clientsLabel, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 1.15)

  if (targets.clientsList.length) {
    tl.fromTo(targets.clientsList, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04 }, 1.25)
  }

  if (targets.scrollIndicator) {
    tl.fromTo(targets.scrollIndicator, { opacity: 0 }, { opacity: 1, duration: DURATION.fast }, 1.3)
  }

  return tl
}

interface HeroExitTargets {
  trigger: Element
  heading: Element | null
  paragraph: Element | null
  ctas: Element | null
  trustLayer: Element | null
}

/**
 * HOME / Hero — scroll (scrub) — as the user scrolls the Hero out of view,
 * headline/copy/CTA fade and lift while the trust layer only dims to 50%
 * opacity rather than disappearing (it's read as credibility, not primary
 * content, and the brief is explicit it should quiet down, not vanish).
 * Independent ScrollTrigger from the entrance timeline above (which has
 * none — it plays once on mount) and from the existing continuous
 * background-zoom scrub in HeroContent.vue (different elements — text
 * layers here, the background image there — so neither fights the other
 * for control of the same transform).
 * Reduced motion: caller should skip calling this entirely.
 */
export function animateHeroExit(gsapInstance: typeof GsapType, targets: HeroExitTargets) {
  return gsapInstance
    .timeline({ scrollTrigger: { trigger: targets.trigger, start: 'top top', end: 'bottom top', scrub: 0.6 } })
    .to(targets.heading, { y: -80, opacity: 0, ease: 'none' }, 0)
    .to(targets.paragraph, { y: -40, opacity: 0, ease: 'none' }, 0.05)
    .to(targets.ctas, { opacity: 0, ease: 'none' }, 0.1)
    .to(targets.trustLayer, { y: -20, opacity: 0.5, ease: 'none' }, 0.15)
}
