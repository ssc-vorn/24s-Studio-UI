<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/types/project'
import { animateCinematicReel, animateCardReveal } from '~/animations/sections/portfolio'

interface Props {
  projects: Project[]
}

const props = defineProps<Props>()

const reduced = useReducedMotion()
const { capture } = useSharedProjectTransition()

const rootEls = ref<HTMLElement[]>([])
const imageEls = ref<HTMLElement[]>([])
const textEls = ref<HTMLElement[]>([])
const imgTagEls = ref<(HTMLImageElement | null)[]>([])

const FRAMES = ['wide', 'portrait', 'full-bleed', 'asymmetric', 'editorial'] as const
type Frame = (typeof FRAMES)[number]

/**
 * Five distinct frames for five projects — landscape/wide, portrait,
 * full-bleed, an asymmetric offset, and an editorial inset-with-margin —
 * so no two consecutive projects (and with five frames for five projects,
 * no two projects at all) share the same image ratio, layout or text
 * placement. Same { root, image, text } contract for every variant
 * (animateCinematicReel only ever toggles autoAlpha/scale/opacity/y on
 * whatever it's given), so the crossfade/scale motion underneath is
 * identical regardless of which frame is showing — only the markup and
 * default (mobile) sizing differ.
 */
function frameFor(index: number): Frame {
  return FRAMES[index % FRAMES.length]!
}

function setRootRef(el: Element | { $el: HTMLElement } | null, index: number) {
  const node = el instanceof HTMLElement ? el : (el as { $el: HTMLElement } | null)?.$el
  if (node instanceof HTMLElement) rootEls.value[index] = node
}
function setImageRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) imageEls.value[index] = el
}
function setTextRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) textEls.value[index] = el
}
function setImgTagRef(el: Element | null, index: number) {
  imgTagEls.value[index] = el as HTMLImageElement | null
}

function onActivate(index: number, slug: string) {
  if (reduced.value) return
  capture(slug, imgTagEls.value[index] ?? null)
}

/**
 * HOME / Selected Work — the layout switch between "desktop pinned
 * cinematic sequence" and "mobile simple vertical sequence" is pure CSS
 * (`lg:absolute lg:inset-0` on each scene, `lg:sticky lg:h-screen` on the
 * viewport, a media-query-gated min-height on the pin root — see
 * <style> below) so it can never desync from SSR. Only the *animation*
 * differs by breakpoint, via ScrollTrigger.matchMedia: desktop gets the
 * one continuous pinned crossfade timeline (animateCinematicReel), mobile
 * gets each project's own simple non-pinned reveal (animateCardReveal,
 * the same one the Work archive grid uses) since a full pin/scrub
 * sequence is exactly the "large horizontal/pin interaction" the brief
 * says to reduce on mobile, not just shrink.
 * Reduced motion: every scene renders visible at rest, no animation of
 * either kind, on any breakpoint.
 */
const { root } = useScrollAnimation(({ gsap, ScrollTrigger, root: pinRootEl, reduced: isReduced }) => {
  if (rootEls.value.length < props.projects.length) return

  ScrollTrigger.matchMedia({
    '(min-width: 1024px)': () => {
      const scenes = props.projects.map((_, i) => ({ root: rootEls.value[i]!, image: imageEls.value[i]!, text: textEls.value[i]! }))
      const tl = animateCinematicReel(gsap, pinRootEl, scenes, isReduced)

      return () => {
        tl?.scrollTrigger?.kill()
        tl?.kill()
        gsap.set(rootEls.value, { clearProps: 'all' })
        gsap.set(imageEls.value, { clearProps: 'transform' })
        gsap.set(textEls.value, { clearProps: 'all' })
      }
    },
    '(max-width: 1023px)': () => {
      if (isReduced) {
        gsap.set(imageEls.value, { clipPath: 'inset(0 0 0% 0)', scale: 1 })
        gsap.set(textEls.value, { opacity: 1, y: 0 })
        return
      }

      const tweens = rootEls.value.map((el) => animateCardReveal(gsap, el, 'top 88%'))
      return () => tweens.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  })
})
</script>

<template>
  <div ref="root" class="work-reel-root relative" :style="{ '--scene-count': props.projects.length }">
    <div class="flex flex-col gap-16 lg:sticky lg:top-0 lg:block lg:h-screen lg:gap-0 lg:overflow-hidden lg:bg-black">
      <NuxtLink
        v-for="(project, index) in props.projects"
        :key="project.id"
        :ref="(el) => setRootRef(el as Element | { $el: HTMLElement } | null, index)"
        :to="`/work/${project.slug}`"
        class="group relative block lg:absolute lg:inset-0"
        data-cursor="view"
        @click="onActivate(index, project.slug)"
      >
        <span class="text-body-sm absolute top-0 left-0 z-10 font-sans text-ink-muted lg:top-10 lg:left-10 lg:text-white/50">
          Project {{ String(index + 1).padStart(2, '0') }} / {{ String(props.projects.length).padStart(2, '0') }}
        </span>

        <!-- Wide / landscape cinematic — a letterboxed band on mobile
             (aspect-21/9), the same band vertically centered with the
             title set above it like a film slate once the frame goes
             full-viewport on desktop. -->
        <template v-if="frameFor(index) === 'wide'">
          <div :ref="(el) => setImageRef(el as Element | null, index)" data-reveal="media" class="relative aspect-21/9 overflow-hidden bg-black lg:absolute lg:inset-x-0 lg:top-1/2 lg:aspect-auto lg:h-[46vh] lg:-translate-y-1/2">
            <img :ref="(el) => setImgTagRef(el as Element | null, index)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" loading="lazy" class="size-full object-cover">
          </div>
          <div :ref="(el) => setTextRef(el as Element | null, index)" class="mt-6 flex flex-wrap items-start justify-between gap-4 lg:absolute lg:inset-x-10 lg:top-24 lg:mt-0">
            <div>
              <p data-reveal="meta-title" class="text-label text-accent mb-3">{{ project.client }}</p>
              <h3 class="text-display text-ink lg:text-white">{{ project.title }}</h3>
            </div>
            <div data-reveal="meta-detail" class="text-body-sm text-ink-muted flex flex-wrap items-center gap-3 pt-2 lg:text-white/60">
              <span>{{ project.category }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ project.year }}</span>
            </div>
          </div>
        </template>

        <!-- Portrait / vertical — a tall centered inset on mobile too
             (aspect-3/4), simply larger and floated on a navy field once
             the frame goes full-viewport. -->
        <template v-else-if="frameFor(index) === 'portrait'">
          <div class="lg:bg-navy absolute inset-0 hidden lg:block" />
          <div :ref="(el) => setImageRef(el as Element | null, index)" data-reveal="media" class="relative mx-auto aspect-3/4 max-w-sm overflow-hidden lg:absolute lg:top-1/2 lg:left-1/2 lg:mx-0 lg:h-[78vh] lg:max-w-[85vw] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <img :ref="(el) => setImgTagRef(el as Element | null, index)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" loading="lazy" class="size-full object-cover">
          </div>
          <div :ref="(el) => setTextRef(el as Element | null, index)" class="mt-6 text-center lg:absolute lg:top-1/2 lg:right-10 lg:mt-0 lg:max-w-md lg:-translate-y-1/2 lg:text-right">
            <p data-reveal="meta-title" class="text-label text-accent lg:text-navy-tint mb-3">{{ project.client }}</p>
            <h3 class="text-heading text-ink lg:text-white">{{ project.title }}</h3>
            <div data-reveal="meta-detail" class="text-body-sm text-ink-muted mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-end lg:text-white/60">
              <span>{{ project.category }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ project.year }}</span>
            </div>
          </div>
        </template>

        <!-- Full-bleed immersive — the image fills the frame edge to edge
             at every size, text overlays the bottom on a gradient. The
             most "poster" of the five treatments. -->
        <template v-else-if="frameFor(index) === 'full-bleed'">
          <div :ref="(el) => setImageRef(el as Element | null, index)" data-reveal="media" class="relative aspect-4/5 overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
            <img :ref="(el) => setImgTagRef(el as Element | null, index)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" loading="lazy" class="size-full object-cover">
            <div class="from-black/90 via-black/20 pointer-events-none absolute inset-0 bg-gradient-to-t to-black/40" aria-hidden="true" />
            <div :ref="(el) => setTextRef(el as Element | null, index)" class="absolute inset-x-6 bottom-6 flex flex-wrap items-end justify-between gap-6 sm:bottom-10">
              <div>
                <p data-reveal="meta-title" class="text-label text-accent mb-3">{{ project.client }}</p>
                <h3 class="text-display text-white">{{ project.title }}</h3>
                <div data-reveal="meta-detail" class="text-body-sm mt-4 flex flex-wrap items-center gap-3 text-white/60">
                  <span>{{ project.category }}</span>
                  <span aria-hidden="true">·</span>
                  <span>{{ project.year }}</span>
                </div>
              </div>
              <span class="bg-white text-black flex size-12 shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white lg:size-14" aria-hidden="true">
                <ArrowUpRight class="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:size-6" />
              </span>
            </div>
          </div>
        </template>

        <!-- Asymmetric — the image runs large and off-center, the text
             block overlapping its edge rather than sitting beside or on
             top of it: the least symmetrical of the five compositions. -->
        <template v-else-if="frameFor(index) === 'asymmetric'">
          <div class="bg-charcoal absolute inset-0 hidden lg:block" />
          <div :ref="(el) => setImageRef(el as Element | null, index)" data-reveal="media" class="relative ml-[8%] aspect-4/3 overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:ml-0 lg:aspect-auto lg:w-[68%]">
            <img :ref="(el) => setImgTagRef(el as Element | null, index)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" loading="lazy" class="size-full object-cover">
          </div>
          <div :ref="(el) => setTextRef(el as Element | null, index)" class="bg-surface relative z-10 -mt-10 ml-6 max-w-xs p-6 sm:p-8 lg:absolute lg:top-16 lg:left-10 lg:mt-0 lg:ml-0 lg:max-w-sm lg:bg-transparent lg:p-0">
            <p data-reveal="meta-title" class="text-label text-accent mb-3">{{ project.client }}</p>
            <h3 class="text-display text-ink lg:text-white">{{ project.title }}</h3>
            <div data-reveal="meta-detail" class="text-body-sm text-ink-muted mt-4 flex flex-wrap items-center gap-3 lg:text-white/60">
              <span>{{ project.category }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ project.year }}</span>
            </div>
            <span class="bg-ink text-surface mt-6 flex size-12 shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white lg:bg-white lg:text-black" aria-hidden="true">
              <ArrowUpRight class="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </template>

        <!-- Editorial crop — the image sits inset with a visible margin
             like a photograph on a magazine page, rather than filling or
             bleeding off the frame; caption reads like a cutline beneath
             it. The most restrained of the five. -->
        <template v-else>
          <div class="bg-surface absolute inset-0 hidden lg:block" />
          <div class="flex flex-col p-6 sm:p-10 lg:absolute lg:inset-12 lg:flex lg:p-0">
            <div :ref="(el) => setImageRef(el as Element | null, index)" data-reveal="media" class="aspect-16/10 w-full overflow-hidden lg:flex-1">
              <img :ref="(el) => setImgTagRef(el as Element | null, index)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" loading="lazy" class="size-full object-cover">
            </div>
            <div :ref="(el) => setTextRef(el as Element | null, index)" class="mt-6 flex flex-wrap items-end justify-between gap-4 lg:mt-6 lg:shrink-0">
              <div>
                <p data-reveal="meta-title" class="text-label text-accent mb-3">{{ project.client }}</p>
                <h3 class="text-heading text-ink lg:text-white">{{ project.title }}</h3>
              </div>
              <div data-reveal="meta-detail" class="text-body-sm text-ink-muted flex flex-wrap items-center gap-3 pt-2 lg:text-white/60">
                <span>{{ project.category }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ project.year }}</span>
              </div>
            </div>
          </div>
        </template>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* The pin runway only exists on desktop — mobile needs no scroll-jacking
   height at all, since its scenes are plain stacked flow. Keeping this in
   plain CSS (rather than an inline style toggled by JS) means it can
   never desync from the SSR render. */
@media (min-width: 1024px) {
  .work-reel-root {
    min-height: calc(var(--scene-count) * 100vh);
  }
}
</style>
