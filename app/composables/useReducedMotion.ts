/**
 * Reactive wrapper around `prefers-reduced-motion`. SSR-safe: defaults to
 * `false` on the server and hydrates to the real value on mount.
 */
export function useReducedMotion() {
  const prefersReduced = usePreferredReducedMotion()
  return computed(() => prefersReduced.value === 'reduce')
}
