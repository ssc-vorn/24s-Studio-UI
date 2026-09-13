<script setup lang="ts">
const uiStore = useUiStore()
const reduced = useReducedMotion()

const el = ref<HTMLElement | null>(null)
const textEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (reduced.value) {
    uiStore.completePreloader()
    return
  }

  document.documentElement.style.overflow = 'hidden'
  const { gsap } = useGsap()

  gsap.timeline({
    onComplete: () => {
      document.documentElement.style.overflow = ''
      uiStore.completePreloader()
    }
  })
    .fromTo(textEl.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .to(textEl.value, { opacity: 0, duration: 0.35, ease: 'power2.in' }, '+=0.35')
    .to(el.value, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '-=0.05')
})
</script>

<template>
  <div v-if="!uiStore.isPreloaderDone" ref="el" class="fixed inset-0 z-[100] flex items-center justify-center bg-black" aria-hidden="true">
    <span ref="textEl" class="scale-150">
      <BrandLogo inverse />
    </span>
  </div>
</template>
