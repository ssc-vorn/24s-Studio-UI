<script setup lang="ts">
import { projectService } from '~/services/projectService'

const projects = projectService.getSelectedWork(4)
</script>

<template>
  <section id="work" class="bg-surface py-28 lg:pt-40 lg:pb-0">
    <Container>
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span class="text-label text-accent mb-5 flex items-center gap-3">
            <span class="bg-accent h-px w-8" aria-hidden="true" />
            Work / 01
          </span>
          <SplitText as="h2" class="text-heading text-ink">Selected work.</SplitText>
          <p class="text-body-lg text-ink-muted mt-6 max-w-md">Every project, a scene. Scroll to step through it.</p>
        </div>
        <AnimatedLink to="/work" class="shrink-0">View All Work</AnimatedLink>
      </div>
    </Container>

    <!-- Cinematic scene sequence — each featured project fills the pinned
         viewport in turn (see animateCinematicReel): scale/crop out, next
         one scales/crops in, its text arriving a beat behind. -->
    <CinematicProjectReel class="mt-16 lg:mt-24" :projects="projects" />
  </section>
</template>
