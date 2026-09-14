<script setup lang="ts">
import type { Project } from '~/types/project'
import { animateCardReveal } from '~/animations/sections/portfolio'

interface Props {
  projects: Project[]
}

defineProps<Props>()

const cardEls = ref<HTMLElement[]>([])

function setCardRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) cardEls.value[index] = el
}

defineExpose({ cardEls })

/**
 * WORK ARCHIVE / grid — scroll — each card reveals with the same staged
 * media→title→detail sequence as Selected Work, on first mount only. Filter
 * changes are handled separately by filterEnter/filterExit (imperative
 * tweens driven from work/index.vue) — this covers just the initial,
 * unfiltered page load discovery.
 */
const { root } = useScrollAnimation(({ gsap, reduced }) => {
  const cards = cardEls.value.filter(Boolean)
  if (reduced) {
    const targets = cards.flatMap((card) =>
      Array.from(card.querySelectorAll('[data-reveal="media"], [data-reveal="meta-title"], [data-reveal="meta-detail"]'))
    )
    gsap.set(targets, { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' })
    return
  }
  cards.forEach((card) => animateCardReveal(gsap, card, 'top 90%'))
})
</script>

<template>
  <div ref="root" class="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2">
    <div v-for="(project, index) in projects" :key="project.id" :ref="(el) => setCardRef(el as Element | null, index)">
      <ProjectPreview :project="project" :index="index" />
    </div>
  </div>

  <p v-if="!projects.length" class="text-body-lg text-ink-muted py-16 text-center">
    No projects in this category yet — check back soon.
  </p>
</template>
