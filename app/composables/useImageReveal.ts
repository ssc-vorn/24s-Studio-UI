import { DURATION, EASE } from '~/animations/constants'

interface UseImageRevealOptions {
  /** Continuous scroll-scrubbed drift on the image itself once mounted, independent of the entrance tween below (different element — root vs. inner `<img>` — so the two never fight over the same transform). Off by default. */
  parallax?: boolean
  /** yPercent range for the parallax drift, e.g. 6 → image moves from -6% to +6%. */
  parallaxDistance?: number
  start?: string
}

/**
 * Clip-path + scale entrance for an image, scoped to `root` (the clipping
 * wrapper) — the same two-tween shape already hand-coded in FeaturedCaseStudy,
 * AboutTeaser and SelectedWorkPanel, extracted once here. `root` gets the
 * entrance (clip-path + scale, one tween, no conflict); `imgEl` — a
 * *different* element — optionally gets the continuous parallax drift, so
 * entrance and parallax never animate the same transform on the same node.
 */
export function useImageReveal(root: Ref<HTMLElement | null>, imgEl: Ref<HTMLElement | null>, options: UseImageRevealOptions = {}) {
  const reduced = useReducedMotion()
  let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

  onMounted(() => {
    if (!root.value) return
    const { gsap } = useGsap()

    ctx = gsap.context(() => {
      if (reduced.value) {
        gsap.set(root.value, { clipPath: 'inset(0 0 0% 0)', scale: 1 })
        return
      }

      gsap.fromTo(
        root.value,
        { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
        {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: DURATION.slow,
          ease: EASE.out,
          scrollTrigger: { trigger: root.value, start: options.start ?? 'top 85%' }
        }
      )

      if (options.parallax && imgEl.value) {
        const distance = options.parallaxDistance ?? 6
        gsap.fromTo(
          imgEl.value,
          { yPercent: -distance },
          {
            yPercent: distance,
            ease: 'none',
            scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
          }
        )
      }
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
