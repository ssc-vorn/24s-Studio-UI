<script setup lang="ts">
import { testimonials } from '~/data/testimonials'
import { revealTestimonials } from '~/animations/sections/testimonials'

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
  }

  const cards = Array.from(root.querySelectorAll('[data-testimonial-card]'))
  if (cards.length) revealTestimonials(gsap, cards, root, reduced)
})
</script>

<template>
  <section id="testimonials" ref="root" class="bg-navy-900 py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="max-w-2xl">
        <span class="text-label mb-6 flex items-center gap-3 text-white/60">
          <span class="h-px w-8 bg-white/40" aria-hidden="true" />
          Client Voices
        </span>
        <h2 class="text-h2 text-balance text-white">Trusted by teams who care about craft as much as we do.</h2>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div v-for="testimonial in testimonials" :key="testimonial.id" data-testimonial-card>
          <TestimonialCard :testimonial="testimonial" />
        </div>
      </div>
    </Container>
  </section>
</template>
