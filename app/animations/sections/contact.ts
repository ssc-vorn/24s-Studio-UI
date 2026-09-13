import type { gsap as GsapType } from 'gsap'
import { EASE } from '../constants'

/** Form + information reveal — two columns split in from opposite sides. */
export function revealContact(
  gsapInstance: typeof GsapType,
  targets: { form: Element | null; info: Element | null },
  trigger: Element,
  reduced: boolean
) {
  const tl = gsapInstance.timeline({ scrollTrigger: { trigger, start: 'top 75%' } })

  if (reduced) {
    tl.set([targets.form, targets.info], { opacity: 1, x: 0 })
    return tl
  }

  tl.fromTo(targets.info, { opacity: 0, x: -32 }, { opacity: 1, x: 0, duration: 0.9, ease: EASE.out })
    .fromTo(targets.form, { opacity: 0, x: 32 }, { opacity: 1, x: 0, duration: 0.9, ease: EASE.out }, '-=0.7')

  return tl
}
