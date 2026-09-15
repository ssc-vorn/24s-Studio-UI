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
        <div :ref="(el) => setImageRef(el as Element | null, index)" class="absolute inset-0">
          <img
            :ref="(el) => setImgTagRef(el as Element | null, index)"
            :src="project.coverImage"
            :alt="`${project.title} — ${project.client}`"
            loading="eager"
            class="size-full object-cover"
          >
        </div>
        <div class="from-black/90 via-black/20 pointer-events-none absolute inset-0 bg-gradient-to-t to-black/40" aria-hidden="true" />

        <span class="text-body-sm absolute top-8 left-6 font-sans text-white/50 sm:top-12 sm:left-10 lg:left-16">
          Project {{ String(index + 1).padStart(2, '0') }} / {{ String(props.projects.length).padStart(2, '0') }}
        </span>

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
      </NuxtLink>
    </div>
  </div>
</template>
