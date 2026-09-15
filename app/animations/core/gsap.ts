import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

let registered = false

/** Registers GSAP plugins exactly once for the lifetime of the client bundle. */
export function registerGsap() {
  if (registered) return gsap
  gsap.registerPlugin(ScrollTrigger, SplitText)
  registered = true
  return gsap
}

export { gsap, ScrollTrigger, SplitText }
