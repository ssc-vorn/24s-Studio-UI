import type { gsap as GsapType } from 'gsap'
import { DURATION, EASE } from '../constants'

/** Outgoing view: settles back and fades — quick, never blocks navigation. */
export function pageLeave(gsapInstance: typeof GsapType, el: Element, done: () => void) {
  gsapInstance.to(el, {
    opacity: 0,
    scale: 0.985,
    y: -12,
    duration: DURATION.fast,
    ease: EASE.inOut,
    onComplete: done
  })
}

/** Incoming view: a restrained clip-path curtain reveal rather than a plain fade. */
export function pageEnter(gsapInstance: typeof GsapType, el: Element, done?: () => void) {
  gsapInstance.fromTo(
    el,
    { opacity: 0, y: 16, clipPath: 'inset(0 0 6% 0)' },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: DURATION.slow,
      ease: EASE.out,
      onComplete: done
    }
  )
}
