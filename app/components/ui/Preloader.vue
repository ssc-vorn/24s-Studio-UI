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
const textEl = ref<HTMLElement | null>(null)

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
    if (!el.value || !textEl.value) throw new Error('preloader refs not bound')

    document.documentElement.style.overflow = 'hidden'
    const { gsap } = useGsap()

    gsap.timeline({
      onComplete: () => {
        clearTimeout(failsafe)
        finish()
      }
    })
      .fromTo(textEl.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .to(textEl.value, { opacity: 0, duration: 0.35, ease: 'power2.in' }, '+=0.35')
      .to(el.value, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '-=0.05')
  } catch (error) {
    if (import.meta.dev) console.error('[motion] preloader animation failed', error)
    clearTimeout(failsafe)
    finish()
  }
})
</script>

<template>
  <div v-if="!uiStore.isPreloaderDone" ref="el" class="fixed inset-0 z-[100] flex items-center justify-center bg-black" aria-hidden="true">
    <span ref="textEl" class="scale-150">
      <BrandLogo inverse />
    </span>
  </div>
</template>
