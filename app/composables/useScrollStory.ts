import type { gsap as GsapType } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

export interface ScrollStoryContext {
  gsap: typeof GsapType
  ScrollTrigger: typeof ScrollTriggerType
  root: HTMLElement
  reduced: boolean
  stages: HTMLElement[]
}

interface UseScrollStoryOptions {
  /** Selector (within root) for each stage's own scroll-trigger zone. Default `[data-story-stage]`. */
  stageSelector?: string
  /** Selector (within root) for an optional progress-fill element whose `scaleY` tracks scroll through the stage list. Default `[data-story-progress]`. */
  progressSelector?: string
  /**
   * Called once on mount with the resolved stage elements. Return an
   * `onChange` callback to animate whatever visual/typography state the
   * section wants to crossfade when the active stage changes.
   */
  setup: (context: ScrollStoryContext) => { onChange?: (activeIndex: number, previousIndex: number) => void } | void
}

/**
 * Reusable "sequential story reveal" behavior: tracks which of N stage
 * elements is active as the user scrolls past them (discrete ScrollTrigger
 * zones, not scrub/pin — the underlying content stays in normal document
 * flow, so a section built on this degrades to a plain stacked list if GSAP
 * fails to init), optionally drives a scroll-scrubbed progress fill, and
 * hands the caller an `onChange` hook for its own crossfade animation.
 * Backs ProcessSection, the Home Services scroll progression and the Case
 * Study sticky-media narrative — the tracking machinery is written once
 * here; each section only supplies what changes when its active stage does.
 * Reduced motion: `activeIndex` flips to a sentinel (-1) so no single stage
 * reads as singled out; a progress fill (if present) snaps to full.
 */
export function useScrollStory(options: UseScrollStoryOptions) {
  const activeIndex = ref(0)

  const { root } = useScrollAnimation(({ gsap, root, reduced, ScrollTrigger }) => {
    const stageSelector = options.stageSelector ?? '[data-story-stage]'
    const progressSelector = options.progressSelector ?? '[data-story-progress]'
    const stages = Array.from(root.querySelectorAll<HTMLElement>(stageSelector))
    const progressEl = root.querySelector(progressSelector)

    const result = options.setup({ gsap, root, reduced, ScrollTrigger, stages })
    const onChange = result?.onChange

    if (progressEl) {
      if (reduced || !stages.length) {
        gsap.set(progressEl, { scaleY: 1 })
      } else {
        gsap.set(progressEl, { scaleY: 0, transformOrigin: 'top center' })
        gsap.to(progressEl, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: stages[0],
            endTrigger: stages[stages.length - 1],
            start: 'top 55%',
            end: 'bottom 45%',
            scrub: 0.3
          }
        })
      }
    }

    if (reduced) {
      activeIndex.value = -1
      return
    }

    if (!stages.length) return

    let previousIndex = 0

    function activate(index: number) {
      if (index === activeIndex.value) return
      onChange?.(index, previousIndex)
      previousIndex = index
      activeIndex.value = index
    }

    stages.forEach((stage, index) => {
      ScrollTrigger.create({
        trigger: stage,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => activate(index),
        onEnterBack: () => activate(index)
      })
    })
  })

  return { root, activeIndex }
}
