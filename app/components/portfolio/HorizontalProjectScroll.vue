<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/types/project'

interface Props {
  projects: Project[]
}

const props = defineProps<Props>()

const reduced = useReducedMotion()
const { capture } = useSharedProjectTransition()

const trackEl = ref<HTMLElement | null>(null)
const cardEls = ref<HTMLElement[]>([])
const imgEls = ref<(HTMLImageElement | null)[]>([])

function setCardRef(el: Element | { $el: HTMLElement } | null, index: number) {
  const node = el instanceof HTMLElement ? el : (el as { $el: HTMLElement } | null)?.$el
  if (node instanceof HTMLElement) cardEls.value[index] = node
}

function setImgRef(el: Element | null, index: number) {
  imgEls.value[index] = el as HTMLImageElement | null
}

function onActivate(index: number, slug: string) {
  if (reduced.value) return
  capture(slug, imgEls.value[index] ?? null)
}

/**
 * WORK / Horizontal reel — desktop-only pinned drive: the track's native
 * `overflow-x-auto` scroller (the permanent baseline on every device, SSR
 * included — see the class list below) is switched to a GSAP-driven
 * `translateX` for the duration a 1024px+ matchMedia query holds, so a
 * resize back down to tablet/mobile hands scrolling straight back to the
 * browser rather than leaving a half-pinned section behind.
 * Library: GSAP + ScrollTrigger (pin, scrub, snap) via ScrollTrigger.matchMedia.
 * Reduced motion: matchMedia is never armed — track stays a plain,
 * touch/wheel-scrollable native scroller everywhere.
 */
const { root } = useScrollAnimation(({ gsap, ScrollTrigger, root: rootEl, reduced: isReduced }) => {
  if (isReduced || !trackEl.value || cardEls.value.length < 2) return

  // ScrollTrigger.matchMedia() calls made inside this gsap.context() are
  // tracked (and their per-breakpoint cleanup invoked) automatically on
  // context revert — no manual matchMedia bookkeeping needed here.
  ScrollTrigger.matchMedia({
    '(min-width: 1024px)': () => {
      const track = trackEl.value!
      const scrollDistance = track.scrollWidth - track.clientWidth
      if (scrollDistance <= 0) return

      gsap.set(track, { overflow: 'hidden' })

      const tween = gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: rootEl,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (cardEls.value.length - 1),
            duration: 0.4,
            ease: 'power1.inOut'
          }
        }
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        gsap.set(track, { overflow: '', x: 0 })
      }
    }
  })
})
</script>

<template>
  <div ref="root" class="relative">
    <div
      ref="trackEl"
      class="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 sm:gap-8 sm:px-10 lg:h-screen lg:snap-none lg:items-center lg:gap-10 lg:px-16 lg:pb-0"
    >
      <NuxtLink
        v-for="(project, index) in props.projects"
        :key="project.id"
        :ref="(el) => setCardRef((el as { $el?: Element })?.$el ?? (el as Element | null), index)"
        :to="`/work/${project.slug}`"
        class="group relative block w-[80vw] shrink-0 snap-start sm:w-[60vw] lg:w-[42vw]"
        data-cursor="view"
        @click="onActivate(index, project.slug)"
      >
        <div class="relative aspect-4/5 overflow-hidden bg-charcoal-200 lg:aspect-3/4">
          <img
            :ref="(el) => setImgRef(el as Element | null, index)"
            :src="project.coverImage"
            :alt="`${project.title} — ${project.client}`"
            loading="lazy"
            class="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          >
          <span
            class="bg-accent absolute top-5 right-5 flex size-11 -translate-y-2 items-center justify-center text-white opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
            aria-hidden="true"
          >
            <ArrowUpRight class="size-5" />
          </span>
        </div>

        <div class="mt-6 flex items-end justify-between gap-4">
          <div class="flex items-baseline gap-4">
            <span class="text-body-sm font-sans text-ink-muted">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="text-heading text-ink transition-colors duration-300 group-hover:text-accent">{{ project.title }}</h3>
          </div>
          <div class="text-body-sm text-ink-muted hidden shrink-0 items-center gap-3 sm:flex">
            <span>{{ project.category }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ project.year }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
