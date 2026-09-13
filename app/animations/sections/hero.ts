import type { gsap as GsapType } from 'gsap'
import { DURATION, EASE, STAGGER } from '../constants'

interface HeroTargets {
  eyebrow: Element | null
  headingLines: Element[]
  paragraph: Element | null
  cta: Element | null
}

/** Cinematic entrance timeline for the hero — the site's strongest visual moment. */
export function animateHeroEntrance(gsapInstance: typeof GsapType, targets: HeroTargets, reduced: boolean) {
  const tl = gsapInstance.timeline({ defaults: { ease: EASE.out } })

  if (reduced) {
    tl.set([targets.eyebrow, targets.headingLines, targets.paragraph, targets.cta], { opacity: 1, y: 0 })
    return tl
  }

  tl.fromTo(targets.eyebrow, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: DURATION.base })
    .fromTo(
      targets.headingLines,
      { opacity: 0, y: 64, rotateX: 8 },
      { opacity: 1, y: 0, rotateX: 0, duration: DURATION.cinematic, stagger: STAGGER.loose },
      '-=0.3'
    )
    .fromTo(targets.paragraph, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: DURATION.base }, '-=0.6')
    .fromTo(targets.cta, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: DURATION.base }, '-=0.5')

  return tl
}
