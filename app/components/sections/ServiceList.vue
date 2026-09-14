<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'

const serviceList = serviceRepository.list()

/**
 * HOME / Services — sticky card stack. Every card pins in place as it
 * reaches the top of the viewport (a slightly larger `top` offset per card
 * so a sliver of each earlier card peeks out above), then gets gracefully
 * covered as the next one scrolls up over it — pure CSS `position: sticky`,
 * no scroll-linked JS driving the motion, so it stays smooth and compositor-
 * friendly at any frame rate. Each card sits in a tall "runway" wrapper so
 * there's real scroll distance for it to hold its pinned position before
 * the next card arrives.
 */
const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: reduced ? 0.001 : 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
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
          <h2 class="text-heading text-ink">Four disciplines, one studio.</h2>
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
          <ServiceItem :service="service" :index="index" />
        </div>
      </div>
    </Container>
  </section>
</template>
