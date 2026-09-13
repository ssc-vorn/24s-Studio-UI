<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left'
})
</script>

<template>
  <div :class="['flex flex-col gap-5', props.align === 'center' ? 'items-center text-center' : 'items-start text-left']">
    <span v-if="eyebrow" class="text-label text-accent flex items-center gap-3">
      <span class="bg-accent h-px w-8" aria-hidden="true" />
      {{ eyebrow }}
    </span>
    <h2 class="text-heading text-ink max-w-3xl text-balance">
      {{ title }}
    </h2>
    <p v-if="description" class="text-body-lg text-ink-muted max-w-xl text-pretty">
      {{ description }}
    </p>
  </div>
</template>
