<script setup lang="ts">
import type { RevealVariant } from '~/animations/core/reveal'

interface Props {
  as?: string
  variant?: RevealVariant
  stagger?: number
  start?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  variant: 'fade-up',
  stagger: 0.1,
  start: 'top 82%'
})

const el = ref<HTMLElement | null>(null)
useScrollReveal(el, { variant: props.variant, stagger: props.stagger, start: props.start, staggerChildren: true })
</script>

<template>
  <component :is="props.as" ref="el">
    <slot />
  </component>
</template>
