<script setup lang="ts">
interface Props {
  as?: string
  narrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  narrow: false
})
</script>

<template>
  <component :is="props.as" class="max-content w-full px-6 sm:px-10 lg:px-16" :class="narrow ? 'max-w-[1200px]' : ''">
    <slot />
  </component>
</template>
