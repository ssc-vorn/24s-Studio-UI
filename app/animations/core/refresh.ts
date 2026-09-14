import { ScrollTrigger } from './gsap'

/**
 * Recalculates ScrollTrigger start/end positions against the DOM as it
 * actually is right now, instead of whatever it measured at trigger-creation
 * time. Needed after anything that can change page height post-creation —
 * a route change mounting a new page, or web fonts swapping in and reflowing
 * clamp()-sized headings — otherwise trigger zones stay pinned to stale
 * coordinates and animations fire at the wrong scroll position (or not
 * within the visible viewport at all).
 */
export function safeRefreshScrollTrigger() {
  if (!import.meta.client) return
  try {
    ScrollTrigger.refresh()
  } catch (error) {
    if (import.meta.dev) console.error('[motion] ScrollTrigger.refresh() failed', error)
  }
}

/**
 * Refreshes once immediately (covers browsers/fonts already loaded) and
 * again once `document.fonts.ready` resolves, so a font swap that happens
 * after the first refresh doesn't leave trigger zones measured against the
 * pre-swap layout. `document.fonts` isn't available in every environment,
 * so this degrades to a single immediate refresh where it's missing.
 */
export function refreshScrollTriggerAfterFonts() {
  if (!import.meta.client) return
  safeRefreshScrollTrigger()

  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
  if (!fonts?.ready) return
  fonts.ready.then(safeRefreshScrollTrigger).catch(() => {})
}
