import { gsap, ScrollTrigger, SplitText, registerGsap } from '~/animations/core/gsap'

/** Returns the shared, plugin-registered GSAP instance. Client-only usage. */
export function useGsap() {
  registerGsap()
  return { gsap, ScrollTrigger, SplitText }
}
