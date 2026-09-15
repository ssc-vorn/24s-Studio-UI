<script setup lang="ts">
/**
 * Shared-element Work → Case Study transition. Mounted once, globally, in
 * app.vue — outside <NuxtPage>'s router-view tree — specifically so it
 * survives the route change it's animating across (anything mounted
 * inside the page transition itself would be torn down at exactly the
 * wrong moment). See useSharedProjectTransition for why this needs
 * module-level state instead of component state.
 *
 * This never touches the existing GSAP page-transition hooks
 * (onLeave/onEnter) — it's a fixed-position layer floating above the
 * normal transition, animating independently. If it never gets a
 * destination request, it simply times out and disappears; the ordinary
 * page transition is all that visibly ran.
 */
const { pending, destinationRequest, reset } = useSharedProjectTransition()
const reduced = useReducedMotion()

const layerEl = ref<HTMLElement | null>(null)
const visible = ref(false)
const currentSrc = ref('')
const currentObjectPosition = ref('center')
const currentBorderRadius = ref('0px')

let tween: ReturnType<typeof import('gsap').gsap.to> | undefined

function killTween() {
  tween?.kill()
  tween = undefined
}

function applyRect(rect: { top: number; left: number; width: number; height: number }) {
  if (!layerEl.value) return
  layerEl.value.style.top = `${rect.top}px`
  layerEl.value.style.left = `${rect.left}px`
  layerEl.value.style.width = `${rect.width}px`
  layerEl.value.style.height = `${rect.height}px`
}

watch(pending, (source) => {
  if (!source) {
    if (visible.value) {
      killTween()
      visible.value = false
    }
    return
  }

  killTween()
  currentSrc.value = source.src
  currentObjectPosition.value = source.objectPosition
  currentBorderRadius.value = source.borderRadius
  visible.value = true
  nextTick(() => applyRect(source.rect))
})

watch(destinationRequest, (request) => {
  if (!request) return

  // No animation to run (layer never got shown, or the visitor prefers
  // reduced motion) — the real hero underneath is already there and
  // correct; just clear state rather than leaving anything stuck.
  if (!layerEl.value || !visible.value || reduced.value) {
    reset()
    return
  }

  const destRect = request.el.getBoundingClientRect()
  const { gsap } = useGsap()
  killTween()
  tween = gsap.to(layerEl.value, {
    top: destRect.top,
    left: destRect.left,
    width: destRect.width,
    height: destRect.height,
    duration: 0.9,
    ease: 'power3.inOut',
    onComplete: () => {
      visible.value = false
      reset()
    }
  })
})

onUnmounted(() => {
  killTween()
})
</script>

<template>
  <div
    ref="layerEl"
    class="pointer-events-none fixed z-[70] overflow-hidden"
    :class="visible ? '' : 'invisible'"
    aria-hidden="true"
  >
    <img v-if="visible" :src="currentSrc" alt="" class="size-full object-cover" :style="{ objectPosition: currentObjectPosition, borderRadius: currentBorderRadius }">
  </div>
</template>
