<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'

const serviceList = serviceRepository.list()

/**
 * HOME / Services — sticky card stack with a title-then-detail scroll
 * narrative layered on top. Every card pins in place with pure CSS
 * position: sticky (a slightly larger top offset per card, so earlier cards
 * peek out above), compositor-friendly with no scroll-linked JS driving the
 * pin/cover motion itself. On top of that, only the card currently at the
 * front of the stack — tracked via the shared useScrollStory machinery —
 * unfolds its full detail; every other card collapses to a title-only tab,
 * so scrolling down through the stack reads as: title, then detail, then
 * collapse back to a title as the next card takes over.
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
  }
})
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
          <h2 class="text-heading text-ink">Every discipline, one studio.</h2>
        </div>
        <AnimatedLink to="/services" class="shrink-0">All Services</AnimatedLink>
      </div>

      <div class="mt-14 lg:mt-20">
        <div
          v-for="(service, index) in serviceList"
          :key="service.id"
          class="pb-6 last:pb-0"
          :class="index !== serviceList.length - 1 ? 'min-h-[55vh] lg:min-h-[65vh]' : ''"
        >
          <ServiceItem :service="service" :index="index" :active="activeIndex === -1 ? index === 0 : activeIndex === index" />
        </div>
      </div>
    </Container>
  </section>
</template>
