<script setup lang="ts">
import type { TrustedBrand } from '~/types/trustedBrand'

interface Props {
  brand: TrustedBrand
}

const props = defineProps<Props>()

const el = ref<HTMLElement | { $el: HTMLElement } | null>(null)
useMagnetic(el, { strength: 0.15 })

const wordmarkClass = 'font-serif text-lg text-ink-muted italic transition-colors duration-300 sm:text-xl'
</script>

<template>
  <NuxtLink
    v-if="brand.caseStudySlug"
    ref="el"
    :to="`/work/${brand.caseStudySlug}`"
    class="group relative inline-block will-change-transform"
    :aria-label="`View the ${brand.name} case study`"
  >
    <span :class="[wordmarkClass, 'group-hover:text-ink']">{{ brand.name }}</span>
    <span
      class="bg-accent absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      aria-hidden="true"
    />
  </NuxtLink>

  <span v-else :class="wordmarkClass">{{ props.brand.name }}</span>
</template>
