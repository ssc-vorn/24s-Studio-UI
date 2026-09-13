<script setup lang="ts">
import type { RevealVariant } from '~/animations/core/reveal'

interface Props {
  as?: string
  variant?: RevealVariant
  delay?: number
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  variant: 'fade-up',
  delay: 0,
  once: true
})

const el = ref<HTMLElement | null>(null)
useScrollReveal(el, { variant: props.variant, delay: props.delay, once: props.once })
</script>

<template>
  <component :is="props.as" ref="el">
    <slot />
  </component>
</template>
