<script setup lang="ts">
import { processStages } from '~/data/studio'
import { animateProcessFocusChange } from '~/animations/sections/process'

// The GSAP focus crossfade (numeral + title opacity/scale) only makes sense
// paired with the sticky numeral, which is desktop-only (`hidden lg:block`).
// On mobile there's nothing for a dimmed title to contrast against, so
// skip the animation there entirely — the CSS class-driven color change
// (text-ink vs text-ink-muted) stays as the only, much subtler cue.
const { isDesktop } = useBreakpoints()

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
        if (!isDesktop.value) return
        const numerals = Array.from(root.querySelectorAll('[data-process-numeral]'))
        const titles = Array.from(root.querySelectorAll('[data-process-title]'))
        animateProcessFocusChange(gsap, numerals, titles, index, previousIndex)
      }
    }
  }
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

      <div class="mt-16 grid grid-cols-1 gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-12">
        <!-- Sticky editorial numeral — the section's single visual anchor;
             no card, no image, just oversized type crossfading in place. -->
        <div class="hidden lg:col-span-5 lg:block">
          <div class="sticky top-32">
            <div class="relative h-[22rem] overflow-hidden">
              <span
                v-for="(stage, index) in processStages"
                :key="stage.index"
                data-process-numeral
                class="text-ink/[0.09] absolute inset-0 flex items-center font-serif text-[15rem] leading-none font-light select-none"
                :class="index === 0 ? 'opacity-100' : 'opacity-0'"
                aria-hidden="true"
              >
                {{ stage.index }}
              </span>
            </div>

            <div class="mt-6 flex items-center gap-4" aria-hidden="true">
              <span class="text-label text-ink-muted tabular-nums">{{ activeLabel }} / {{ totalLabel }}</span>
              <div class="bg-border-subtle relative h-px flex-1 overflow-hidden">
                <span
                  class="bg-accent absolute inset-y-0 left-0 h-full origin-left transition-transform duration-500 ease-out"
                  :style="{ transform: `scaleX(${(activeIndex + 1) / processStages.length})` }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Stage list — no boxes, just hairline dividers and typography
             settling into and out of focus as it becomes the active stage. -->
        <div class="lg:col-span-7">
          <div
            v-for="(stage, index) in processStages"
            :key="stage.index"
            data-story-stage
            class="border-border-subtle border-t py-14 first:border-t-0 lg:py-20"
          >
            <span class="text-label text-accent lg:hidden">{{ stage.index }} / {{ totalLabel }}</span>
            <h3
              data-process-title
              class="text-display text-ink mt-3 transition-colors duration-500 will-change-transform lg:mt-0"
              :class="activeIndex !== -1 && activeIndex !== index ? 'text-ink-muted' : ''"
            >
              {{ stage.title }}
            </h3>
            <p class="text-body-lg text-ink mt-6 max-w-lg">{{ stage.description }}</p>
            <p class="text-body text-ink-muted mt-4 max-w-lg">{{ stage.detail }}</p>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
