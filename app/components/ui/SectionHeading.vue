<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  size?: 'h1' | 'h2' | 'h3'
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left',
  size: 'h2'
})
</script>

<template>
  <div :class="['flex flex-col gap-5', props.align === 'center' ? 'items-center text-center' : 'items-start text-left']">
    <span v-if="eyebrow" class="text-label text-primary-900 flex items-center gap-3">
      <span class="h-px w-8 bg-primary-900" aria-hidden="true" />
      {{ eyebrow }}
    </span>
    <h2 :class="[props.size === 'h1' ? 'text-h1' : props.size === 'h3' ? 'text-h3' : 'text-h2', 'text-ink max-w-3xl text-balance']">
      {{ title }}
    </h2>
    <p v-if="description" class="text-body-lg text-sand-600 max-w-xl text-pretty">
      {{ description }}
    </p>
  </div>
</template>
