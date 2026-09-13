export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const ratio = (value - inMin) / (inMax - inMin)
  return outMin + ratio * (outMax - outMin)
}

/** Normalizes a pointer/client position to the -1..1 range used by the WebGL scene. */
export function normalizePointer(x: number, y: number, width: number, height: number) {
  return {
    x: (x / width) * 2 - 1,
    y: -(y / height) * 2 + 1
  }
}
