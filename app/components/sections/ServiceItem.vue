<script setup lang="ts">
import type { Service } from '~/types/service'

interface Props {
  service: Service
  /** Sets the sticky offset so each card pins slightly lower than the one before it, letting a sliver of the earlier cards peek out above the current one as they stack. */
  index: number
}

defineProps<Props>()

const { isDesktop } = useBreakpoints()

const OPEN = {
  bg: '#050608',
  border: 'rgba(5,6,8,0)',
  text: '#ffffff',
  summary: 'rgba(255,255,255,0.75)',
  tag: 'rgba(255,255,255,0.7)',
  tagBorder: 'rgba(255,255,255,0.25)',
  indexColor: 'rgba(255,255,255,0.16)'
}
const CLOSED = {
  bg: '#f5f5f2',
  border: 'rgba(11,13,18,0.1)',
  text: '#0b0d12',
  summary: 'rgba(11,13,18,0.6)',
  tag: 'rgba(11,13,18,0.6)',
  tagBorder: 'rgba(11,13,18,0.2)',
  indexColor: 'rgba(11,13,18,0.16)'
}

/**
 * A scroll-scrubbed open, not a threshold snap: the card's own scroll
 * position continuously drives how open it is (GSAP ScrollTrigger scrub),
 * so scrolling fast opens it fast, scrolling slowly opens it slowly, and
 * scrolling back closes it back proportionally — genuinely interactive
 * rather than a discrete trigger playing a fixed-duration transition.
 * Template defaults to the closed (title-only) state for SSR/no-JS safety;
 * reduced motion skips the scrub and settles permanently open instead of
 * leaving an unopenable title-only tab.
 *
 * The motion here is untouched from prior rounds — the visual layout it
 * drives is what changed: a giant ghost-numeral watermark instead of a
 * small corner label, and a two-column split (summary / capabilities as a
 * right-aligned underlined list) instead of a single stacked column with
 * bordered tag chips. Every element the timeline below targets keeps its
 * data-* hook regardless of layout, so none of this needed to change.
 */
const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const card = root.querySelector<HTMLElement>('[data-card]')
  const content = root.querySelector<HTMLElement>('[data-content]')
  const gradient = root.querySelector<HTMLElement>('[data-gradient]')
  const detailWrap = root.querySelector<HTMLElement>('[data-detail-wrap]')
  const detailInner = root.querySelector<HTMLElement>('[data-detail-inner]')
  const summary = root.querySelector<HTMLElement>('[data-summary]')
  const tags = Array.from(root.querySelectorAll<HTMLElement>('[data-tag]'))
  const indexEl = root.querySelector<HTMLElement>('[data-index]')
  if (!card || !content || !gradient || !detailWrap || !detailInner || !summary || !indexEl) return

  const paddingClosed = isDesktop.value ? 36 : 28
  const paddingOpen = isDesktop.value ? 56 : 48

  if (reduced) {
    gsap.set(card, { backgroundColor: OPEN.bg, borderColor: OPEN.border, color: OPEN.text })
    gsap.set(content, { paddingBottom: paddingOpen })
    gsap.set(gradient, { opacity: 1 })
    gsap.set(detailWrap, { height: 'auto' })
    gsap.set(detailInner, { opacity: 1 })
    gsap.set(summary, { color: OPEN.summary })
    gsap.set(tags, { color: OPEN.tag, borderColor: OPEN.tagBorder })
    gsap.set(indexEl, { color: OPEN.indexColor })
    return
  }

  // Measured fresh each time the tween starts (function-based value, with
  // ScrollTrigger set to invalidate and re-measure on refresh) rather than
  // captured once up front — robust against layout not having fully
  // settled yet (fonts, wrapped capability tags) at mount time. A few
  // spare pixels guard against sub-pixel rounding clipping the last row.
  const measureHeight = () => detailInner.scrollHeight + 2

  // Scroll-scrubbed over a short, snappy distance — with ServiceList's tight
  // per-card runway, a wider zone here left almost no separation between
  // consecutive cards' transitions (each one's zone started well before the
  // previous had finished), so cards further down the stack cascaded open
  // almost simultaneously and read as unresponsive. Narrower zone completes
  // each card's own transition faster, freeing up genuine settled scroll
  // distance before the next card's zone begins.
  //
  // Deliberate exception to the transform/opacity/clip-path rule the rest of
  // the motion system follows: color/backgroundColor/borderColor/padding are
  // paint-only (no reflow), but `detailWrap`'s `height` genuinely triggers
  // layout every frame. There's no compositor-only equivalent for "the card
  // physically grows as its content becomes visible," which is the actual
  // effect wanted here — a `maxHeight` cap or `clipPath` substitute would
  // either need a hardcoded upper bound (breaks with dynamic content/font
  // size) or lose the height-driven reflow entirely. Kept intentionally,
  // scoped to this one component, over a short/narrow scrub zone rather than
  // a long free-running tween.
  gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: 'top 62%',
      end: 'top 48%',
      scrub: 0.5,
      invalidateOnRefresh: true
    }
  })
    .fromTo(card, { backgroundColor: CLOSED.bg, borderColor: CLOSED.border, color: CLOSED.text }, { backgroundColor: OPEN.bg, borderColor: OPEN.border, color: OPEN.text, ease: 'none' }, 0)
    .fromTo(content, { paddingBottom: paddingClosed }, { paddingBottom: paddingOpen, ease: 'none' }, 0)
    .fromTo(gradient, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
    .fromTo(detailWrap, { height: 0 }, { height: measureHeight, ease: 'none' }, 0)
    .fromTo(detailInner, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
    .fromTo(summary, { color: CLOSED.summary }, { color: OPEN.summary, ease: 'none' }, 0)
    .fromTo(tags, { color: CLOSED.tag, borderColor: CLOSED.tagBorder }, { color: OPEN.tag, borderColor: OPEN.tagBorder, ease: 'none' }, 0)
    .fromTo(indexEl, { color: CLOSED.indexColor }, { color: OPEN.indexColor, ease: 'none' }, 0)
})
</script>

<template>
  <div ref="root" class="sticky" :style="{ top: `calc(var(--nav-height) + ${index * 1}rem)` }">
    <div
      data-card
      class="relative overflow-hidden rounded-3xl border"
      style="background-color: #f5f5f2; border-color: rgba(11,13,18,0.1); color: #0b0d12"
    >
      <div
        data-gradient
        class="pointer-events-none absolute inset-y-0 right-0 w-2/5 opacity-0"
        style="background: linear-gradient(100deg, transparent 20%, rgb(255 255 255 / 0.12) 100%)"
        aria-hidden="true"
      />

      <div data-content class="relative px-8 pt-7 pb-7 lg:px-12 lg:pt-9 lg:pb-9">
        <div class="flex items-start justify-between gap-4">
          <h3 class="text-heading max-w-xl">{{ service.title }}</h3>
          <span
            data-index
            class="pointer-events-none shrink-0 font-serif text-[2.25rem] leading-none font-light select-none lg:text-[4.75rem]"
            style="color: rgba(11,13,18,0.16)"
            aria-hidden="true"
          >
            {{ service.index }}
          </span>
        </div>

        <div data-detail-wrap class="overflow-hidden" style="height: 0">
          <div data-detail-inner style="opacity: 0">
            <div class="grid gap-6 pt-6 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
              <p data-summary class="text-body-lg max-w-md" style="color: rgba(11,13,18,0.6)">
                {{ service.summary }}
              </p>

              <ul class="flex flex-col gap-3 lg:items-end">
                <li
                  v-for="capability in service.capabilities"
                  :key="capability"
                  data-tag
                  class="text-label border-b pb-2 text-right lg:whitespace-nowrap"
                  style="color: rgba(11,13,18,0.6); border-color: rgba(11,13,18,0.2)"
                >
                  {{ capability }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
