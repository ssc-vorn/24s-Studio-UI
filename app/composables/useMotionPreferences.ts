/**
 * Single source of truth for "should motion run right now," composed on top
 * of `useReducedMotion()` rather than re-reading `matchMedia` itself — every
 * composable in app/composables already funnels through that one call, so
 * this doesn't introduce a second reduced-motion check to keep in sync.
 *
 * `supportsMotion` is false whenever motion should not run at all: during
 * SSR (no DOM to animate), or when the browser reports a reduced-motion
 * preference. Components that only need a single boolean gate can use this
 * instead of combining `isClient`/`prefersReducedMotion` themselves.
 */
export function useMotionPreferences() {
  const prefersReducedMotion = useReducedMotion()
  const isClient = import.meta.client
  const supportsMotion = computed(() => isClient && !prefersReducedMotion.value)

  return { prefersReducedMotion, supportsMotion, isClient }
}
