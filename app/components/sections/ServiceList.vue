<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'

const serviceList = serviceRepository.list()

/**
 * HOME / Services — Layered Scroll Narrative, no imagery. The sticky column
 * carries a giant, near-invisible "ghost" title of whichever service reads
 * as active (same depth-layer language as Creative Process's numeral walk),
 * plus a live progress indicator. Scroll position drives it via the shared
 * `useScrollStory` machinery; hovering a row still overrides it directly for
 * a quick preview, writing to the same ref so the ghost crossfade responds
 * identically either way — a plain CSS opacity/scale transition, no separate
 * GSAP path needed for a change this restrained.
 */
const { root, activeIndex } = useScrollStory({
  stageSelector: '[data-service-stage]',
  setup: ({ gsap, root }) => {
    const heading = root.querySelector('[data-reveal="heading"]')
    const list = root.querySelector('[data-reveal="list"]')

    gsap.fromTo(
      [heading, list],
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
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

      <div class="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal="list" class="lg:col-span-7">
          <ServiceItem
            v-for="(service, index) in serviceList"
            :key="service.id"
            data-service-stage
            :service="service"
            :active="activeIndex === index"
            @hover="activeIndex = index"
          />
        </div>

        <div class="hidden lg:col-span-5 lg:block">
          <div class="sticky top-32">
            <div class="relative h-[22rem] overflow-hidden">
              <span
                v-for="(service, index) in serviceList"
                :key="service.id"
                class="text-ink/[0.08] absolute inset-0 flex items-center font-serif text-[5.5rem] leading-[0.95] font-light uppercase transition-all duration-700 ease-out select-none"
                :class="(activeIndex === -1 ? index === 0 : activeIndex === index) ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
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
      </div>
    </Container>
  </section>
</template>
