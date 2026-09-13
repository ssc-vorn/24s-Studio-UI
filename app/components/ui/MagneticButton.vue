<script setup lang="ts">
import { attachMagnetic } from '~/animations/core/hover'

interface Props {
  as?: 'button' | 'a' | 'NuxtLink'
  href?: string
  variant?: 'solid' | 'outline'
  type?: 'button' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'solid',
  type: 'button'
})

const emit = defineEmits<{ click: [MouseEvent] }>()

const el = ref<HTMLElement | { $el: HTMLElement } | null>(null)
const reduced = useReducedMotion()
let cleanup: (() => void) | undefined

onMounted(() => {
  const target = el.value instanceof HTMLElement ? el.value : (el.value?.$el as HTMLElement | undefined)
  if (reduced.value || !target) return
  const { gsap } = useGsap()
  cleanup = attachMagnetic(gsap, target, { strength: 0.3 })
})

onUnmounted(() => {
  cleanup?.()
})
</script>

<template>
  <component
    :is="props.as === 'NuxtLink' ? 'NuxtLink' : props.as"
    ref="el"
    :href="props.as === 'a' ? href : undefined"
    :to="props.as === 'NuxtLink' ? href : undefined"
    :type="props.as === 'button' ? props.type : undefined"
    class="group relative inline-flex items-center gap-3 overflow-hidden px-8 py-4 text-label transition-colors duration-300 will-change-transform"
    :class="
      props.variant === 'solid'
        ? 'bg-primary-900 text-white hover:bg-primary-800'
        : 'border border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white'
    "
    @click="emit('click', $event)"
  >
    <slot />
  </component>
</template>
