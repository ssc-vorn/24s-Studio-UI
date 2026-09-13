import { pageEnter, pageLeave } from '~/animations/core/transitions'

/**
 * GSAP-driven route transition hooks, meant to be spread onto `<NuxtPage :transition>`.
 * Keeping the transition on NuxtPage itself (rather than wrapping it in an
 * external `<Transition>`) preserves Nuxt's own Suspense/RouterView nesting —
 * wrapping it externally trips a "renders non-element root node" Vue warning
 * because that nesting no longer resolves to a single element.
 */
export function usePageTransition() {
  const reduced = useReducedMotion()

  function onLeave(el: Element, done: () => void) {
    if (reduced.value) {
      done()
      return
    }
    const { gsap } = useGsap()
    pageLeave(gsap, el, done)
  }

  function onEnter(el: Element, done: () => void) {
    if (reduced.value) {
      done()
      return
    }
    const { gsap } = useGsap()
    pageEnter(gsap, el, done)
  }

  return { onLeave, onEnter }
}
