import type { gsap as GsapType } from 'gsap'
import { EASE } from '../constants'

/**
 * PROJECT CARD — scroll — a card's media wipes in first (clip-path + subtle
 * zoom-settle), then its title, then category/year a beat behind. One
 * shared timeline shape reused by Selected Work (home) and the Work archive
 * grid so every project card enters the same way everywhere — the
 * "consistent interaction language" the design calls for.
 * Library: GSAP + ScrollTrigger (per-card trigger, no scrub/pin).
 * Reduced motion: caller should skip calling this and set the final state
 * directly instead (see ProjectPreview's `[data-reveal]` targets).
 */
export function animateCardReveal(gsapInstance: typeof GsapType, card: Element, start = 'top 85%') {
  const media = card.querySelector('[data-reveal="media"]')
  const metaTitle = card.querySelector('[data-reveal="meta-title"]')
  const metaDetail = card.querySelector('[data-reveal="meta-detail"]')

  return gsapInstance
    .timeline({ scrollTrigger: { trigger: card, start } })
    .fromTo(
      media,
      { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
      { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(metaTitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.45')
    .fromTo(metaDetail, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
}

/**
 * HOME / Selected Work — signature cinematic moment (project 01 only) —
 * scroll-scrubbed across a tall pinned runway (CSS `position: sticky`, this
 * codebase's established pin technique — see ManifestoSection/ProcessSection
 * — not GSAP `pin: true`). The image approaches the viewport edges purely
 * via `scale` on an inner wrapper (0.82 → 1) inside a frame whose padding
 * never animates, so the "expanding toward fullscreen" feel costs nothing
 * but a transform; title and metadata overlay in behind it, staggered
 * later in the scrub so they read as arriving *because* the image has
 * become dominant, not simultaneously with it.
 * Library: GSAP + ScrollTrigger, scrub 0.6, linear (scrub already supplies
 * the easing via scroll velocity — an eased scrub tween fights the user's
 * own scroll input).
 * Reduced motion: image settles at full scale, title/meta fully visible,
 * no scrub at all.
 */
export function animateCinematicProject(
  gsapInstance: typeof GsapType,
  targets: { pinRoot: Element; imageWrap: Element; title: Element; meta: Element },
  reduced: boolean
) {
  if (reduced) {
    gsapInstance.set(targets.imageWrap, { scale: 1 })
    gsapInstance.set([targets.title, targets.meta], { opacity: 1, y: 0 })
    return
  }

  return gsapInstance
    .timeline({ scrollTrigger: { trigger: targets.pinRoot, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
    .fromTo(targets.imageWrap, { scale: 0.82 }, { scale: 1, ease: 'none' }, 0)
    .fromTo(targets.title, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none' }, 0.35)
    .fromTo(targets.meta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'none' }, 0.5)
}

interface ReelScene {
  root: Element
  image: Element
  text: Element
}

/**
 * HOME / Selected Work — cinematic scene sequence — every featured project
 * gets the "signature moment" treatment (not just project 01): each scene
 * fills the pinned viewport, then scales/fades out as the next crops/fades
 * in from a slightly larger scale, its text arriving a beat later so the
 * image always reads as leading the transition. Same CSS-sticky pin
 * technique as ManifestoSection/the old single-project cinematic moment —
 * ScrollTrigger only drives the crossfade progress, it never sets `pin`.
 * Library: GSAP + ScrollTrigger, one continuous scrub across the whole
 * pinned runway (no per-scene ScrollTriggers) so the handoff between scenes
 * never stutters against the user's own scroll velocity.
 * Reduced motion: only the first scene renders, at rest — no pin, no scrub.
 */
export function animateCinematicReel(gsapInstance: typeof GsapType, pinRoot: Element, scenes: ReelScene[], reduced: boolean) {
  if (reduced) {
    scenes.forEach((scene, i) => gsapInstance.set(scene.root, { autoAlpha: i === 0 ? 1 : 0 }))
    gsapInstance.set(
      scenes.map((s) => s.text),
      { opacity: 1, y: 0 }
    )
    return
  }

  scenes.forEach((scene, i) => {
    gsapInstance.set(scene.root, { autoAlpha: i === 0 ? 1 : 0 })
    gsapInstance.set(scene.image, { scale: i === 0 ? 1 : 1.18 })
  })

  const tl = gsapInstance.timeline({
    scrollTrigger: { trigger: pinRoot, start: 'top top', end: 'bottom bottom', scrub: 0.7 }
  })

  const segment = 1 / scenes.length

  tl.fromTo(scenes[0]!.text, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: segment * 0.4 }, 0)

  for (let i = 1; i < scenes.length; i++) {
    const outgoing = scenes[i - 1]!
    const incoming = scenes[i]!
    const at = (i - 1) * segment + segment * 0.55

    tl.to(outgoing.text, { opacity: 0, y: -30, ease: 'none', duration: segment * 0.25 }, at)
      .to(outgoing.image, { scale: 1.1, ease: 'none', duration: segment * 0.45 }, at)
      .to(outgoing.root, { autoAlpha: 0, ease: 'none', duration: segment * 0.25 }, at + segment * 0.2)
      .fromTo(incoming.root, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: segment * 0.25 }, at + segment * 0.2)
      .fromTo(incoming.image, { scale: 1.18 }, { scale: 1, ease: 'none', duration: segment * 0.45 }, at + segment * 0.2)
      .fromTo(incoming.text, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: segment * 0.4 }, at + segment * 0.35)
  }
}

/** Phase 1 — outgoing cards. Fast, subtle exit before the dataset swaps. */
export function filterExit(gsapInstance: typeof GsapType, cards: Element[], reduced: boolean) {
  return gsapInstance.timeline().to(cards, {
    opacity: 0,
    y: (i: number) => (i % 2 === 0 ? -10 : 10),
    scale: 0.97,
    duration: reduced ? 0.001 : 0.32,
    stagger: reduced ? 0 : 0.025,
    ease: 'power2.in'
  })
}

/** Phase 3 — incoming cards, staggered in after the filtered dataset renders. */
export function filterEnter(gsapInstance: typeof GsapType, cards: Element[], reduced: boolean) {
  return gsapInstance.timeline().fromTo(
    cards,
    { opacity: 0, y: 30, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: reduced ? 0.001 : 0.6,
      stagger: reduced ? 0 : 0.06,
      ease: EASE.out,
      clearProps: 'transform'
    }
  )
}
