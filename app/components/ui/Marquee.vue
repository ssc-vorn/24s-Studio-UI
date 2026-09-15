<script setup lang="ts">
interface Props {
  /** Seconds for one full loop at rest (pre-velocity-boost) scroll speed. */
  duration?: number
  /** Reverses loop direction (right-to-left becomes left-to-right). */
  reverse?: boolean
  /** Outer border-y + vertical padding — the kinetic word marquee's framing. Off for marquees living inside another section's own bordered container (e.g. Trusted By). */
  bordered?: boolean
  /** Fades both edges to transparent via mask-image, so items appear to emerge/dissolve rather than hard-cut at the viewport edge. */
  edgeFade?: boolean
  /** Pauses the loop on hover/focus — appropriate for a logo wall people might want to read; the kinetic type marquee is decorative and keeps moving. */
  pauseOnHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 20,
  reverse: false,
  bordered: true,
  edgeFade: false,
  pauseOnHover: false
})

const trackEl = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()

let tween: ReturnType<typeof import('gsap').gsap.to> | null = null
let unsubscribeScroll: (() => void) | null = null
let cleanupHover: (() => void) | undefined

/**
 * UI / Marquee — the shared velocity-reactive engine behind every infinite
 * loop in the app (kinetic word marquee, Trusted By logo strip): a
 * continuous GSAP loop (xPercent 0 → ±50 across two duplicated copies of
 * whatever the default slot renders, so the loop point is invisible)
 * whose `timeScale` is nudged up in proportion to Lenis scroll velocity —
 * a fast scroll briefly accelerates it, then it eases back to resting
 * speed. Clamped so a violent flick never reads as motion sickness.
 * Content-agnostic by design (slot, not a typed `items` prop) so the same
 * engine drives text, logos, or anything else without a fork.
 * Reduced motion: track renders static, no tween, no velocity listener.
 */
onMounted(() => {
  if (!trackEl.value || reduced.value) return
  const { gsap } = useGsap()

  tween = gsap.to(trackEl.value, {
    xPercent: props.reverse ? 50 : -50,
    duration: props.duration,
    ease: 'none',
    repeat: -1
  })

  const { lenis } = useLenis()
  if (lenis) {
    unsubscribeScroll = lenis.on('scroll', (instance) => {
      const boost = 1 + Math.min(Math.abs(instance.velocity) * 0.6, 3)
      gsap.to(tween!, { timeScale: boost, duration: 0.4, ease: 'power2.out', overwrite: true })
    })
  }

  if (props.pauseOnHover) {
    const pause = () => tween?.pause()
    const resume = () => tween?.resume()
    trackEl.value.addEventListener('mouseenter', pause)
    trackEl.value.addEventListener('mouseleave', resume)
    trackEl.value.addEventListener('focusin', pause)
    trackEl.value.addEventListener('focusout', resume)
    cleanupHover = () => {
      trackEl.value?.removeEventListener('mouseenter', pause)
      trackEl.value?.removeEventListener('mouseleave', resume)
      trackEl.value?.removeEventListener('focusin', pause)
      trackEl.value?.removeEventListener('focusout', resume)
    }
  }
})

onUnmounted(() => {
  unsubscribeScroll?.()
  cleanupHover?.()
  tween?.kill()
})
</script>

<template>
  <div
    class="overflow-hidden"
    :class="[bordered ? 'border-border-subtle border-y py-6 lg:py-8' : '', edgeFade ? 'marquee-edge-fade' : '']"
  >
    <div ref="trackEl" class="flex w-max items-center whitespace-nowrap will-change-transform">
      <div v-for="setIndex in 2" :key="setIndex" class="flex shrink-0 items-center" :inert="setIndex === 2 ? true : undefined">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-edge-fade {
  mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
}
</style>
