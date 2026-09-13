<script setup lang="ts">
import type { Project } from '~/types/project'

interface Props {
  projects: Project[]
}

defineProps<Props>()

const cardEls = ref<HTMLElement[]>([])

function setCardRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) cardEls.value[index] = el
}

defineExpose({ cardEls })
</script>

<template>
  <div class="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2">
    <div v-for="(project, index) in projects" :key="project.id" :ref="(el) => setCardRef(el as Element | null, index)">
      <ProjectPreview :project="project" :index="index" />
    </div>
  </div>

  <p v-if="!projects.length" class="text-body-lg text-ink-muted py-16 text-center">
    No projects in this category yet — check back soon.
  </p>
</template>
