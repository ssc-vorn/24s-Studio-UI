import { attachMagnetic } from '~/animations/core/hover'

interface UseMagneticOptions {
  strength?: number
}

type MagneticTarget = HTMLElement | { $el: HTMLElement } | null

/** Attaches the magnetic hover effect to a template ref, cleaned up on unmount. No-ops under reduced motion. */
export function useMagnetic(target: Ref<MagneticTarget>, options: UseMagneticOptions = {}) {
  const reduced = useReducedMotion()
  let cleanup: (() => void) | undefined

  onMounted(() => {
    const el = target.value instanceof HTMLElement ? target.value : (target.value?.$el as HTMLElement | undefined)
    if (reduced.value || !el) return
    const { gsap } = useGsap()
    cleanup = attachMagnetic(gsap, el, options)
  })

  onUnmounted(() => {
    cleanup?.()
  })
}
