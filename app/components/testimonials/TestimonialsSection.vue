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
  <section id="testimonials" ref="root" class="bg-mist py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span class="text-label text-primary-900 mb-4 flex items-center gap-3">
            <span class="h-px w-8 bg-primary-900" aria-hidden="true" />
            Testimonials
          </span>
          <h2 class="text-h2 text-ink">What Our Clients Say</h2>
        </div>
        <AnimatedLink href="#testimonials" class="shrink-0">View All Testimonials</AnimatedLink>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="testimonial in testimonials" :key="testimonial.id" data-testimonial-card>
          <TestimonialCard :testimonial="testimonial" />
        </div>
      </div>
    </Container>
  </section>
</template>
