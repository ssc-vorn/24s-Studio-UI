<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'

const serviceList = serviceRepository.list()

/**
 * HOME / Services — rounded accordion stack. One card at a time reads as
 * active: an inverted-color panel (dark on light theme, light on dark) with
 * its description unfolding and a soft diagonal sweep across it, while the
 * rest sit collapsed to a title bar. Active state tracks scroll position via
 * the shared useScrollStory machinery, same as the rest of the site's
 * scroll-narrative sections, but the card-stack visual language here is its
 * own thing — no sticky panel, no split column.
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
          <h2 class="text-heading text-ink">Four disciplines, one studio.</h2>
        </div>
        <AnimatedLink to="/services" class="shrink-0">All Services</AnimatedLink>
      </div>

      <div class="mt-14 flex flex-col gap-3 lg:mt-20 lg:gap-4">
        <ServiceItem
          v-for="(service, index) in serviceList"
          :key="service.id"
          :service="service"
          :active="activeIndex === -1 ? index === 0 : activeIndex === index"
        />
      </div>
    </Container>
  </section>
</template>
