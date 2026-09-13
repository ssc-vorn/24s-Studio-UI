<script setup lang="ts">
import { services } from '~/data/services'
import { revealServiceRows } from '~/animations/sections/services'

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
  }

  const rows = Array.from(root.querySelectorAll('[data-service-row]'))
  if (rows.length) revealServiceRows(gsap, rows, root, reduced)
})
</script>

<template>
  <section id="services" ref="root" class="bg-mist py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="max-w-2xl">
        <SectionHeading
          eyebrow="What We Do"
          title="Six disciplines. One coherent creative practice."
          description="From identity to interface, we hold every discipline to the same standard of craft."
        />
      </div>

      <div class="mt-16">
        <div v-for="service in services" :key="service.id" data-service-row>
          <ServiceCard :service="service" />
        </div>
      </div>
    </Container>
  </section>
</template>
