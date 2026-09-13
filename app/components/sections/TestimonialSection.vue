<script setup lang="ts">
import { testimonialRepository } from '~/repositories/testimonialRepository'

const testimonial = testimonialRepository.list()[0]

const { root } = useScrollAnimation(({ gsap, root }) => {
  const content = root.querySelector('[data-reveal="quote"]')
  gsap.fromTo(
    content,
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 75%' } }
  )
})
</script>

<template>
  <section v-if="testimonial" ref="root" class="bg-surface py-28 lg:py-40">
    <Container narrow>
      <div data-reveal="quote">
        <TestimonialQuote :testimonial="testimonial" />
      </div>
    </Container>
  </section>
</template>
