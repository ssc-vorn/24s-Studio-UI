<script setup lang="ts">
interface Props {
  items: string[]
  /** Seconds for one full loop at rest (pre-velocity-boost) scroll speed. */
  duration?: number
}

const props = withDefaults(defineProps<Props>(), { duration: 20 })

const trackEl = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()

let tween: ReturnType<typeof import('gsap').gsap.to> | null = null
let unsubscribe: (() => void) | null = null

/**
 * UI / Marquee — a continuous GSAP loop (xPercent 0 → -50 across two
 * duplicated item sets, so the loop point is invisible) whose `timeScale`
 * is nudged up in proportion to Lenis scroll velocity — a fast scroll
 * briefly accelerates the marquee, then it eases back to its resting
 * speed. Clamped so a violent flick never reads as motion sickness.
 * Reduced motion: track renders static, no tween, no velocity listener.
 */
onMounted(() => {
  if (!trackEl.value || reduced.value) return
  const { gsap } = useGsap()

  tween = gsap.to(trackEl.value, {
    xPercent: -50,
    duration: props.duration,
    ease: 'none',
    repeat: -1
  })

  const { lenis } = useLenis()
  if (lenis) {
    unsubscribe = lenis.on('scroll', (instance) => {
      const boost = 1 + Math.min(Math.abs(instance.velocity) * 0.6, 3)
      gsap.to(tween!, { timeScale: boost, duration: 0.4, ease: 'power2.out', overwrite: true })
    })
  }
})

onUnmounted(() => {
  unsubscribe?.()
  tween?.kill()
})
</script>

<template>
  <div class="border-border-subtle overflow-hidden border-y py-6 lg:py-8" aria-hidden="true">
    <div ref="trackEl" class="flex w-max items-center whitespace-nowrap will-change-transform">
      <span v-for="setIndex in 2" :key="setIndex" class="flex shrink-0 items-center">
        <span v-for="(item, index) in items" :key="`${setIndex}-${index}`" class="flex items-center">
          <span class="text-service-title px-6 text-ink/70 lg:px-10">{{ item }}</span>
          <span class="bg-accent inline-block size-2 shrink-0 rounded-full lg:size-2.5" />
        </span>
      </span>
    </div>
  </div>
</template>
