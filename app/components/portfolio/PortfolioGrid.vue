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
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="(project, index) in projects"
      :key="project.id"
      :ref="(el) => setCardRef(el as Element | null, index)"
      :class="index % 5 === 0 ? 'sm:col-span-2 lg:col-span-2' : ''"
    >
      <PortfolioCard :project="project" :tall="index % 5 !== 0" />
    </div>
  </div>

  <p v-if="!projects.length" class="text-body-lg text-sand-600 py-16 text-center">
    No projects in this category yet — check back soon.
  </p>
</template>
