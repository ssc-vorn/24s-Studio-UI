<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'
import { revealServiceRows } from '~/animations/sections/services'

const serviceList = serviceRepository.list()

/**
 * HOME / Services — full-width bordered content grid with a two-layer
 * scroll narrative, no split panel and no single "active" card. Every
 * service card clips into place with just its title showing (stage one);
 * scrolling further reveals that card's own detail — summary and
 * capabilities — independently per card (stage two), so it reads as a
 * continuous unfolding story rather than a single card swapping focus.
 * Default state is fully revealed (safe without JS, and under reduced
 * motion); JS collapses the detail only once GSAP actually initialises,
 * then reveals each card's detail via its own ScrollTrigger as it scrolls in.
 */
const revealedDetails = ref<boolean[]>(serviceList.map(() => true))

const { root } = useScrollAnimation(({ gsap, root, reduced, ScrollTrigger }) => {
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

  if (reduced) return

  revealedDetails.value = serviceList.map(() => false)
  rows.forEach((row, index) => {
    ScrollTrigger.create({
      trigger: row,
      start: 'top 70%',
      onEnter: () => {
        revealedDetails.value[index] = true
      }
    })
  })
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
        <ServiceItem v-for="(service, index) in serviceList" :key="service.id" :service="service" :revealed="revealedDetails[index] ?? true" />
      </div>
    </Container>
  </section>
</template>
