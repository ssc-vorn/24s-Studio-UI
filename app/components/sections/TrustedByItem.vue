<script setup lang="ts">
interface Props {
  name: string
  slug: string
}

defineProps<Props>()

const el = ref<HTMLElement | { $el: HTMLElement } | null>(null)
useMagnetic(el, { strength: 0.15 })
</script>

<template>
  <NuxtLink ref="el" :to="`/work/${slug}`" class="group relative inline-block will-change-transform" :aria-label="`View the ${name} case study`">
    <span class="font-serif text-lg text-ink-muted italic transition-colors duration-300 group-hover:text-ink sm:text-xl">
      {{ name }}
    </span>
    <span
      class="bg-accent absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      aria-hidden="true"
    />
  </NuxtLink>
</template>
