import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

/**
 * HOME / Creative Process — scroll — active stage tracks scroll position.
 * Library: GSAP ScrollTrigger (no scrub, no pin — each stage owns its own
 * trigger zone in normal document flow, so the section degrades to a plain
 * stacked list if ScrollTrigger fails to init for any reason).
 * Mobile: identical logic, shorter trigger band.
 * Reduced motion: not registered — all stages render at equal, full opacity.
 */
export function trackActiveStage(scrollTrigger: typeof ScrollTriggerType, stages: Element[], onActivate: (index: number) => void) {
  stages.forEach((stage, index) => {
    scrollTrigger.create({
      trigger: stage,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => onActivate(index),
      onEnterBack: () => onActivate(index)
    })
  })
}
