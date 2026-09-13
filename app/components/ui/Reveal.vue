<script setup lang="ts">
import type { RevealVariant } from '~/animations/core/reveal'
import { revealFrom, revealTo } from '~/animations/core/reveal'

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
const reduced = useReducedMotion()

onMounted(() => {
  if (!el.value) return
  const { gsap, ScrollTrigger } = useGsap()

  if (reduced.value) {
    gsap.set(el.value, { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' })
    return
  }

  gsap.set(el.value, revealFrom(props.variant))
  gsap.to(el.value, {
    ...revealTo(gsap, props.variant, { delay: props.delay }),
    scrollTrigger: {
      trigger: el.value,
      start: 'top 85%',
      toggleActions: props.once ? 'play none none none' : 'play none none reverse'
    }
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === el.value) trigger.kill()
    })
  })
})
</script>

<template>
  <component :is="props.as" ref="el">
    <slot />
  </component>
</template>
