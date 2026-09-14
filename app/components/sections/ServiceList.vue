<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'
import { animateServiceFocusChange } from '~/animations/sections/services'

const serviceList = serviceRepository.list()

// The GSAP focus crossfade (ghost title + list title opacity/scale) only
// makes sense paired with the sticky ghost panel, which is desktop-only
// (`hidden lg:block`). On mobile there's nothing for a dimmed title to
// contrast against, so skip the animation there entirely — the CSS
// class-driven color change (text-ink vs text-ink-muted) stays as the only,
// much subtler cue. Mirrors Creative Process exactly.
const { isDesktop } = useBreakpoints()

/**
 * HOME / Services — Layered Scroll Narrative, pure scroll-driven. No hover,
 * no click: a sticky ghost-typography panel crossfades through the active
 * service's title as the user scrolls, the same motion language as Creative
 * Process's numeral walk, so the two sections read as one continuous idea.
 */
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
        const ghosts = Array.from(root.querySelectorAll('[data-service-ghost]'))
        const titles = Array.from(root.querySelectorAll('[data-service-title]'))
        animateServiceFocusChange(gsap, ghosts, titles, index, previousIndex)
      }
    }
  }
})

const totalLabel = String(serviceList.length).padStart(2, '0')
const activeLabel = computed(() => serviceList[activeIndex.value]?.index ?? serviceList[0]!.index)
</script>

<template>
  <section id="services" ref="root" class="bg-surface py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span class="text-label text-accent mb-5 flex items-center gap-3">
            <span class="bg-accent h-px w-8" aria-hidden="true" />
            What We Do
          </span>
          <h2 class="text-heading text-ink">Four disciplines, one studio.</h2>
        </div>
        <AnimatedLink to="/services" class="shrink-0">All Services</AnimatedLink>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-12">
        <!-- Sticky ghost panel — the section's single visual anchor; no
             card, no image, just oversized type crossfading in place. -->
        <div class="hidden lg:col-span-5 lg:block">
          <div class="sticky top-32">
            <div class="relative h-[22rem] overflow-hidden">
              <span
                v-for="(service, index) in serviceList"
                :key="service.id"
                data-service-ghost
                class="text-ink/[0.08] absolute inset-0 flex items-center font-serif text-[5.5rem] leading-[0.95] font-light uppercase select-none"
                :class="index === 0 ? 'opacity-100' : 'opacity-0'"
                aria-hidden="true"
              >
                {{ service.title }}
              </span>
            </div>

            <div class="mt-6 flex items-center gap-4" aria-hidden="true">
              <span class="text-label text-ink-muted tabular-nums">{{ activeLabel }} / {{ totalLabel }}</span>
              <div class="bg-border-subtle relative h-px flex-1 overflow-hidden">
                <span
                  class="bg-accent absolute inset-y-0 left-0 h-full origin-left transition-transform duration-500 ease-out"
                  :style="{ transform: `scaleX(${(Math.max(activeIndex, 0) + 1) / serviceList.length})` }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Service list — no boxes, just hairline dividers and typography
             settling into and out of focus as it becomes the active service. -->
        <div class="lg:col-span-7">
          <ServiceItem
            v-for="(service, index) in serviceList"
            :key="service.id"
            :service="service"
            :active="activeIndex === -1 ? index === 0 : activeIndex === index"
          />
        </div>
      </div>
    </Container>
  </section>
</template>
