import Lenis from 'lenis'
import { gsap, ScrollTrigger, registerGsap } from '~/animations/core/gsap'

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

  nuxtApp.hook('app:mounted', () => {
    ScrollTrigger.refresh()
  })
})
