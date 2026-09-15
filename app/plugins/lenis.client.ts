import Lenis from 'lenis'
import { gsap, ScrollTrigger, registerGsap } from '~/animations/core/gsap'
import { refreshScrollTriggerAfterFonts } from '~/animations/core/refresh'

/**
 * Created once for the app's entire session — this plugin runs a single
 * time on initial load, not per-route, so there's no teardown/recreate path
 * for the Lenis instance (no `.destroy()` call exists anywhere). That's
 * correct for the app's only current motion switch, the OS-level
 * `prefers-reduced-motion` media query, which is read once here before
 * Lenis is ever constructed. It would stop being correct if the app grew an
 * in-app "reduce motion" toggle that needs to flip Lenis on/off at runtime —
 * that feature doesn't exist today, but implementing it would need this
 * plugin restructured around a re-creatable instance, not just a one-line
 * settings check.
 */
export default defineNuxtPlugin((nuxtApp) => {
  registerGsap()

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const lenis = prefersReduced
    ? null
    : new Lenis({
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.1
      })

  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  }

  nuxtApp.provide('lenis', lenis)

  // Initial load only: page-to-page refreshes happen in usePageTransition
  // once the new page's DOM has actually mounted. `app:mounted` fires once,
  // before web fonts may have swapped in — refreshing again once fonts
  // settle catches the reflow those clamp()-sized headings can cause.
  nuxtApp.hook('app:mounted', () => {
    refreshScrollTriggerAfterFonts()
  })
})
