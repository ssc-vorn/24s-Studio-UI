<script setup lang="ts">
// Dev-only diagnostic overlay for the motion system (Preloader, GSAP, ScrollTrigger,
// Lenis, reduced-motion). Never ships to production: this component is only
// registered from app.vue behind `import.meta.dev`, which Vite strips from
// production builds entirely, so there's no separate check needed here.
//
// Opt-in only — append ?motion_debug=1 once, it's remembered in localStorage
// until cleared, so it doesn't clutter every dev-server view by default.
const { prefersReducedMotion, isClient } = useMotionPreferences()

const enabled = ref(false)
const scrollTriggerCount = ref(0)
const lenisActive = ref(false)
let poll: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('motion_debug') === '1') localStorage.setItem('motion_debug', '1')
  if (params.get('motion_debug') === '0') localStorage.removeItem('motion_debug')
  enabled.value = localStorage.getItem('motion_debug') === '1'
  if (!enabled.value) return

  const { ScrollTrigger } = useGsap()
  const nuxtApp = useNuxtApp()

  poll = setInterval(() => {
    scrollTriggerCount.value = ScrollTrigger.getAll().length
    lenisActive.value = Boolean(nuxtApp.$lenis)
  }, 500)
})

onUnmounted(() => {
  if (poll) clearInterval(poll)
})
</script>

<template>
  <div
    v-if="enabled"
    class="fixed bottom-4 left-4 z-[200] rounded-lg bg-black/85 px-4 py-3 font-mono text-[11px] leading-relaxed text-white/90 shadow-lg"
    aria-hidden="true"
  >
    <div class="mb-1 text-white/50 uppercase">Motion Debug</div>
    <div>client: {{ isClient }}</div>
    <div>reduced-motion: {{ prefersReducedMotion }}</div>
    <div>ScrollTriggers: {{ scrollTriggerCount }}</div>
    <div>lenis active: {{ lenisActive }}</div>
  </div>
</template>
