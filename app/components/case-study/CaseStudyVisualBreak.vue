<script setup lang="ts">
interface Props {
  image: string
  alt: string
}

defineProps<Props>()

/**
 * CASE STUDY / large visual moment — scroll — a full-bleed breather image
 * between narrative sections. A slow scroll-scrubbed zoom-out (1.18 → 1)
 * gives it a cinematic, Ken-Burns-adjacent feel without any pin or scroll
 * hijacking — it's simple document flow the whole way through.
 * Library: GSAP + ScrollTrigger (scrub). Reduced motion: static, no zoom.
 */
const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const img = root.querySelector('[data-reveal="break-image"]')
  if (reduced) {
    gsap.set(img, { scale: 1 })
    return
  }
  gsap.fromTo(
    img,
    { scale: 1.18 },
    { scale: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }
  )
})
</script>

<template>
  <div ref="root" class="relative h-[60vh] w-full overflow-hidden lg:h-[85vh]">
    <img data-reveal="break-image" :src="image" :alt="alt" loading="lazy" class="absolute inset-0 size-full object-cover">
  </div>
</template>
