<script setup lang="ts">
import { pricingTiers } from '~/data/pricing'

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const cards = Array.from(root.querySelectorAll('[data-pricing-card]'))

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
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.001 : 0.8,
        stagger: reduced ? 0 : 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 70%' }
      }
    )
  }
})
</script>

<template>
  <section id="pricing" ref="root" class="bg-mist py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="max-w-2xl">
        <SectionHeading
          eyebrow="Engagement Models"
          title="Packages built around how brands actually grow."
          description="Every engagement is scoped around your goals — these tiers are a starting point for the conversation."
        />
      </div>

      <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="tier in pricingTiers" :key="tier.id" data-pricing-card>
          <PricingCard :tier="tier" />
        </div>
      </div>
    </Container>
  </section>
</template>
