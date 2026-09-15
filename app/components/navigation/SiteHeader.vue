<script setup lang="ts">
import { Menu, Moon, Sun, X } from 'lucide-vue-next'

interface NavLink {
  label: string
  to: string
}

// Same destinations FullscreenMenu links to (plus Home, which the mobile
// menu omits because its logo already goes there) — this bar shows them
// inline instead of behind the hamburger, so the list is kept here rather
// than shared, since the two components render it completely differently
// (text pills vs. large indexed rows).
const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Studio', to: '/about' },
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Insights', to: '/blog' },
  { label: 'Contact', to: '/contact' }
]

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
  <header class="fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-all duration-500" :class="navigation.isScrolled ? 'pt-3' : 'pt-6'">
    <div
      class="border-border-subtle/40 flex w-full max-w-[1100px] items-center justify-between gap-2 rounded-full border shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur-xl transition-all duration-500"
      :class="navigation.isScrolled ? 'bg-black/75 px-3 py-2' : 'bg-black/35 px-4 py-3'"
    >
      <NuxtLink to="/" class="flex shrink-0 items-center pl-2 transition-transform duration-500" :class="navigation.isScrolled ? 'scale-90' : 'scale-100'" @click="navigation.closeMenu()">
        <BrandLogo inverse />
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-ui hover:text-accent rounded-full px-4 py-2 text-white/70 tracking-[0.08em] uppercase transition-colors"
          active-class="text-white"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-1">
        <button
          type="button"
          class="hover:text-accent inline-flex size-9 shrink-0 items-center justify-center text-white/70 transition-colors"
          :aria-label="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="theme.toggle()"
        >
          <Sun v-if="theme.isDark" class="size-4" aria-hidden="true" />
          <Moon v-else class="size-4" aria-hidden="true" />
        </button>

        <MagneticButton
          as="NuxtLink"
          href="/contact"
          data-cursor="start"
          class="hidden rounded-full bg-white! px-5! py-2.5! text-xs! text-black! hover:bg-accent! hover:text-white! lg:inline-flex"
        >
          Start a Project
        </MagneticButton>

        <button
          type="button"
          class="text-ui hover:text-accent inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/70 uppercase transition-colors lg:hidden"
          aria-controls="fullscreen-menu"
          :aria-expanded="navigation.isMenuOpen"
          aria-label="Toggle navigation menu"
          @click="navigation.toggleMenu()"
        >
          <Menu v-if="!navigation.isMenuOpen" class="size-4" aria-hidden="true" />
          <X v-else class="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
  <FullscreenMenu />
</template>
