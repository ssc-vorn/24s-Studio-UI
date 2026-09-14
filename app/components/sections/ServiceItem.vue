<script setup lang="ts">
import type { Service } from '~/types/service'

interface Props {
  service: Service
  /** Sets the sticky offset so each card pins slightly lower than the one before it, letting a sliver of the earlier cards peek out above the current one as they stack. */
  index: number
}

defineProps<Props>()

const OPEN = {
  bg: '#050608',
  border: 'rgba(5,6,8,0)',
  text: '#ffffff',
  summary: 'rgba(255,255,255,0.75)',
  tag: 'rgba(255,255,255,0.7)',
  tagBorder: 'rgba(255,255,255,0.25)',
  indexColor: 'rgba(255,255,255,0.45)'
}
const CLOSED = {
  bg: '#f5f5f2',
  border: 'rgba(11,13,18,0.1)',
  text: '#0b0d12',
  summary: 'rgba(11,13,18,0.6)',
  tag: 'rgba(11,13,18,0.6)',
  tagBorder: 'rgba(11,13,18,0.2)',
  indexColor: 'rgba(11,13,18,0.45)'
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
 */
const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const card = root.querySelector<HTMLElement>('[data-card]')
  const gradient = root.querySelector<HTMLElement>('[data-gradient]')
  const detailWrap = root.querySelector<HTMLElement>('[data-detail-wrap]')
  const detailInner = root.querySelector<HTMLElement>('[data-detail-inner]')
  const summary = root.querySelector<HTMLElement>('[data-summary]')
  const tags = Array.from(root.querySelectorAll<HTMLElement>('[data-tag]'))
  const indexEl = root.querySelector<HTMLElement>('[data-index]')
  if (!card || !gradient || !detailWrap || !detailInner || !summary || !indexEl) return

  if (reduced) {
    gsap.set(card, { backgroundColor: OPEN.bg, borderColor: OPEN.border, color: OPEN.text })
    gsap.set(gradient, { opacity: 1 })
    gsap.set(detailWrap, { height: 'auto' })
    gsap.set(detailInner, { y: 0, opacity: 1 })
    gsap.set(summary, { color: OPEN.summary })
    gsap.set(tags, { color: OPEN.tag, borderColor: OPEN.tagBorder })
    gsap.set(indexEl, { color: OPEN.indexColor })
    return
  }

  const naturalHeight = detailInner.scrollHeight

  gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: 'top 65%',
      end: 'top 42%',
      scrub: 0.5
    }
  })
    .fromTo(card, { backgroundColor: CLOSED.bg, borderColor: CLOSED.border, color: CLOSED.text }, { backgroundColor: OPEN.bg, borderColor: OPEN.border, color: OPEN.text, ease: 'none' }, 0)
    .fromTo(gradient, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
    .fromTo(detailWrap, { height: 0 }, { height: naturalHeight, ease: 'none' }, 0)
    .fromTo(detailInner, { y: 14, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0)
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

      <div class="relative flex items-start justify-between gap-6 px-8 py-7 lg:px-12 lg:py-9">
        <div class="min-w-0">
          <h3 class="text-heading">{{ service.title }}</h3>

          <div data-detail-wrap class="overflow-hidden" style="height: 0">
            <div data-detail-inner class="max-w-xl" style="opacity: 0; transform: translateY(14px)">
              <p data-summary class="text-body-lg mt-4" style="color: rgba(11,13,18,0.6)">
                {{ service.summary }}
              </p>

              <ul class="mt-6 flex flex-wrap gap-2">
                <li
                  v-for="capability in service.capabilities"
                  :key="capability"
                  data-tag
                  class="text-label border px-3 py-1.5"
                  style="color: rgba(11,13,18,0.6); border-color: rgba(11,13,18,0.2)"
                >
                  {{ capability }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <span data-index class="text-body-sm shrink-0 pt-1 font-sans tabular-nums" style="color: rgba(11,13,18,0.45)">
          {{ service.index }}
        </span>
      </div>
    </div>
  </div>
</template>
