interface ParallaxOptions {
  distance?: number
  scrub?: number | boolean
}

/**
 * Applies a subtle vertical parallax to `target`, scoped to `container`'s
 * scroll range. No-ops entirely under reduced-motion.
 */
export function useParallax(
  container: Ref<HTMLElement | null>,
  target: Ref<HTMLElement | null>,
  { distance = 80, scrub = 0.6 }: ParallaxOptions = {}
) {
  const reduced = useReducedMotion()

  if (import.meta.client) {
    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    onMounted(() => {
      if (reduced.value || !container.value || !target.value) return
      const { gsap, ScrollTrigger } = useGsap()
      ctx = gsap.context(() => {
        gsap.fromTo(
          target.value,
          { y: -distance },
          {
            y: distance,
            ease: 'none',
            scrollTrigger: {
              trigger: container.value,
              start: 'top bottom',
              end: 'bottom top',
              scrub
            }
          }
        )
      })
      ScrollTrigger.refresh()
    })

    onUnmounted(() => {
      ctx?.revert()
    })
  }
}
