import type { SplitText as SplitTextType } from 'gsap/SplitText'
import { DURATION, EASE, STAGGER } from '~/animations/constants'

interface UseSplitTextOptions {
  /** GSAP SplitText's own split unit(s), e.g. 'lines', 'words', 'lines,words'. Default 'lines'. */
  type?: 'lines' | 'words' | 'chars' | string
  stagger?: number
  duration?: number
  start?: string
}

/**
 * Scroll-triggered line/word/char reveal for a text block, built on GSAP's
 * SplitText (free since GSAP 3.13 — no Club GreenSock membership required).
 * `mask: 'lines'` wraps each split unit in an overflow-hidden mask div, so a
 * line genuinely rises out of a clipped band rather than just fading in —
 * the same "physically released into the viewport" feel Hero's headline
 * already has via hand-coded per-line spans, but for text whose line count
 * isn't fixed ahead of time (CMS copy, anything not hard-coded per line in
 * the template).
 *
 * SplitText mutates the container's DOM (wraps text in spans) to do this,
 * so cleanup matters more here than a typical reveal: `split.revert()` is
 * called explicitly on unmount (in addition to `gsap.context().revert()`
 * for the tween/ScrollTrigger it created) to restore the original text
 * nodes, not just kill the animation.
 */
export function useSplitText(container: Ref<HTMLElement | null>, options: UseSplitTextOptions = {}) {
  const reduced = useReducedMotion()
  let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined
  let split: SplitTextType | undefined

  onMounted(() => {
    const el = container.value
    if (!el) return

    const { gsap, SplitText } = useGsap()

    if (reduced.value) {
      gsap.set(el, { opacity: 1 })
      return
    }

    ctx = gsap.context(() => {
      split = new SplitText(el, { type: options.type ?? 'lines', mask: 'lines' })
      const targets = split.lines.length ? split.lines : el

      gsap.set(targets, { opacity: 0, y: 32 })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: options.duration ?? DURATION.base,
        stagger: options.stagger ?? STAGGER.base,
        ease: EASE.out,
        scrollTrigger: { trigger: el, start: options.start ?? 'top 80%' }
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
    split?.revert()
  })
}
