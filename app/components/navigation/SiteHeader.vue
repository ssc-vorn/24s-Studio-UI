<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

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
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 flex justify-center px-3 transition-[padding] duration-500 sm:px-4" :class="navigation.isScrolled ? 'pt-3' : 'pt-5 sm:pt-6'">
    <div
      class="border-border-subtle/60 flex w-full max-w-[1160px] items-center justify-between gap-3 rounded-full border backdrop-blur-xl transition-[background-color,padding,box-shadow] duration-500"
      :class="navigation.isScrolled ? 'bg-surface/85 px-3 py-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]' : 'bg-surface/45 px-4 py-2.5 sm:px-5 sm:py-3'"
    >
      <NuxtLink to="/" class="flex shrink-0 items-center pl-1" @click="navigation.closeMenu()">
        <BrandLogo :inverse="theme.isDark" />
      </NuxtLink>

      <div class="flex items-center gap-1">
        <button
          type="button"
          class="hover:text-accent inline-flex size-9 shrink-0 items-center justify-center text-ink/70 transition-colors"
          :aria-label="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="theme.toggle()"
        >
          <Sun v-if="theme.isDark" class="size-4" aria-hidden="true" />
          <Moon v-else class="size-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          class="text-ui group hover:text-accent flex items-center gap-3 rounded-full py-1 pr-1 pl-3 text-ink uppercase transition-colors"
          aria-controls="fullscreen-menu"
          :aria-expanded="navigation.isMenuOpen"
          aria-label="Toggle navigation menu"
          data-cursor="open"
          @click="navigation.toggleMenu()"
        >
          <span class="hidden tracking-[0.16em] sm:inline">{{ navigation.isMenuOpen ? 'Close' : 'Menu' }}</span>
          <span
            class="flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
            :class="navigation.isMenuOpen ? 'bg-ink text-surface' : 'bg-ink/5 group-hover:bg-accent/10'"
          >
            <span class="relative flex size-4 items-center justify-center" aria-hidden="true">
              <span
                class="absolute h-px w-4 bg-current transition-transform duration-300 ease-out"
                :class="navigation.isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-[3px]'"
              />
              <span
                class="absolute h-px w-4 bg-current transition-transform duration-300 ease-out"
                :class="navigation.isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[3px]'"
              />
            </span>
          </span>
        </button>
      </div>
    </div>
  </header>

  <FullscreenMenu />
</template>
