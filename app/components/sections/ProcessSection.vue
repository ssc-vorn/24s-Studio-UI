<script setup lang="ts">
import { processStages } from '~/data/studio'
import { animateLayeredRecede } from '~/animations/sections/process'

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
  }

  if (reduced) return

  const stageEls = Array.from(root.querySelectorAll<HTMLElement>('[data-story-stage]'))
  animateLayeredRecede(gsap, stageEls)
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

      <div class="mt-16 lg:mt-24">
        <div
          v-for="(stage, index) in processStages"
          :key="stage.index"
          data-story-stage
          class="relative mb-6 last:mb-0 lg:mb-0 lg:h-[100vh]"
        >
          <div
            data-layer-card
            class="border-white/10 bg-charcoal relative overflow-hidden rounded-[28px] border shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] will-change-transform lg:sticky lg:top-32"
            :style="{ zIndex: index + 1 }"
          >
            <div data-layer-overlay class="pointer-events-none absolute inset-0 z-10 bg-black opacity-0" aria-hidden="true" />

            <div class="relative grid grid-cols-1 lg:grid-cols-2">
              <div class="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <span class="text-label text-accent">{{ stage.index }} / {{ String(processStages.length).padStart(2, '0') }}</span>
                <h3 class="text-display mt-6 text-white">{{ stage.title }}</h3>
                <p class="text-body-lg mt-6 text-white/80">{{ stage.description }}</p>
                <p class="text-body mt-4 text-white/50">{{ stage.detail }}</p>
              </div>

              <div class="relative aspect-4/3 overflow-hidden lg:aspect-auto">
                <img
                  :src="stage.image"
                  :alt="`${stage.title} — ${stage.description}`"
                  loading="lazy"
                  class="absolute inset-0 size-full object-cover opacity-90"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
