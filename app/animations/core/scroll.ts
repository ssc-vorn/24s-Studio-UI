import type { ScrollTrigger } from 'gsap/ScrollTrigger'

export type ScrollTriggerVars = ScrollTrigger.Vars

export function defaultTriggerVars(
  trigger: Element | string,
  overrides: ScrollTriggerVars = {}
): ScrollTriggerVars {
  return {
    trigger,
    start: 'top 82%',
    toggleActions: 'play none none reverse',
    ...overrides
  }
}
