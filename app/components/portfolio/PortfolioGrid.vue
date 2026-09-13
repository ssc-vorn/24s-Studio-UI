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
  <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
    <div v-for="(project, index) in projects" :key="project.id" :ref="(el) => setCardRef(el as Element | null, index)">
      <PortfolioCard :project="project" />
    </div>
  </div>

  <p v-if="!projects.length" class="text-body-lg text-sand-600 py-16 text-center">
    No projects in this category yet — check back soon.
  </p>
</template>
