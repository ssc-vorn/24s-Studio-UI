<script setup lang="ts">
import type { Project } from '~/types/project'

interface Props {
  project: Project
}

defineProps<Props>()
</script>

<template>
  <section class="relative flex min-h-[85vh] flex-col justify-end overflow-hidden bg-black pb-16 lg:pb-24">
    <img :src="project.coverImage" :alt="`${project.title} — ${project.client}`" class="absolute inset-0 size-full object-cover opacity-70">
    <div class="from-black/95 via-black/50 absolute inset-0 bg-gradient-to-t to-black/20" aria-hidden="true" />

    <Container class="relative z-10 pt-32">
      <div class="text-body-sm mb-6 flex flex-wrap items-center gap-3 text-white/60">
        <NuxtLink to="/work" class="hover:text-white">Work</NuxtLink>
        <span aria-hidden="true">/</span>
        <span>{{ project.client }}</span>
      </div>
      <h1 class="text-display-xl max-w-4xl text-white">{{ project.title }}</h1>

      <dl class="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-8">
        <div>
          <dt class="text-label text-white/40">Client</dt>
          <dd class="text-body mt-2 text-white">{{ project.client }}</dd>
        </div>
        <div>
          <dt class="text-label text-white/40">Year</dt>
          <dd class="text-body mt-2 text-white">{{ project.year }}</dd>
        </div>
        <div>
          <dt class="text-label text-white/40">Services</dt>
          <dd class="text-body mt-2 text-white">{{ project.services.join(', ') }}</dd>
        </div>
      </dl>
    </Container>
  </section>
</template>
