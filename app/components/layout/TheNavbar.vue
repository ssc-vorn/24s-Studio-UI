<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' }
]

const navigation = useNavigationStore()
const { scrollTo } = useLenis()
const reduced = useReducedMotion()
const route = useRoute()

const isHome = computed(() => route.path === '/')

const overlayEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)
const itemEls = ref<HTMLElement[]>([])
const firstLinkEl = ref<HTMLElement | null>(null)
const menuButtonEl = ref<HTMLElement | null>(null)

let menuTimeline: ReturnType<typeof import('gsap').gsap.timeline> | null = null
let observer: IntersectionObserver | null = null

function setItemRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLElement) {
    itemEls.value[index] = el
    if (index === 0) firstLinkEl.value = el
  }
}

function handleScroll() {
  navigation.setScrolled(window.scrollY > 24)
}

function handleAnchorClick(event: MouseEvent, href: string) {
  if (!isHome.value) return
  event.preventDefault()
  navigation.closeMobileMenu()
  scrollTo(href)
}

function buildMenuTimeline() {
  const { gsap } = useGsap()
  if (!overlayEl.value || !panelEl.value) return null

  const tl = gsap.timeline({ paused: true })

  if (reduced.value) {
    tl.set(overlayEl.value, { autoAlpha: 1 }).set(itemEls.value, { autoAlpha: 1, y: 0 })
    return tl
  }

  tl.set(overlayEl.value, { autoAlpha: 0 })
    .set(itemEls.value, { autoAlpha: 0, y: 24 })
    .to(overlayEl.value, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
    .to(itemEls.value, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, '-=0.15')

  return tl
}

function lockScroll(lock: boolean) {
  const { lenis } = useLenis()
  if (lock) {
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
  } else {
    lenis?.start()
    document.documentElement.style.overflow = ''
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    navigation.closeMobileMenu()
    return
  }

  if (event.key === 'Tab' && panelEl.value) {
    const focusable = panelEl.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    if (!focusable.length) return
    const first = focusable[0]!
    const last = focusable[focusable.length - 1]!

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

watch(
  () => navigation.isMobileMenuOpen,
  async (isOpen) => {
    lockScroll(isOpen)
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown)
      if (!menuTimeline) menuTimeline = buildMenuTimeline()
      menuTimeline?.play(0)
      await nextTick()
      firstLinkEl.value?.focus()
    } else {
      document.removeEventListener('keydown', handleKeydown)
      menuTimeline?.reverse()
      menuButtonEl.value?.focus()
    }
  }
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  if (isHome.value) {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) navigation.setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((section) => observer?.observe(section))
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKeydown)
  observer?.disconnect()
  menuTimeline?.kill()
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
    :class="navigation.isScrolled ? 'bg-off-white/90 backdrop-blur-md shadow-[0_1px_0_0_var(--color-fog)]' : 'bg-transparent'"
  >
    <Container as="nav" aria-label="Primary">
      <div class="flex h-[var(--nav-height)] items-center justify-between">
        <NuxtLink to="/" class="text-h4 tracking-tight text-ink" @click="navigation.closeMobileMenu()">
          24S<span class="text-primary-900">.</span>
        </NuxtLink>

        <ul class="hidden items-center gap-10 lg:flex">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="isHome ? link.href : `/${link.href}`"
              class="text-label relative py-2 text-ink/70 underline-offset-8 transition-colors hover:text-ink"
              :class="{ 'text-ink underline': navigation.activeSection === link.href.slice(1) }"
              @click="handleAnchorClick($event, link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>

        <div class="hidden lg:block">
          <MagneticButton as="a" href="#contact" @click="handleAnchorClick($event, '#contact')">
            Get Started
          </MagneticButton>
        </div>

        <button
          ref="menuButtonEl"
          type="button"
          class="inline-flex size-11 items-center justify-center text-ink lg:hidden"
          aria-controls="mobile-menu"
          :aria-expanded="navigation.isMobileMenuOpen"
          aria-label="Toggle navigation menu"
          @click="navigation.toggleMobileMenu()"
        >
          <Menu v-if="!navigation.isMobileMenuOpen" class="size-6" aria-hidden="true" />
          <X v-else class="size-6" aria-hidden="true" />
        </button>
      </div>
    </Container>
  </header>

  <Teleport to="body">
    <div
      id="mobile-menu"
      ref="overlayEl"
      class="fixed inset-0 z-40 bg-primary-900 lg:hidden"
      :class="navigation.isMobileMenuOpen ? '' : 'pointer-events-none'"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      :style="{ visibility: navigation.isMobileMenuOpen ? 'visible' : 'hidden' }"
    >
      <div ref="panelEl" class="flex h-full flex-col justify-center px-8">
        <ul class="flex flex-col gap-2">
          <li v-for="(link, index) in navLinks" :key="link.href">
            <a
              :ref="(el) => setItemRef(el, index)"
              :href="isHome ? link.href : `/${link.href}`"
              class="text-h3 block py-3 text-white/90 transition-colors hover:text-white"
              @click="handleAnchorClick($event, link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
        <div :ref="(el) => setItemRef(el, navLinks.length)" class="mt-8">
          <MagneticButton as="a" href="#contact" variant="outline" class="border-white! text-white! hover:bg-white! hover:text-primary-900!" @click="handleAnchorClick($event, '#contact')">
            Get Started
          </MagneticButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
