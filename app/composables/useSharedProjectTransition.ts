export interface SharedProjectTransitionSource {
  slug: string
  rect: DOMRect
  src: string
  objectPosition: string
  borderRadius: string
}

interface DestinationRequest {
  slug: string
  el: HTMLElement
}

/**
 * Module-level singleton, deliberately not per-component state: the click
 * that captures the source project image and the Case Study page that
 * resolves it into its hero image are two entirely different component
 * trees on opposite sides of a route change (`mode: 'out-in'` fully
 * unmounts the Work page before the Case Study page mounts) — nothing
 * scoped to either component's lifecycle could carry this across.
 *
 * This is an additive layer on top of the existing verified page
 * transition (`usePageTransition`), not a replacement — it knows nothing
 * about `onLeave`/`onEnter` and never blocks them. If nothing ever
 * consumes a capture (direct URL visit, browser back/forward, a route
 * that isn't a case study, or the visitor prefers reduced motion), it
 * silently times out and the normal page transition is all that ran.
 */
const pending = ref<SharedProjectTransitionSource | null>(null)
const destinationRequest = ref<DestinationRequest | null>(null)
let clearTimer: ReturnType<typeof setTimeout> | undefined

const PENDING_TIMEOUT_MS = 4000

export function useSharedProjectTransition() {
  function capture(slug: string, imgEl: HTMLImageElement | null) {
    if (!import.meta.client || !imgEl) return
    const rect = imgEl.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const computed = getComputedStyle(imgEl)
    pending.value = {
      slug,
      rect,
      src: imgEl.currentSrc || imgEl.src,
      objectPosition: computed.objectPosition,
      borderRadius: computed.borderRadius
    }

    clearTimeout(clearTimer)
    clearTimer = setTimeout(reset, PENDING_TIMEOUT_MS)
  }

  /** Called by the Case Study hero once it has mounted and laid out. No-ops if there's no matching capture. */
  function requestDestination(slug: string, el: HTMLElement | null) {
    if (!el || pending.value?.slug !== slug) return
    destinationRequest.value = { slug, el }
  }

  function reset() {
    clearTimeout(clearTimer)
    pending.value = null
    destinationRequest.value = null
  }

  return { pending, destinationRequest, capture, requestDestination, reset }
}
