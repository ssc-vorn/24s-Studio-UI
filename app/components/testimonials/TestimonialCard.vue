<script setup lang="ts">
import { Quote } from 'lucide-vue-next'
import type { Testimonial } from '~/types/testimonial'

interface Props {
  testimonial: Testimonial
}

defineProps<Props>()
</script>

<template>
  <figure class="flex h-full flex-col justify-between border border-fog bg-off-white p-8 lg:p-10">
    <Quote class="text-primary-900/30 mb-6 size-8" aria-hidden="true" />
    <blockquote class="text-body-lg text-ink flex-1 text-pretty">
      “{{ testimonial.quote }}”
    </blockquote>
    <figcaption class="mt-8 flex items-center gap-4">
      <img :src="testimonial.avatar" :alt="`Portrait of ${testimonial.name}`" loading="lazy" class="size-12 rounded-full object-cover">
      <div>
        <p class="text-body font-medium text-ink">{{ testimonial.name }}</p>
        <p class="text-body-sm text-sand-600">{{ testimonial.role }}, {{ testimonial.company }}</p>
      </div>
    </figcaption>
  </figure>
</template>
