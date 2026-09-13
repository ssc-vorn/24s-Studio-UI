<script setup lang="ts">
interface Props {
  label: string
  text: string
  image?: string
  reverse?: boolean
}

const props = withDefaults(defineProps<Props>(), { reverse: false })

const el = ref<HTMLElement | null>(null)
useScrollReveal(el, { start: 'top 82%' })
</script>

<template>
  <div ref="el" class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-5" :class="image && reverse ? 'lg:order-2' : ''">
      <p class="text-label text-ink-muted mb-5">{{ props.label }}</p>
      <p class="text-body-lg text-ink">{{ props.text }}</p>
    </div>
    <div v-if="image" class="lg:col-span-7">
      <img :src="image" :alt="props.label" loading="lazy" class="aspect-4/3 w-full object-cover">
    </div>
  </div>
</template>
