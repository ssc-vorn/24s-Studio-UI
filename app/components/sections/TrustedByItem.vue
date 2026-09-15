<script setup lang="ts">
import type { TrustedBrand } from '~/types/trustedBrand'

interface Props {
  brand: TrustedBrand
  /** White-toned wordmark for placement on a permanently dark surface (e.g. the Hero) — same naming convention as BrandLogo/ScrollIndicator's own `inverse` prop. Default preserves every existing (light-surface) usage unchanged. */
  inverse?: boolean
}

const props = withDefaults(defineProps<Props>(), { inverse: false })

const el = ref<HTMLElement | { $el: HTMLElement } | null>(null)
useMagnetic(el, { strength: 0.15 })

const wordmarkClass = computed(() => [
  'font-sans text-base italic tracking-wide transition-colors duration-300 sm:text-lg',
  props.inverse ? 'text-white/50' : 'text-ink-muted'
])
const hoverClass = computed(() => 'group-hover:text-accent')
</script>

<template>
  <NuxtLink
    v-if="brand.caseStudySlug"
    ref="el"
    :to="`/work/${brand.caseStudySlug}`"
    class="group relative inline-block opacity-100 transition-[opacity,transform] duration-300 will-change-transform group-hover/wall:opacity-45 hover:scale-[1.04] hover:opacity-100!"
    :aria-label="`View the ${brand.name} case study`"
  >
    <span :class="[wordmarkClass, hoverClass]">{{ brand.name }}</span>
    <span
      class="bg-accent absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      aria-hidden="true"
    />
  </NuxtLink>

  <span v-else :class="[wordmarkClass, 'transition-opacity duration-300 group-hover/wall:opacity-45']">{{ props.brand.name }}</span>
</template>
