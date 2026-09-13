import type { gsap as GsapType } from 'gsap'
import { EASE } from '../constants'

/** Typography + image reveal — the statement scales in while the portrait clips open. */
export function revealAbout(
  gsapInstance: typeof GsapType,
  targets: { statement: Element | null; image: Element | null; meta: Element[] },
  trigger: Element,
  reduced: boolean
) {
  const tl = gsapInstance.timeline({ scrollTrigger: { trigger, start: 'top 70%' } })

  if (reduced) {
    tl.set([targets.statement, targets.image, targets.meta], { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' })
    return tl
  }

  tl.fromTo(targets.statement, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1, ease: EASE.out })
    .fromTo(
      targets.image,
      { clipPath: 'inset(0 0 100% 0)', scale: 1.08 },
      { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.1, ease: EASE.out },
      '-=0.7'
    )
    .fromTo(targets.meta, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: EASE.out }, '-=0.5')

  return tl
}
