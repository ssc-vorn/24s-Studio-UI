import type { gsap as GsapType } from 'gsap'
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

/**
 * HOME / Creative Process — scroll — a vertical fill line tracks how far the
 * user has scrolled through the full stage list, as the section's progress
 * indicator. Set directly via ScrollTrigger's `onUpdate` (bypassing Vue
 * reactivity) so it stays smooth at scroll-frame rate without re-rendering.
 * Library: GSAP ScrollTrigger (scrub). Reduced motion: fill snaps to full.
 */
export function trackStageProgress(gsapInstance: typeof GsapType, fillEl: Element, trigger: Element, reduced: boolean) {
  if (reduced) {
    gsapInstance.set(fillEl, { scaleY: 1 })
    return
  }
  gsapInstance.set(fillEl, { scaleY: 0, transformOrigin: 'top center' })
  gsapInstance.to(fillEl, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger, start: 'top 55%', end: 'bottom 45%', scrub: 0.3 }
  })
}

/**
 * HOME / Creative Process — scroll — when the active stage changes, the
 * outgoing sticky-panel visual settles back and fades, the incoming one
 * wipes in via clip-path with a slight scale-out-of-zoom (matching the
 * Featured Case Study's image-reveal language), and both titles nudge
 * between a dimmed/resting state and full presence.
 * Library: GSAP (direct tween on state change, not scrubbed — the change
 * itself is discrete, but the tween makes it read as continuous).
 * Duration: ~0.6–0.8s. Easing: power2/power3 out.
 */
export function animateStageChange(
  gsapInstance: typeof GsapType,
  visuals: Element[],
  titles: Element[],
  activeIndex: number,
  previousIndex: number
) {
  const previousVisual = previousIndex >= 0 ? visuals[previousIndex] : undefined
  const previousTitle = previousIndex >= 0 ? titles[previousIndex] : undefined
  if (previousIndex !== activeIndex && previousVisual && previousTitle) {
    gsapInstance.to(previousVisual, { opacity: 0, scale: 1.04, duration: 0.6, ease: 'power2.out' })
    gsapInstance.to(previousTitle, { opacity: 0.4, scale: 0.98, duration: 0.5, ease: 'power2.out' })
  }

  const activeVisual = visuals[activeIndex]
  const activeTitle = titles[activeIndex]
  if (!activeVisual || !activeTitle) return

  gsapInstance.fromTo(
    activeVisual,
    { opacity: 0, scale: 1.06, clipPath: 'inset(0 0 100% 0)' },
    { opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power3.out' }
  )
  gsapInstance.to(activeTitle, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' })
}
