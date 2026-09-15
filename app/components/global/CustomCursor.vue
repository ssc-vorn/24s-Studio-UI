<script setup lang="ts">
/**
 * Desktop-only cursor: a small dot that trails the pointer with light
 * smoothing, expanding into a labelled pill ("VIEW →", "EXPLORE →",
 * "START →") over elements tagged `data-cursor`. Gated on a fine pointer
 * (real mouse, not touch) and reduced motion, in addition to the >=1024px
 * breakpoint, so a touch laptop or tablet in landscape doesn't get a
 * cursor it can't move.
 *
 * `cursorEnabled` (not `isDesktop`/`reduced` directly) drives the template
 * v-if: those two are media-query-derived and can read differently on the
 * client's first render than they did during SSR, which produces a
 * hydration mismatch if a v-if depends on them directly (see the shared
 * Work → Case Study transition's Teleport bug fixed earlier this session —
 * same root cause, same fix: never gate structural presence on a value
 * that can diverge between server and client before mount). `cursorEnabled`
 * is a plain ref starting `false` on both sides and is only ever flipped
 * true from inside onMounted, after hydration has already settled.
 */
const LABELS: Record<string, string> = {
  view: 'View →',
  explore: 'Explore →',
  start: 'Start →',
  open: 'Open →',
  play: 'Play →'
}

const { isDesktop } = useBreakpoints()
const reduced = useReducedMotion()

const cursorEnabled = ref(false)
const dotEl = ref<HTMLElement | null>(null)
const labelText = ref('')
const isActive = ref(false)

let moveX: ((v: number) => void) | undefined
let moveY: ((v: number) => void) | undefined
let cleanupFns: Array<() => void> = []

function isFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches
}

async function setup() {
  if (cursorEnabled.value || reduced.value || !isDesktop.value || !isFinePointer()) return
  cursorEnabled.value = true
  await nextTick()
  if (!dotEl.value) return

  const { gsap } = useGsap()
  document.documentElement.classList.add('custom-cursor-active')

  moveX = gsap.quickTo(dotEl.value, 'x', { duration: 0.35, ease: 'power3.out' })
  moveY = gsap.quickTo(dotEl.value, 'y', { duration: 0.35, ease: 'power3.out' })

  function onMouseMove(event: MouseEvent) {
    moveX?.(event.clientX)
    moveY?.(event.clientY)
  }

  function onOver(event: MouseEvent) {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]')
    if (!target) return
    const kind = target.dataset.cursor ?? ''
    labelText.value = LABELS[kind] ?? ''
    isActive.value = true
  }

  function onOut(event: MouseEvent) {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]')
    if (!target) return
    const related = event.relatedTarget as HTMLElement | null
    if (related?.closest('[data-cursor]') === target) return
    isActive.value = false
    labelText.value = ''
  }

  function onLeaveWindow() {
    isActive.value = false
    labelText.value = ''
  }

  document.addEventListener('mousemove', onMouseMove, { passive: true })
  document.addEventListener('mouseover', onOver)
  document.addEventListener('mouseout', onOut)
  document.addEventListener('mouseleave', onLeaveWindow)

  cleanupFns.push(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseover', onOver)
    document.removeEventListener('mouseout', onOut)
    document.removeEventListener('mouseleave', onLeaveWindow)
    document.documentElement.classList.remove('custom-cursor-active')
  })
}

function teardown() {
  if (!cursorEnabled.value) return
  cursorEnabled.value = false
  isActive.value = false
  labelText.value = ''
  cleanupFns.forEach((fn) => fn())
  cleanupFns = []
}

watch([isDesktop, reduced], () => {
  if (isDesktop.value && !reduced.value) setup()
  else teardown()
})

onMounted(setup)
onUnmounted(teardown)
</script>

<template>
  <div
    v-if="cursorEnabled"
    ref="dotEl"
    class="pointer-events-none fixed top-0 left-0 z-[80] -translate-x-1/2 -translate-y-1/2"
    aria-hidden="true"
  >
    <div
      class="flex items-center justify-center rounded-full transition-[width,height,background-color] duration-200 ease-out"
      :class="isActive ? 'bg-accent h-16 w-16' : 'h-2.5 w-2.5 bg-white mix-blend-difference'"
    >
      <span v-if="isActive" class="text-ui px-2 text-center text-white whitespace-nowrap">{{ labelText }}</span>
    </div>
  </div>
</template>
