<script setup lang="ts">
import type { Testimonial } from '~/types/testimonial'

interface Props {
  testimonial: Testimonial
}

defineProps<Props>()
</script>

<template>
  <figure class="mx-auto max-w-4xl text-center">
    <blockquote class="text-heading text-ink text-balance">“{{ testimonial.quote }}”</blockquote>
    <figcaption class="text-body-sm text-ink-muted mt-8">
      {{ testimonial.name }} — {{ testimonial.role }}, {{ testimonial.company }}
    </figcaption>
  </figure>
</template>
