<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import type { Testimonial } from '~/types/testimonial'

interface Props {
  testimonial: Testimonial
}

defineProps<Props>()
</script>

<template>
  <figure class="flex h-full flex-col justify-between rounded-2xl border border-fog bg-white p-7 lg:p-8">
    <div>
      <blockquote class="text-body text-ink/80 text-pretty">
        “{{ testimonial.quote }}”
      </blockquote>

      <div class="mt-4 flex items-center gap-0.5" aria-label="5 out of 5 stars">
        <Star v-for="n in 5" :key="n" class="fill-amber-400 text-amber-400 size-4" aria-hidden="true" />
      </div>
    </div>

    <figcaption class="mt-6 flex items-center gap-3">
      <img :src="testimonial.avatar" :alt="`Portrait of ${testimonial.name}`" loading="lazy" class="size-11 rounded-full object-cover">
      <div>
        <p class="text-sm font-semibold text-ink">{{ testimonial.name }}</p>
        <p class="text-xs text-sand-600">{{ testimonial.role }}, {{ testimonial.company }}</p>
      </div>
    </figcaption>
  </figure>
</template>
