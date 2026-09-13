<script setup lang="ts">
import { attachMagnetic } from '~/animations/core/hover'

interface Props {
  as?: 'button' | 'a' | 'NuxtLink'
  href?: string
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
  type?: 'button' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'solid',
  size: 'md',
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
  cleanup = attachMagnetic(gsap, target, { strength: 0.25 })
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
    class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-300 will-change-transform"
    :class="[
      props.size === 'sm' ? 'px-5 py-2.5' : 'px-7 py-3.5',
      props.variant === 'solid'
        ? 'bg-primary-900 text-white hover:bg-primary-800'
        : props.variant === 'outline'
          ? 'border border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white'
          : 'bg-black/5 text-ink hover:bg-black/10'
    ]"
    @click="emit('click', $event)"
  >
    <slot />
  </component>
</template>
