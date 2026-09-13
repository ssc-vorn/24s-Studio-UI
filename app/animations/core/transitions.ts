import type { gsap as GsapType } from 'gsap'
import { DURATION, EASE } from '../constants'

export function pageLeave(gsapInstance: typeof GsapType, el: Element, done: () => void) {
  gsapInstance.to(el, {
    opacity: 0,
    y: -16,
    duration: DURATION.fast,
    ease: EASE.inOut,
    onComplete: done
  })
}

export function pageEnter(gsapInstance: typeof GsapType, el: Element, done?: () => void) {
  gsapInstance.fromTo(
    el,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: DURATION.base, ease: EASE.out, onComplete: done }
  )
}
