<script setup lang="ts">
import { processStages } from '~/data/studio'
import { animateLayerEntrance, animateLayeredRecede, trackActiveLayer } from '~/animations/sections/process'

const activeIndex = ref(0)

const { root } = useScrollAnimation(({ gsap, root, reduced, ScrollTrigger }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
  }

  const stageEls = Array.from(root.querySelectorAll<HTMLElement>('[data-story-stage]'))

  // Independent of the entrance/recede motion below, and safe under
  // reduced motion — it's discrete state for the progress indicator, not
  // scroll-scrubbed animation.
  trackActiveLayer(ScrollTrigger, stageEls, (index) => {
    activeIndex.value = index
  })

  if (reduced) return

  animateLayerEntrance(gsap, stageEls)
  animateLayeredRecede(gsap, stageEls)
})

const totalLabel = String(processStages.length).padStart(2, '0')
const activeLabel = computed(() => processStages[activeIndex.value]?.index ?? processStages[0]!.index)
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
        <div class="sticky top-6 z-30 mb-6 flex items-center justify-end gap-4 lg:top-10" aria-hidden="true">
          <span class="text-label text-ink-muted tabular-nums">{{ activeLabel }} / {{ totalLabel }}</span>
          <div class="bg-border-subtle relative h-px w-20 overflow-hidden lg:w-28">
            <span
              class="bg-accent absolute inset-y-0 left-0 h-full origin-left transition-transform duration-500 ease-out"
              :style="{ transform: `scaleX(${(activeIndex + 1) / processStages.length})` }"
            />
          </div>
        </div>

        <div
          v-for="(stage, index) in processStages"
          :key="stage.index"
          data-story-stage
          class="relative mb-6 last:mb-0 lg:mb-0 lg:h-[100vh]"
        >
          <div
            data-layer-card
            class="border-white/10 bg-charcoal relative overflow-hidden rounded-[28px] border shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] will-change-transform lg:sticky lg:top-32 lg:min-h-[75vh]"
            :style="{ zIndex: index + 1 }"
          >
            <div data-layer-overlay class="pointer-events-none absolute inset-0 z-10 bg-black opacity-0" aria-hidden="true" />

            <!-- Layered typography: two oversized, near-invisible type
                 elements sit behind the readable content — a giant stage
                 number bleeding off the top-left corner, and a giant repeat
                 of the title anchored right. The "layers" in Layered Scroll
                 Narrative are typographic, not photographic, and read
                 clearly through the crossfade as cards recede under one
                 another. -->
            <span
              class="pointer-events-none absolute -top-16 -left-10 hidden font-serif text-[18rem] leading-none font-medium text-white/[0.035] select-none lg:block"
              aria-hidden="true"
            >
              {{ stage.index }}
            </span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 hidden items-center justify-end pr-8 font-serif text-[13rem] leading-none font-medium whitespace-nowrap text-white/[0.06] select-none lg:flex"
              aria-hidden="true"
            >
              {{ stage.title }}
            </span>

            <div class="relative flex min-h-[420px] flex-col justify-center p-8 sm:p-12 lg:min-h-[75vh] lg:max-w-xl lg:p-16">
              <span class="text-label text-accent">{{ stage.index }} / {{ totalLabel }}</span>
              <h3 class="text-display mt-6 text-white">{{ stage.title }}</h3>
              <p class="text-body-lg mt-6 max-w-md text-white/80">{{ stage.description }}</p>
              <p class="text-body mt-4 max-w-md text-white/50">{{ stage.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
