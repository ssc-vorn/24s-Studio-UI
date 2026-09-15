<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/types/project'

interface Props {
  project: Project
  index: number
  /** `large` — the bento grid's hero tile. `small` — the three supporting tiles beside it. */
  size?: 'large' | 'small'
}

const props = withDefaults(defineProps<Props>(), { size: 'large' })

const reduced = useReducedMotion()
const { capture } = useSharedProjectTransition()
const mediaImgEl = ref<HTMLImageElement | null>(null)

function onActivate() {
  if (reduced.value) return
  capture(props.project.slug, mediaImgEl.value)
}
</script>

<template>
  <NuxtLink
    :to="`/work/${project.slug}`"
    class="group relative flex items-end overflow-hidden bg-black"
    :class="size === 'large' ? 'aspect-4/5 sm:aspect-2/1' : 'aspect-4/3'"
    @click="onActivate"
  >
    <div data-reveal="media" class="absolute inset-0">
      <div data-reveal="media-el" class="size-full">
        <img
          ref="mediaImgEl"
          :src="project.coverImage"
          :alt="`${project.title} — ${project.client}`"
          loading="lazy"
          class="size-full object-cover opacity-80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        >
      </div>
      <div class="from-black/95 via-black/30 absolute inset-0 bg-gradient-to-t to-transparent" aria-hidden="true" />
    </div>

    <span
      class="text-body-sm absolute z-10 font-sans text-white/50"
      :class="size === 'large' ? 'top-6 left-6 sm:top-8 sm:left-8' : 'top-5 left-5'"
    >
      {{ String(index + 1).padStart(2, '0') }}
    </span>

    <div class="relative z-10 w-full p-6" :class="size === 'large' ? 'sm:p-8' : 'sm:p-6'">
      <div data-reveal="meta-title" class="flex flex-wrap items-end justify-between gap-4">
        <h3 :class="size === 'large' ? 'text-display' : 'text-subheading'" class="text-white">{{ project.title }}</h3>
        <span
          class="bg-white text-black flex shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white"
          :class="size === 'large' ? 'size-14' : 'size-11'"
          aria-hidden="true"
        >
          <ArrowUpRight :class="size === 'large' ? 'size-6' : 'size-4'" class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <div data-reveal="meta-detail" class="text-body-sm mt-3 flex flex-wrap items-center gap-3 text-white/60">
        <span>{{ project.category }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ project.year }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
