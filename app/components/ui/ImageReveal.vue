<script setup lang="ts">
interface Props {
  src: string
  alt: string
  /** Extra classes on the inner `<img>` itself (e.g. object-position) — the outer clip wrapper already gets any `class` passed on the component via normal attrs fallthrough. */
  imgClass?: string
  loading?: 'lazy' | 'eager'
  parallax?: boolean
  parallaxDistance?: number
}

const props = withDefaults(defineProps<Props>(), { loading: 'lazy', parallax: false })

const root = ref<HTMLElement | null>(null)
const imgEl = ref<HTMLElement | null>(null)

useImageReveal(root, imgEl, { parallax: props.parallax, parallaxDistance: props.parallaxDistance })

/** Exposed so a parent can read the real `<img>` node directly — e.g. the shared-element Work → Case Study transition needs a raw ref to capture on click, not just the reveal behavior. */
defineExpose({ imgEl })
</script>

<template>
  <div ref="root" class="relative overflow-hidden">
    <img ref="imgEl" :src="src" :alt="alt" :loading="loading" class="size-full object-cover" :class="imgClass">
  </div>
</template>
