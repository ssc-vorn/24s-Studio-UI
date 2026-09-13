<script setup lang="ts">
import { animateManifestoReveal } from '~/animations/sections/manifesto'

const statement =
  'We create brands, digital experiences and visual stories that move people. Every project starts with a point of view, not a template — and ends with something worth remembering.'

const words = statement.split(' ')

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const wordEls = Array.from(root.querySelectorAll('[data-word]'))
  animateManifestoReveal(gsap, wordEls, root, reduced)
})
</script>

<template>
  <section ref="root" class="bg-surface py-32 lg:py-48">
    <Container narrow>
      <p class="text-heading max-w-5xl text-ink">
        <span v-for="(word, index) in words" :key="index" data-word class="inline-block">{{ word }}&nbsp;</span>
      </p>
    </Container>
  </section>
</template>
