/** Clamps device pixel ratio to keep high-DPI displays from tanking WebGL performance. */
export function getSafeDpr(maxDpr = 2) {
  if (typeof window === 'undefined') return 1
  return Math.min(window.devicePixelRatio || 1, maxDpr)
}
