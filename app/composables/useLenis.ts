import type Lenis from 'lenis'

const NAV_OFFSET = 88

/**
 * Accesses the single app-wide Lenis instance created in
 * `plugins/lenis.client.ts` and exposes an anchor-aware `scrollTo` helper
 * that falls back to native smooth scrolling when Lenis is disabled
 * (reduced-motion) or during SSR.
 */
export function useLenis() {
  const nuxtApp = useNuxtApp()

  function getInstance(): Lenis | null {
    return (nuxtApp.$lenis as Lenis | null) ?? null
  }

  function scrollTo(target: string | HTMLElement, options: { offset?: number } = {}) {
    if (!import.meta.client) return
    const offset = -(options.offset ?? NAV_OFFSET)
    const lenis = getInstance()

    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.2 })
      return
    }

    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return { lenis: getInstance(), scrollTo }
}
