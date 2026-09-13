<script setup lang="ts">
import { pricingTiers } from '~/data/pricing'

const billing = ref<'monthly' | 'yearly'>('monthly')

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
  <section id="pricing" ref="root" class="bg-off-white py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="flex flex-col items-center gap-6 text-center">
        <SectionHeading
          align="center"
          eyebrow="Pricing & Packages"
          title="Simple, Transparent Pricing"
          description="Choose the perfect plan for your next project."
        />

        <div class="inline-flex items-center gap-1 rounded-full bg-black/5 p-1">
          <button
            type="button"
            class="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            :class="billing === 'monthly' ? 'bg-white text-ink shadow-sm' : 'text-ink/50 hover:text-ink'"
            @click="billing = 'monthly'"
          >
            Monthly
          </button>
          <button
            type="button"
            class="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors"
            :class="billing === 'yearly' ? 'bg-white text-ink shadow-sm' : 'text-ink/50 hover:text-ink'"
            @click="billing = 'yearly'"
          >
            Yearly
            <span class="rounded-full bg-primary-900 px-2 py-0.5 text-xs font-semibold text-white">Save 20%</span>
          </button>
        </div>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div v-for="tier in pricingTiers" :key="tier.id" data-pricing-card>
          <PricingCard :tier="tier" :billing="billing" />
        </div>
      </div>
    </Container>
  </section>
</template>
