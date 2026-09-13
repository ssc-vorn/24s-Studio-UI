<script setup lang="ts">
import type { RevealVariant } from '~/animations/core/reveal'
import { revealFrom, revealTo } from '~/animations/core/reveal'

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
const reduced = useReducedMotion()

onMounted(() => {
  if (!el.value) return
  const children = Array.from(el.value.children)
  if (!children.length) return

  const { gsap, ScrollTrigger } = useGsap()

  if (reduced.value) {
    gsap.set(children, { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' })
    return
  }

  gsap.set(children, revealFrom(props.variant))
  gsap.to(children, {
    ...revealTo(gsap, props.variant, { stagger: props.stagger }),
    scrollTrigger: { trigger: el.value, start: props.start }
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
