<script setup lang="ts">
import { ArrowRight, Menu, X } from 'lucide-vue-next'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' }
]

const navigation = useNavigationStore()
const { scrollTo } = useLenis()
const reduced = useReducedMotion()
const route = useRoute()

const isHome = computed(() => route.path === '/')

const backdropEl = ref<HTMLElement | null>(null)
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
  if (!backdropEl.value || !panelEl.value) return null

  const tl = gsap.timeline({ paused: true })

  if (reduced.value) {
    tl.set(backdropEl.value, { autoAlpha: 1 }).set(panelEl.value, { xPercent: 0 }).set(itemEls.value, { autoAlpha: 1, x: 0 })
    return tl
  }

  tl.set(backdropEl.value, { autoAlpha: 0 })
    .set(panelEl.value, { xPercent: 100 })
    .set(itemEls.value, { autoAlpha: 0, x: 24 })
    .to(backdropEl.value, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
    .to(panelEl.value, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, '<')
    .to(itemEls.value, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }, '-=0.25')

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
  <header class="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
    <nav aria-label="Primary" class="mx-auto max-w-6xl">
      <div
        class="flex h-16 items-center justify-between rounded-full border border-black/5 bg-white/95 px-4 shadow-[0_8px_30px_-12px_rgba(1,26,64,0.25)] backdrop-blur-md transition-shadow duration-500 sm:px-6"
        :class="navigation.isScrolled ? 'shadow-[0_10px_35px_-10px_rgba(1,26,64,0.35)]' : ''"
      >
        <NuxtLink to="/" class="text-lg font-extrabold tracking-tight text-ink" @click="navigation.closeMobileMenu()">
          NEX<span class="text-primary-600">O</span>RA
        </NuxtLink>

        <ul class="hidden items-center gap-7 xl:flex">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="isHome ? link.href : `/${link.href}`"
              class="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
              :class="{ 'text-primary-700 font-semibold': navigation.activeSection === link.href.slice(1) }"
              @click="handleAnchorClick($event, link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>

        <div class="hidden xl:block">
          <MagneticButton as="a" href="#portfolio" size="sm" @click="handleAnchorClick($event, '#portfolio')">
            View Portfolio
            <ArrowRight class="size-4" aria-hidden="true" />
          </MagneticButton>
        </div>

        <button
          ref="menuButtonEl"
          type="button"
          class="inline-flex size-10 items-center justify-center rounded-full text-ink xl:hidden"
          aria-controls="mobile-menu"
          :aria-expanded="navigation.isMobileMenuOpen"
          aria-label="Toggle navigation menu"
          @click="navigation.toggleMobileMenu()"
        >
          <Menu class="size-5" aria-hidden="true" />
        </button>
      </div>
    </nav>
  </header>

  <Teleport to="body">
    <div
      id="mobile-menu"
      class="fixed inset-0 z-[60] xl:hidden"
      :class="navigation.isMobileMenuOpen ? '' : 'pointer-events-none'"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div
        ref="backdropEl"
        class="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
        :style="{ visibility: navigation.isMobileMenuOpen ? 'visible' : 'hidden' }"
        @click="navigation.closeMobileMenu()"
      />

      <div
        ref="panelEl"
        class="bg-navy-900 absolute inset-y-0 right-0 flex w-full max-w-sm flex-col px-8 py-8"
        :style="{ visibility: navigation.isMobileMenuOpen ? 'visible' : 'hidden' }"
      >
        <div class="flex items-center justify-between">
          <span class="text-lg font-extrabold tracking-tight text-white">NEX<span class="text-primary-300">O</span>RA</span>
          <button
            type="button"
            class="inline-flex size-10 items-center justify-center rounded-full text-white/80 hover:text-white"
            aria-label="Close navigation menu"
            @click="navigation.closeMobileMenu()"
          >
            <X class="size-5" aria-hidden="true" />
          </button>
        </div>

        <ul class="mt-10 flex flex-1 flex-col gap-1 overflow-y-auto">
          <li v-for="(link, index) in navLinks" :key="link.href">
            <a
              :ref="(el) => setItemRef(el, index)"
              :href="isHome ? link.href : `/${link.href}`"
              class="block rounded-xl px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              :class="{ 'text-white bg-white/5': navigation.activeSection === link.href.slice(1) }"
              @click="handleAnchorClick($event, link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>

        <div :ref="(el) => setItemRef(el, navLinks.length)">
          <MagneticButton as="a" href="#portfolio" class="w-full justify-center" @click="handleAnchorClick($event, '#portfolio')">
            View Portfolio
            <ArrowRight class="size-4" aria-hidden="true" />
          </MagneticButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
