<script setup lang="ts">
import { animateStageChange } from '~/animations/sections/narrative'

interface NarrativeStep {
  label: string
  text: string
}

interface Props {
  steps: NarrativeStep[]
  /** Images to crossfade behind the sticky panel as each step activates — cycles if there are fewer images than steps. */
  images: string[]
}

const props = defineProps<Props>()

function imageFor(index: number) {
  return props.images[index % props.images.length]
}

/**
 * CASE STUDY / narrative — scroll — a sticky image panel stays in view while
 * the Challenge/Strategy/Creative Direction/Execution/Result text scrolls
 * past beside it; the panel crossfades to match whichever step is active,
 * via the shared `animateStageChange` crossfade. Desktop only: on mobile
 * the panel is hidden and the steps read as a plain stacked list in
 * normal flow.
 * Library: useScrollStory (GSAP + ScrollTrigger, discrete zones — no pin).
 * Reduced motion: handled by useScrollStory itself (sentinel index, no
 * crossfade fires).
 */
const { root, activeIndex } = useScrollStory({
  setup: ({ gsap, root }) => ({
    onChange: (index, previousIndex) => {
      const visuals = Array.from(root.querySelectorAll('[data-narrative-visual]'))
      const labels = Array.from(root.querySelectorAll('[data-narrative-label]'))
      animateStageChange(gsap, visuals, labels, index, previousIndex)
    }
  })
})
</script>

<template>
  <div ref="root" class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-6">
      <div
        v-for="(step, index) in steps"
        :key="step.label"
        data-story-stage
        class="border-border-subtle flex flex-col justify-center border-t py-14 first:border-t-0 lg:min-h-[60vh] lg:py-20"
      >
        <p
          data-narrative-label
          class="text-label mb-5 transition-colors duration-500 will-change-transform"
          :class="activeIndex === index ? 'text-accent' : 'text-ink-muted'"
        >
          {{ step.label }}
        </p>
        <p class="text-body-lg text-ink max-w-lg">{{ step.text }}</p>
      </div>
    </div>

    <div class="relative hidden lg:col-span-6 lg:block">
      <div class="bg-charcoal-200 sticky top-32 aspect-4/5 overflow-hidden">
        <img
          v-for="(step, index) in steps"
          :key="step.label"
          data-narrative-visual
          :src="imageFor(index)"
          :alt="step.label"
          loading="lazy"
          class="absolute inset-0 size-full object-cover"
          :class="index === 0 ? 'opacity-100' : 'opacity-0'"
        >
      </div>
    </div>
  </div>
</template>
