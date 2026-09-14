<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/types/project'

interface Props {
  project: Project
  index: number
}

defineProps<Props>()
</script>

<template>
  <NuxtLink :to="`/work/${project.slug}`" class="group block">
    <div data-reveal="media" class="relative aspect-16/10 overflow-hidden bg-charcoal-200">
      <img
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

    <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div data-reveal="meta-title" class="flex items-baseline gap-4">
        <span class="text-body-sm font-sans text-ink-muted">{{ String(index + 1).padStart(2, '0') }}</span>
        <h3 class="text-heading text-ink transition-colors duration-300 group-hover:text-accent">{{ project.title }}</h3>
      </div>
      <div data-reveal="meta-detail" class="text-body-sm text-ink-muted flex items-center gap-3 sm:pl-14">
        <span>{{ project.category }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ project.year }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
