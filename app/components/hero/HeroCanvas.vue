<script setup lang="ts">
import { normalizePointer } from '~/utils/animation'

const canvasEl = ref<HTMLCanvasElement | null>(null)
const containerEl = ref<HTMLElement | null>(null)
const supported = ref(true)

const reduced = useReducedMotion()
const { isMobile, isTablet } = useBreakpoints()
const uiStore = useUiStore()

let scene: Awaited<ReturnType<typeof import('~/webgl/scenes/heroScene').createHeroScene>> | null = null
let loop: ReturnType<typeof useThreeLoop> | null = null
let isUnmounted = false

function checkWebglSupport(canvas: HTMLCanvasElement) {
  try {
    const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl')
    return Boolean(ctx)
  } catch {
    return false
  }
}

function handlePointerMove(event: PointerEvent) {
  if (!scene || !containerEl.value || reduced.value) return
  const rect = containerEl.value.getBoundingClientRect()
  const { x, y } = normalizePointer(event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height)
  scene.setPointer(x, y)
}

function handleScroll() {
  if (!scene || !containerEl.value) return
  const rect = containerEl.value.getBoundingClientRect()
  const progress = 1 - clamp(rect.bottom / (rect.height + window.innerHeight), 0, 1)
  scene.setScrollProgress(progress)
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

onMounted(async () => {
  await nextTick()
  const canvas = canvasEl.value
  if (!canvas) return

  if (!checkWebglSupport(canvas)) {
    supported.value = false
    uiStore.setWebglSupported(false)
    return
  }

  const { createHeroScene } = await import('~/webgl/scenes/heroScene')
  if (isUnmounted) return

  scene = createHeroScene(canvas, {
    simplified: isMobile.value || isTablet.value,
    maxDpr: isMobile.value ? 1.5 : 2
  })

  loop = useThreeLoop(containerEl, {
    onResize: ({ width, height }) => scene?.resize(width, height),
    onFrame: (elapsed, delta) => scene?.render(elapsed, delta)
  })

  loop.mount()
  loop.start()

  if (!reduced.value) {
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
  } else {
    loop.stop()
  }
})

onUnmounted(() => {
  isUnmounted = true
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('scroll', handleScroll)
  loop?.unmount()
  scene?.dispose()
  scene = null
})
</script>

<template>
  <div ref="containerEl" class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <canvas v-if="supported" ref="canvasEl" class="size-full" />
    <div
      v-else
      class="size-full bg-[radial-gradient(circle_at_50%_30%,var(--color-primary-700),var(--color-navy-950)_70%)]"
    />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_35%,var(--color-navy-900)_92%)]" />
  </div>
</template>
