<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/types/project'
import { animateCinematicReel } from '~/animations/sections/portfolio'

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

const FRAMES = ['full-bleed', 'portrait', 'letterbox', 'split'] as const
type Frame = (typeof FRAMES)[number]

/**
 * Each project gets a different frame — full-bleed, a centered portrait
 * inset, a letterboxed band, or an asymmetric split — cycling through the
 * four so consecutive projects never repeat the same composition. Same
 * { root, image, text } contract for every variant (animateCinematicReel
 * only ever toggles autoAlpha/scale/opacity/y on whatever it's given), so
 * the crossfade/scale motion is identical underneath regardless of which
 * frame is showing — only the markup/layout differs.
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
 * HOME / Selected Work — mount — builds the { root, image, text } scene
 * triples animateCinematicReel needs once every ref array is populated,
 * then hands the whole sequence off to that one shared timeline. See
 * animations/sections/portfolio.ts for the crossfade/scale choreography.
 */
const { root } = useScrollAnimation(({ gsap, root: pinRootEl, reduced: isReduced }) => {
  if (rootEls.value.length < props.projects.length) return
  const scenes = props.projects.map((_, i) => ({
    root: rootEls.value[i]!,
    image: imageEls.value[i]!,
    text: textEls.value[i]!
  }))
  animateCinematicReel(gsap, pinRootEl, scenes, isReduced)
})
</script>

<template>
  <div ref="root" class="relative" :style="{ minHeight: `${props.projects.length * 100}vh` }">
    <div class="sticky top-0 h-screen overflow-hidden bg-black">
      <NuxtLink
        v-for="(project, index) in props.projects"
        :key="project.id"
        :ref="(el) => setRootRef(el as Element | { $el: HTMLElement } | null, index)"
        :to="`/work/${project.slug}`"
        class="group absolute inset-0 block"
        data-cursor="view"
        @click="onActivate(index, project.slug)"
      >
        <span class="text-body-sm absolute top-8 left-6 z-10 font-sans text-white/50 sm:top-12 sm:left-10 lg:left-16">
          Project {{ String(index + 1).padStart(2, '0') }} / {{ String(props.projects.length).padStart(2, '0') }}
        </span>

        <!-- Full-bleed — the image fills the frame edge to edge, text
             overlays the bottom on a gradient. The most "poster" of the
             four treatments. -->
        <template v-if="frameFor(index) === 'full-bleed'">
          <div :ref="(el) => setImageRef(el as Element | null, index)" class="absolute inset-0">
            <img :ref="(el) => setImgTagRef(el as Element | null, index)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" loading="eager" class="size-full object-cover">
          </div>
          <div class="from-black/90 via-black/20 pointer-events-none absolute inset-0 bg-gradient-to-t to-black/40" aria-hidden="true" />
          <div :ref="(el) => setTextRef(el as Element | null, index)" class="absolute inset-x-6 bottom-8 flex flex-wrap items-end justify-between gap-6 sm:inset-x-10 sm:bottom-14 lg:inset-x-16">
            <div>
              <p class="text-label text-accent mb-3">{{ project.client }}</p>
              <h3 class="text-display text-white">{{ project.title }}</h3>
              <div class="text-body-sm mt-4 flex flex-wrap items-center gap-3 text-white/60">
                <span>{{ project.category }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ project.year }}</span>
              </div>
            </div>
            <span class="bg-white text-black flex size-14 shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white" aria-hidden="true">
              <ArrowUpRight class="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </template>

        <!-- Portrait inset — a tall, centered frame with generous navy
             negative space around it; the client/title sit outside the
             image entirely rather than overlaid on it. -->
        <template v-else-if="frameFor(index) === 'portrait'">
          <div class="bg-navy absolute inset-0" />
          <div
            :ref="(el) => setImageRef(el as Element | null, index)"
            class="absolute top-1/2 left-1/2 aspect-3/4 h-[78vh] max-w-[85vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden sm:left-[38%]"
          >
            <img :ref="(el) => setImgTagRef(el as Element | null, index)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" loading="eager" class="size-full object-cover">
          </div>
          <div :ref="(el) => setTextRef(el as Element | null, index)" class="absolute inset-x-6 bottom-10 sm:right-10 sm:bottom-1/2 sm:left-auto sm:max-w-xs sm:translate-y-1/2">
            <p class="text-label text-navy-tint mb-3">{{ project.client }}</p>
            <h3 class="text-display text-white">{{ project.title }}</h3>
            <div class="text-body-sm mt-4 flex flex-wrap items-center gap-3 text-white/60">
              <span>{{ project.category }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ project.year }}</span>
            </div>
            <span class="bg-white text-black mt-6 flex size-12 shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white" aria-hidden="true">
              <ArrowUpRight class="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </template>

        <!-- Letterbox — a wide, vertically cropped band with solid bars
             above and below, title set into the top bar like a film
             slate rather than over the image. -->
        <template v-else-if="frameFor(index) === 'letterbox'">
          <div class="bg-black absolute inset-0" />
          <div :ref="(el) => setImageRef(el as Element | null, index)" class="absolute inset-x-0 top-1/2 h-[46vh] -translate-y-1/2 overflow-hidden sm:h-[52vh]">
            <img :ref="(el) => setImgTagRef(el as Element | null, index)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" loading="eager" class="size-full object-cover">
          </div>
          <div :ref="(el) => setTextRef(el as Element | null, index)" class="absolute inset-x-6 top-24 flex flex-wrap items-start justify-between gap-6 sm:inset-x-10 sm:top-28 lg:inset-x-16">
            <div>
              <p class="text-label text-accent mb-3">{{ project.client }}</p>
              <h3 class="text-display text-white">{{ project.title }}</h3>
            </div>
            <div class="text-body-sm flex flex-wrap items-center gap-3 pt-2 text-white/60">
              <span>{{ project.category }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ project.year }}</span>
            </div>
          </div>
          <span class="bg-white text-black absolute right-6 bottom-10 flex size-14 shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white sm:right-10 lg:right-16" aria-hidden="true">
            <ArrowUpRight class="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </template>

        <!-- Split — image and text share the frame side by side on a
             solid field; the only variant with no overlay gradient at all,
             since the text never sits on top of the photograph. -->
        <template v-else>
          <div class="bg-charcoal absolute inset-0" />
          <div :ref="(el) => setImageRef(el as Element | null, index)" class="absolute inset-y-0 right-0 w-full overflow-hidden sm:w-[58%]">
            <img :ref="(el) => setImgTagRef(el as Element | null, index)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" loading="eager" class="size-full object-cover opacity-60 sm:opacity-100">
          </div>
          <div :ref="(el) => setTextRef(el as Element | null, index)" class="absolute inset-x-6 bottom-10 sm:inset-y-0 sm:right-auto sm:left-10 sm:flex sm:max-w-sm sm:flex-col sm:justify-center lg:left-16">
            <p class="text-label text-accent mb-3">{{ project.client }}</p>
            <h3 class="text-display text-white">{{ project.title }}</h3>
            <div class="text-body-sm mt-4 flex flex-wrap items-center gap-3 text-white/60">
              <span>{{ project.category }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ project.year }}</span>
            </div>
            <span class="bg-white text-black mt-6 flex size-12 shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white" aria-hidden="true">
              <ArrowUpRight class="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </template>
      </NuxtLink>
    </div>
  </div>
</template>
