<script setup lang="ts">
// This overlay covers the entire viewport (fixed inset-0, z-[100]) until
// completePreloader() runs. It must be structurally impossible for that call
// to be skipped — any uncaught error in the timeline below, a ref that never
// bound, a killed tween, anything — or a browser-specific failure here blacks
// out the whole site with no visible error. The try/catch covers a throw
// during setup; the timeout covers a tween that starts but never reaches
// onComplete.
const PRELOADER_FAILSAFE_MS = 4000

const uiStore = useUiStore()
const reduced = useReducedMotion()

const el = ref<HTMLElement | null>(null)
const logoEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (reduced.value) {
    uiStore.completePreloader()
    return
  }

  let settled = false
  const finish = () => {
    if (settled) return
    settled = true
    document.documentElement.style.overflow = ''
    uiStore.completePreloader()
  }

  const failsafe = setTimeout(finish, PRELOADER_FAILSAFE_MS)

  try {
    if (!el.value || !logoEl.value) throw new Error('preloader refs not bound')

    document.documentElement.style.overflow = 'hidden'
    const { gsap } = useGsap()

    // Target ~950ms end to end (brief spec: perceived duration 500-1200ms):
    // a clip-path wipe reveals the logo (0 → 0.45s) while it scales/fades
    // in, a short hold (0.45 → 0.57s), then the whole panel releases
    // upward as the logo continues scaling — one continuous motion, not a
    // fade-then-slide handoff.
    gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        clearTimeout(failsafe)
        finish()
      }
    })
      .fromTo(
        logoEl.value,
        { clipPath: 'inset(0 100% 0 0)', scale: 0.9, opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', scale: 1, opacity: 1, duration: 0.45 }
      )
      .to(el.value, { yPercent: -100, duration: 0.4, ease: 'power4.inOut' }, '+=0.12')
      .to(logoEl.value, { scale: 1.08, duration: 0.4, ease: 'power4.inOut' }, '<')
  } catch (error) {
    if (import.meta.dev) console.error('[motion] preloader animation failed', error)
    clearTimeout(failsafe)
    finish()
  }
})
</script>

<template>
  <div v-if="!uiStore.isPreloaderDone" ref="el" class="fixed inset-0 z-[100] flex items-center justify-center bg-black" aria-hidden="true">
    <span ref="logoEl" class="inline-block scale-150">
      <BrandLogo inverse />
    </span>
  </div>
</template>
