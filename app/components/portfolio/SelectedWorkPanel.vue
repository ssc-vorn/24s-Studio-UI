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
  <NuxtLink
    :to="`/work/${project.slug}`"
    class="group relative flex min-h-[70vh] items-end overflow-hidden bg-black lg:min-h-[85vh]"
  >
    <div data-reveal="media" class="absolute inset-0">
      <img
        :src="project.coverImage"
        :alt="`${project.title} — ${project.client}`"
        loading="lazy"
        class="size-full object-cover opacity-80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      >
      <div class="from-black/95 via-black/30 absolute inset-0 bg-gradient-to-t to-transparent" aria-hidden="true" />
    </div>

    <span class="text-body-sm absolute top-6 left-6 z-10 font-sans text-white/50 sm:top-10 sm:left-10">
      {{ String(index + 1).padStart(2, '0') }}
    </span>

    <Container class="relative z-10 pb-10 sm:pb-14">
      <div data-reveal="meta-title" class="flex flex-wrap items-end justify-between gap-6">
        <h3 class="text-display text-white">{{ project.title }}</h3>
        <span
          class="bg-white text-black flex size-14 shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white"
          aria-hidden="true"
        >
          <ArrowUpRight class="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <div data-reveal="meta-detail" class="text-body-sm mt-4 flex flex-wrap items-center gap-3 text-white/60">
        <span>{{ project.client }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ project.category }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ project.year }}</span>
      </div>
    </Container>
  </NuxtLink>
</template>
