<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'
import { revealServiceRows } from '~/animations/sections/services'

const serviceList = serviceRepository.list()

/**
 * HOME / Services — full-width content grid. No split column, no sticky
 * panel, no single service singled out as "active" — a deliberately
 * different composition from Creative Process's sticky-ghost numeral walk.
 * Every service sits at equal weight in a bordered spec-sheet grid, and the
 * whole set reveals as one staggered cascade as the section scrolls in.
 */
const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const rows = Array.from(root.querySelectorAll('[data-service-row]'))

  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
  }

  revealServiceRows(gsap, rows, root, reduced)
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

      <div class="border-border-subtle mt-14 grid grid-cols-1 border-t border-l lg:mt-20 lg:grid-cols-2">
        <ServiceItem v-for="service in serviceList" :key="service.id" :service="service" />
      </div>
    </Container>
  </section>
</template>
