<script setup lang="ts">
import type { Testimonial } from '~/types/testimonial'

interface Props {
  testimonial: Testimonial
  /** `default` — large, editorial sizing for the Home slider. `compact` — smaller secondary placements (About, Services, Contact, Case Study). */
  size?: 'default' | 'compact'
  /** Text tone for the section it sits in — `ink` for light backgrounds, `white` for dark bands like the case-study charcoal section. */
  tone?: 'ink' | 'white'
}

withDefaults(defineProps<Props>(), { size: 'default', tone: 'ink' })
</script>

<template>
  <figure class="mx-auto max-w-3xl text-center">
    <img
      v-if="testimonial.portrait"
      :src="testimonial.portrait"
      :alt="`Portrait of ${testimonial.clientName}`"
      loading="lazy"
      class="mx-auto mb-8 size-16 rounded-full object-cover"
    >

    <blockquote
      class="text-balance"
      :class="[size === 'default' ? 'text-heading' : 'text-subheading', tone === 'white' ? 'text-white' : 'text-ink']"
    >
      “{{ testimonial.quote }}”
    </blockquote>

    <figcaption class="mt-8 flex flex-col items-center gap-1.5">
      <span class="text-body-sm font-medium" :class="tone === 'white' ? 'text-white' : 'text-ink'">
        {{ testimonial.clientName }}
      </span>
      <span class="text-body-sm" :class="tone === 'white' ? 'text-white/50' : 'text-ink-muted'">
        {{ testimonial.role }}, {{ testimonial.company }}
      </span>
      <span
        v-if="testimonial.project"
        class="text-caption mt-2 uppercase tracking-widest"
        :class="tone === 'white' ? 'text-white/40' : 'text-ink-muted/70'"
      >
        {{ testimonial.project }}
      </span>
    </figcaption>
  </figure>
</template>
