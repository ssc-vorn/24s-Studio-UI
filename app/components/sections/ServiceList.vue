<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'

const serviceList = serviceRepository.list()

const previewImages = [
  'https://picsum.photos/900/1100?random=331',
  'https://picsum.photos/900/1100?random=332',
  'https://picsum.photos/900/1100?random=333',
  'https://picsum.photos/900/1100?random=334'
]

/**
 * HOME / Services — scroll — which service reads as "active" (accent index,
 * bold title, arrow nudge, preview crossfade) now tracks scroll position as
 * the primary driver, via the same `useScrollStory` machinery as Creative
 * Process; hovering a row still overrides it directly for a quick preview,
 * writing to the same ref so the preview panel's plain CSS opacity
 * crossfade responds identically either way — no separate GSAP path needed
 * for a change this restrained.
 */
const { root, activeIndex } = useScrollStory({
  stageSelector: '[data-service-stage]',
  setup: ({ gsap, root }) => {
    const heading = root.querySelector('[data-reveal="heading"]')
    const list = root.querySelector('[data-reveal="list"]')
    const preview = root.querySelector('[data-reveal="preview"]')

    gsap.fromTo(
      [heading, list, preview],
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
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

        <div data-reveal="preview" class="bg-charcoal-200 relative hidden aspect-4/5 overflow-hidden lg:col-span-5 lg:block">
          <img
            v-for="(image, index) in previewImages"
            :key="image"
            :src="image"
            alt=""
            class="absolute inset-0 size-full object-cover transition-opacity duration-500"
            :class="activeIndex === index ? 'opacity-100' : 'opacity-0'"
          >
        </div>
      </div>
    </Container>
  </section>
</template>
