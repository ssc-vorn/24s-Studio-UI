import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/** Registers GSAP plugins exactly once for the lifetime of the client bundle. */
export function registerGsap() {
  if (registered) return gsap
  gsap.registerPlugin(ScrollTrigger)
  registered = true
  return gsap
}

export { gsap, ScrollTrigger }
