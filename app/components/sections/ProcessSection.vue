<script setup lang="ts">
import { processStages } from '~/data/studio'
import { animateStageChange } from '~/animations/sections/process'

const { root, activeIndex } = useScrollStory({
  setup: ({ gsap, root }) => {
    const heading = root.querySelector('[data-reveal="heading"]')
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
      )
    }

    return {
      onChange: (index, previousIndex) => {
        const visuals = Array.from(root.querySelectorAll('[data-stage-visual]'))
        const titles = Array.from(root.querySelectorAll('[data-stage-title]'))
        animateStageChange(gsap, visuals, titles, index, previousIndex)
      }
    }
  }
})
</script>

<template>
  <section id="process" ref="root" class="bg-surface py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="max-w-2xl">
        <span class="text-label text-accent mb-5 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          How We Work
        </span>
        <h2 class="text-heading text-ink">A process built for craft, not just speed.</h2>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div class="hidden lg:col-span-2 lg:block">
          <div class="sticky top-32 flex gap-6">
            <div class="bg-border-subtle relative h-40 w-px shrink-0" aria-hidden="true">
              <span data-story-progress class="bg-accent absolute inset-x-0 top-0 h-full w-full" />
            </div>
            <div class="flex h-40 flex-col justify-between">
              <span
                v-for="(stage, index) in processStages"
                :key="stage.index"
                class="text-body-sm font-sans transition-colors duration-500"
                :class="activeIndex === index ? 'text-accent' : 'text-ink-muted'"
              >
                {{ stage.index }}
              </span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div>
            <div
              v-for="(stage, index) in processStages"
              :key="stage.index"
              data-story-stage
              class="border-border-subtle border-t py-14 first:border-t-0 lg:py-20"
            >
              <h3
                data-stage-title
                class="text-heading text-ink transition-colors duration-500 will-change-transform"
                :class="activeIndex !== -1 && activeIndex !== index ? 'text-ink-muted' : ''"
              >
                {{ stage.title }}
              </h3>
              <p class="text-body-lg text-ink mt-6">{{ stage.description }}</p>
              <p class="text-body text-ink-muted mt-4">{{ stage.detail }}</p>
            </div>
          </div>
        </div>

        <div class="relative hidden lg:col-span-5 lg:block">
          <div class="bg-charcoal-200 sticky top-32 aspect-4/5 overflow-hidden">
            <img
              v-for="(stage, index) in processStages"
              :key="stage.index"
              data-stage-visual
              :src="stage.image"
              :alt="`${stage.title} — ${stage.description}`"
              loading="lazy"
              class="absolute inset-0 size-full object-cover"
              :class="index === 0 ? 'opacity-100' : 'opacity-0'"
            >
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
