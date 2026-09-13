<script setup lang="ts">
import { processStages } from '~/data/studio'
import { trackActiveStage } from '~/animations/sections/process'

const activeIndex = ref(0)

const { root } = useScrollAnimation(({ gsap, root, reduced: isReduced, ScrollTrigger }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
  }

  if (isReduced) {
    // No single stage should read as "active" when motion is reduced — flip
    // to a sentinel index post-mount (a plain reactive update, not part of
    // the SSR-compared render, so this can't trigger a hydration mismatch).
    activeIndex.value = -1
    return
  }

  const stageEls = Array.from(root.querySelectorAll('[data-stage]'))
  trackActiveStage(ScrollTrigger, stageEls, (index) => {
    activeIndex.value = index
  })
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
          <div class="sticky top-32 flex flex-col gap-8">
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

        <div class="lg:col-span-10">
          <div
            v-for="(stage, index) in processStages"
            :key="stage.index"
            :data-stage="index"
            class="border-border-subtle grid grid-cols-1 gap-6 border-t py-14 first:border-t-0 lg:grid-cols-12 lg:gap-10 lg:py-20"
          >
            <h3
              class="text-heading lg:col-span-5 transition-colors duration-500"
              :class="activeIndex === -1 || activeIndex === index ? 'text-ink' : 'text-ink-muted'"
            >
              {{ stage.title }}
            </h3>
            <div class="lg:col-span-7">
              <p class="text-body-lg text-ink">{{ stage.description }}</p>
              <p class="text-body text-ink-muted mt-4 max-w-xl">{{ stage.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
