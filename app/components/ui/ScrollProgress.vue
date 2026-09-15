<script setup lang="ts">
interface Props {
  /** CSS selector for the element whose scroll span the bar tracks (its own top→bottom, not the whole document). */
  target: string
  inverse?: boolean
}

const props = withDefaults(defineProps<Props>(), { inverse: false })

const fillEl = ref<HTMLElement | null>(null)

/**
 * UI / ScrollProgress — a thin fixed bar tracking how far the reader is
 * through `target` (its own top→bottom span, not the whole document).
 * Driven by a plain ScrollTrigger `onUpdate`, set via GSAP `scaleX` rather
 * than the `width` property so it never triggers layout. Not gated behind
 * reduced motion: this is a functional reading indicator driven 1:1 by the
 * reader's own scrolling, not ambient/decorative motion.
 */
onMounted(() => {
  const targetEl = document.querySelector<HTMLElement>(props.target)
  if (!targetEl || !fillEl.value) return

  const { gsap, ScrollTrigger } = useGsap()
  const trigger = ScrollTrigger.create({
    trigger: targetEl,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => gsap.set(fillEl.value, { scaleX: self.progress })
  })

  onUnmounted(() => trigger.kill())
})
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-40 h-0.5" :class="inverse ? 'bg-white/15' : 'bg-border-subtle'">
    <div ref="fillEl" class="bg-accent h-full w-full origin-left scale-x-0" aria-hidden="true" />
  </div>
</template>
