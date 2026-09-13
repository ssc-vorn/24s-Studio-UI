interface UseThreeLoopOptions {
  onFrame: (elapsed: number, delta: number) => void
  onResize: (size: { width: number; height: number }) => void
}

/**
 * Generic render-loop harness shared by WebGL scenes: drives requestAnimationFrame,
 * watches container resize via ResizeObserver, and pauses the loop when the tab
 * is hidden. Three.js-specific setup/disposal lives in `app/webgl/`; this composable
 * only owns scheduling so it stays reusable and trivially testable.
 *
 * Exposes plain `mount()`/`unmount()` instead of registering `onMounted`/`onUnmounted`
 * itself, because callers (e.g. HeroCanvas) create this loop from inside an async
 * `onMounted` callback — past an `await`, Vue no longer has an active component
 * instance, so lifecycle hooks registered at that point would silently never fire.
 */
export function useThreeLoop(container: Ref<HTMLElement | null>, options: UseThreeLoopOptions) {
  let rafId = 0
  let running = false
  let lastTime = 0
  let resizeObserver: ResizeObserver | null = null

  function tick(time: number) {
    if (!running) return
    const elapsed = time / 1000
    const delta = lastTime ? (time - lastTime) / 1000 : 0
    lastTime = time
    options.onFrame(elapsed, delta)
    rafId = requestAnimationFrame(tick)
  }

  function start() {
    if (running) return
    running = true
    lastTime = 0
    rafId = requestAnimationFrame(tick)
  }

  function stop() {
    running = false
    if (rafId) cancelAnimationFrame(rafId)
  }

  function handleVisibility() {
    if (document.hidden) stop()
    else start()
  }

  function emitResize() {
    const el = container.value
    if (!el) return
    options.onResize({ width: el.clientWidth, height: el.clientHeight })
  }

  function mount() {
    emitResize()
    if (container.value) {
      resizeObserver = new ResizeObserver(() => emitResize())
      resizeObserver.observe(container.value)
    }
    document.addEventListener('visibilitychange', handleVisibility)
  }

  function unmount() {
    stop()
    resizeObserver?.disconnect()
    resizeObserver = null
    document.removeEventListener('visibilitychange', handleVisibility)
  }

  return { start, stop, mount, unmount }
}
