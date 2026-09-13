<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/types/project'

interface Props {
  project: Project
}

defineProps<Props>()
</script>

<template>
  <a
    href="#"
    class="group focus-visible:ring-primary-900 block focus-visible:ring-2 focus-visible:ring-offset-2"
    :aria-label="`View project: ${project.title}`"
    @click.prevent
  >
    <div class="relative aspect-square overflow-hidden rounded-2xl bg-sand-200">
      <img
        :src="project.image"
        :alt="`${project.title} — ${project.client}`"
        loading="lazy"
        class="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      >

      <span class="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
        {{ project.category }}
      </span>

      <span
        class="bg-primary-900 absolute top-3 right-3 flex size-9 -translate-y-2 items-center justify-center rounded-full text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden="true"
      >
        <ArrowUpRight class="size-4" />
      </span>
    </div>

    <div class="mt-3 flex items-center justify-between gap-2">
      <h3 class="text-sm font-semibold text-ink">{{ project.title }}</h3>
      <span class="text-xs text-sand-600">{{ project.category }}</span>
    </div>
  </a>
</template>
