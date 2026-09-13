<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/types/project'

interface Props {
  project: Project
  tall?: boolean
}

withDefaults(defineProps<Props>(), { tall: false })

const imageEl = ref<HTMLElement | null>(null)
</script>

<template>
  <a
    href="#"
    class="group focus-visible:ring-primary-900 relative block overflow-hidden bg-sand-200 focus-visible:ring-2 focus-visible:ring-offset-2"
    :class="tall ? 'aspect-[4/5]' : 'aspect-[4/3]'"
    :aria-label="`View project: ${project.title}`"
    @click.prevent
  >
    <img
      ref="imageEl"
      :src="project.image"
      :alt="`${project.title} — ${project.client}`"
      loading="lazy"
      class="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
    >

    <div
      class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-8"
    >
      <span class="text-label text-white/70">{{ project.category }} · {{ project.year }}</span>
      <div class="mt-2 flex items-center justify-between gap-3">
        <h3 class="text-h4 text-white">{{ project.title }}</h3>
        <ArrowUpRight class="size-5 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
      </div>
    </div>

    <div class="absolute inset-x-6 bottom-6 flex items-center justify-between text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0 sm:inset-x-8 sm:bottom-8">
      <span class="text-label bg-navy-900/70 px-3 py-1.5 backdrop-blur-sm">{{ project.category }}</span>
    </div>
  </a>
</template>
