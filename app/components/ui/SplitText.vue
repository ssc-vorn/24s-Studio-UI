<script setup lang="ts">
interface Props {
  as?: string
  type?: 'lines' | 'words' | 'chars' | string
  stagger?: number
  duration?: number
  start?: string
}

const props = withDefaults(defineProps<Props>(), { as: 'div' })

const el = ref<HTMLElement | null>(null)
useSplitText(el, { type: props.type, stagger: props.stagger, duration: props.duration, start: props.start })
</script>

<template>
  <component :is="props.as" ref="el">
    <slot />
  </component>
</template>
