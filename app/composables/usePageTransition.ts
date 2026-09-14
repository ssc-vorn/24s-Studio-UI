import { pageEnter, pageLeave } from '~/animations/core/transitions'
import { refreshScrollTriggerAfterFonts } from '~/animations/core/refresh'

// Vue's <transition> waits indefinitely for `done()` — if the GSAP call that
// was supposed to invoke it throws, or a tween never settles (killed by a
// fast double-navigation, a browser-specific GSAP quirk, anything), the
// element it's transitioning is stuck at its mid-transition opacity forever:
// a blank page with no error the user can see. This ceiling guarantees
// `done()` always fires even in that case, so a broken transition degrades
// to "no animation" instead of "no content."
const FAILSAFE_MS = 1200

function withFailsafe(run: (done: () => void) => void, done: () => void) {
  let settled = false
  const finish = () => {
    if (settled) return
    settled = true
    done()
  }

  const timer = setTimeout(finish, FAILSAFE_MS)

  try {
    run(() => {
      clearTimeout(timer)
      finish()
    })
  } catch (error) {
    if (import.meta.dev) console.error('[motion] page transition failed', error)
    clearTimeout(timer)
    finish()
  }
}

/**
 * GSAP-driven route transition hooks, meant to be spread onto `<NuxtPage :transition>`.
 * Keeping the transition on NuxtPage itself (rather than wrapping it in an
 * external `<Transition>`) preserves Nuxt's own Suspense/RouterView nesting —
 * wrapping it externally trips a "renders non-element root node" Vue warning
 * because that nesting no longer resolves to a single element.
 */
export function usePageTransition() {
  const reduced = useReducedMotion()

  function onLeave(el: Element, done: () => void) {
    if (reduced.value) {
      done()
      return
    }
    withFailsafe((finish) => {
      const { gsap } = useGsap()
      pageLeave(gsap, el, finish)
    }, done)
  }

  function onEnter(el: Element, done: () => void) {
    if (reduced.value) {
      done()
      // New page DOM exists even without motion — recalculate trigger
      // zones against it now.
      refreshScrollTriggerAfterFonts()
      return
    }
    withFailsafe((finish) => {
      const { gsap } = useGsap()
      pageEnter(gsap, el, finish)
    }, () => {
      done()
      // Run after `done()` so this reflects the new page's settled DOM,
      // not the mid-transition (clip-path/translate) state it animates from.
      refreshScrollTriggerAfterFonts()
    })
  }

  return { onLeave, onEnter }
}
