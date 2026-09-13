import type { gsap as GsapType } from 'gsap'

interface MagneticOptions {
  strength?: number
}

/**
 * Attaches a magnetic hover effect to an element. Returns a cleanup function.
 * Caller owns the gsap instance so this stays free of module-level GSAP imports.
 */
export function attachMagnetic(
  gsapInstance: typeof GsapType,
  el: HTMLElement,
  { strength = 0.35 }: MagneticOptions = {}
) {
  const quickX = gsapInstance.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
  const quickY = gsapInstance.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

  function onMove(event: PointerEvent) {
    const rect = el.getBoundingClientRect()
    const relX = event.clientX - (rect.left + rect.width / 2)
    const relY = event.clientY - (rect.top + rect.height / 2)
    quickX(relX * strength)
    quickY(relY * strength)
  }

  function onLeave() {
    quickX(0)
    quickY(0)
  }

  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', onLeave)

  return () => {
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', onLeave)
  }
}
