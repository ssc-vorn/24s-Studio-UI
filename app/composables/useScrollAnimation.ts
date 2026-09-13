import type { gsap as GsapType } from 'gsap'

type ScrollAnimationSetup = (context: {
  gsap: typeof GsapType
  root: HTMLElement
  reduced: boolean
}) => void

/**
 * Scopes a GSAP animation (and any ScrollTriggers it creates) to a root
 * element via `gsap.context()`. The context — and every ScrollTrigger
 * registered inside it — is reverted automatically on unmount, so callers
 * never have to remember cleanup themselves.
 */
export function useScrollAnimation(setup: ScrollAnimationSetup) {
  const root = ref<HTMLElement | null>(null)
  const reduced = useReducedMotion()

  if (import.meta.client) {
    let ctx: ReturnType<typeof GsapType.context> | undefined

    onMounted(() => {
      const { gsap } = useGsap()
      if (!root.value) return
      ctx = gsap.context(() => {
        setup({ gsap, root: root.value as HTMLElement, reduced: reduced.value })
      }, root.value)
    })

    onUnmounted(() => {
      ctx?.revert()
    })
  }

  return { root }
}
