<script setup lang="ts">
const navigation = useNavigationStore()
const theme = useThemeStore()

function handleScroll() {
  navigation.setScrolled(window.scrollY > 40)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

/**
 * The logo/text treatment follows two independent signals, not just the
 * site's dark/light theme toggle: `theme.isDark` for the ordinary case, and
 * `navigation.headerOnLight` (set by useHeaderLightSection) overriding it
 * whenever the header is floating over a section whose background is
 * unconditionally light regardless of theme (Studio Introduction's cream
 * field). See that composable for why this is a single boolean rather than
 * a general per-section system.
 */
const onDarkSurface = computed(() => theme.isDark && !navigation.headerOnLight)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[padding,background-color,backdrop-filter] duration-500"
    :class="[
      navigation.isScrolled ? 'py-3' : 'py-6 lg:py-8',
      navigation.isScrolled ? (onDarkSurface ? 'bg-black/60 backdrop-blur-lg' : 'bg-white/60 backdrop-blur-lg') : ''
    ]"
  >
    <Container class="flex items-center justify-between gap-6">
      <NuxtLink to="/" class="flex shrink-0 items-center transition-transform duration-500" :class="navigation.isScrolled ? 'scale-90' : 'scale-100'" @click="navigation.closeMenu()">
        <BrandLogo :inverse="onDarkSurface" />
      </NuxtLink>

      <div class="hidden flex-col items-end text-right sm:flex" :class="onDarkSurface ? 'text-white/70' : 'text-ink/70'">
        <span class="text-label">24s Studio</span>
        <span class="text-label">Digital Creative Studio</span>
      </div>

      <button
        type="button"
        class="group flex shrink-0 items-center gap-3 uppercase transition-colors"
        :class="onDarkSurface ? 'text-white hover:text-accent' : 'text-ink hover:text-accent'"
        aria-controls="fullscreen-menu"
        :aria-expanded="navigation.isMenuOpen"
        aria-label="Toggle navigation menu"
        data-cursor="open"
        @click="navigation.toggleMenu()"
      >
        <span class="text-label">{{ navigation.isMenuOpen ? 'Close' : 'Menu' }}</span>
        <span class="relative flex size-4 items-center justify-center transition-transform duration-400 ease-out" :class="navigation.isMenuOpen ? 'rotate-45' : ''" aria-hidden="true">
          <span class="absolute h-px w-4 bg-current" />
          <span class="absolute h-4 w-px bg-current" />
        </span>
      </button>
    </Container>
  </header>

  <FullscreenMenu />
</template>
