<script setup lang="ts">
import { Menu, Moon, Sun, X } from 'lucide-vue-next'

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
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="navigation.isScrolled ? 'border-border-subtle bg-surface/85 border-b py-3 backdrop-blur-md' : 'py-6'"
  >
    <Container>
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="transition-transform duration-500"
          :class="navigation.isScrolled ? 'scale-90' : 'scale-100'"
          @click="navigation.closeMenu()"
        >
          <BrandLogo />
        </NuxtLink>

        <div class="flex items-center gap-5">
          <button
            type="button"
            class="hover:text-accent inline-flex size-9 items-center justify-center text-ink/70 transition-colors"
            :aria-label="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="theme.toggle()"
          >
            <Sun v-if="theme.isDark" class="size-4" aria-hidden="true" />
            <Moon v-else class="size-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            class="text-ui group hover:text-accent flex items-center gap-3 text-ink uppercase transition-colors"
            aria-controls="fullscreen-menu"
            :aria-expanded="navigation.isMenuOpen"
            aria-label="Toggle navigation menu"
            @click="navigation.toggleMenu()"
          >
            <span class="tracking-[0.16em]">Menu</span>
            <Menu v-if="!navigation.isMenuOpen" class="size-4" aria-hidden="true" />
            <X v-else class="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Container>
  </header>

  <FullscreenMenu />
</template>
