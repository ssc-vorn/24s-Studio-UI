/**
 * Marks a section as unconditionally light (its background never follows
 * the dark/light theme toggle — e.g. a hardcoded cream field), so the
 * floating header can swap its logo/text to the dark treatment while it's
 * over that section, then swap back once scrolled past it. Uses a thin
 * IntersectionObserver band near the header's own position rather than a
 * scroll listener, so it costs nothing between crossings.
 *
 * Deliberately a single shared boolean, not a per-section stack: today
 * exactly one homepage section (Studio Introduction) is unconditionally
 * light, everything else is unconditionally dark or follows the theme
 * normally (which the header's own `theme.isDark` read already handles).
 * A second simultaneously-light section would need this generalised into
 * a stack — not needed yet, so not built yet.
 */
export function useHeaderLightSection(el: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!el.value || typeof IntersectionObserver === 'undefined') return
    const navigation = useNavigationStore()

    observer = new IntersectionObserver(
      ([entry]) => navigation.setHeaderOnLight(!!entry?.isIntersecting),
      { rootMargin: '-72px 0px -85% 0px', threshold: 0 }
    )
    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    useNavigationStore().setHeaderOnLight(false)
  })
}
