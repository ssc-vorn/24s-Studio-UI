<script setup lang="ts">
import { Layers, Megaphone, Palette, PenTool, Sparkles, Video } from 'lucide-vue-next'
import { services } from '~/data/services'

const icons = [PenTool, Palette, Video, Sparkles, Layers, Megaphone]

const { root } = useScrollAnimation(({ gsap, root }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const cards = Array.from(root.querySelectorAll('[data-service-card]'))

  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
  }

  if (cards.length) {
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 70%' }
      }
    )
  }
})
</script>

<template>
  <section id="services" ref="root" class="bg-off-white py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Services"
          description="From identity to interface, we hold every discipline to the same standard of craft."
        />
        <AnimatedLink href="#services" class="shrink-0">Explore All Services</AnimatedLink>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(service, index) in services" :key="service.id" data-service-card>
          <ServiceCard :service="service" :icon="icons[index % icons.length]!" />
        </div>
      </div>
    </Container>
  </section>
</template>
