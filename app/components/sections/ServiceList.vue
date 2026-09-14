<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'

const serviceList = serviceRepository.list()

/**
 * HOME / Services — Big List. The list itself is the visual language: the
 * active row's title balloons into giant serif type with its summary and
 * capabilities expanding inline beneath it, while the rest recede to small,
 * muted type — no split column, no separate preview panel. Active state
 * tracks scroll via the shared `useScrollStory` machinery; clicking or
 * hovering a row overrides it directly on any breakpoint, writing to the
 * same ref the scroll tracking uses.
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

/** Reduced motion parks `activeIndex` at the -1 sentinel; fall back to the first row so the list still reads as one deliberate composition rather than a flat, hierarchy-less stack. */
const displayIndex = computed(() => (activeIndex.value === -1 ? 0 : activeIndex.value))
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

      <div data-reveal="list" class="mt-14 lg:mt-20">
        <ServiceItem
          v-for="(service, index) in serviceList"
          :key="service.id"
          data-service-stage
          :service="service"
          :active="displayIndex === index"
          @hover="activeIndex = index"
        />
      </div>
    </Container>
  </section>
</template>
