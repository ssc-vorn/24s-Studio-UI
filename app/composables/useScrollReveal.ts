import type { RevealVariant } from '~/animations/core/reveal'
import { revealFrom, revealTo } from '~/animations/core/reveal'

interface ScrollRevealOptions {
  variant?: RevealVariant
  delay?: number
  stagger?: number
  start?: string
  /** Reveal `container`'s direct children (staggered) instead of the container itself. */
  staggerChildren?: boolean
  once?: boolean
}

/**
 * Scroll-triggered reveal for a single element, or for a container's direct
 * children when `staggerChildren` is set. Backs `ui/Reveal.vue` and
 * `ui/ScrollReveal.vue` so every scroll-reveal in the app shares one
 * gsap.context()-scoped implementation, cleaned up automatically on unmount.
 */
export function useScrollReveal(container: Ref<HTMLElement | null>, options: ScrollRevealOptions = {}) {
  const reduced = useReducedMotion()
  let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

  onMounted(() => {
    const root = container.value
    if (!root) return

    const targets: Element | Element[] = options.staggerChildren ? Array.from(root.children) : root
    if (Array.isArray(targets) && !targets.length) return

    const { gsap } = useGsap()
    const variant = options.variant ?? 'fade-up'

    ctx = gsap.context(() => {
      if (reduced.value) {
        gsap.set(targets, { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' })
        return
      }

      gsap.set(targets, revealFrom(variant))
      gsap.to(targets, {
        ...revealTo(gsap, variant, { delay: options.delay ?? 0, stagger: options.stagger ?? 0 }),
        scrollTrigger: {
          trigger: root,
          start: options.start ?? 'top 85%',
          toggleActions: options.once === false ? 'play none none reverse' : 'play none none none'
        }
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
