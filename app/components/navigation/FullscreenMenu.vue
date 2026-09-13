<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface NavLink {
  index: string
  label: string
  to: string
}

const navLinks: NavLink[] = [
  { index: '01', label: 'Work', to: '/work' },
  { index: '02', label: 'About', to: '/about' },
  { index: '03', label: 'Services', to: '/services' },
  { index: '04', label: 'Journal', to: '/blog' },
  { index: '05', label: 'Contact', to: '/contact' }
]

const navigation = useNavigationStore()
const reduced = useReducedMotion()
const route = useRoute()

const overlayEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)
const itemEls = ref<HTMLElement[]>([])
const firstLinkEl = ref<HTMLElement | null>(null)
const closeButtonEl = ref<HTMLElement | null>(null)

let menuTimeline: ReturnType<typeof import('gsap').gsap.timeline> | null = null

function setItemRef(el: Element | { $el: HTMLElement } | null, index: number) {
  const node = el instanceof HTMLElement ? el : (el as { $el: HTMLElement } | null)?.$el
  if (node instanceof HTMLElement) {
    itemEls.value[index] = node
    if (index === 0) firstLinkEl.value = node
  }
}

function buildMenuTimeline() {
  const { gsap } = useGsap()
  if (!overlayEl.value || !panelEl.value) return null

  const tl = gsap.timeline({ paused: true })

  if (reduced.value) {
    tl.set(overlayEl.value, { autoAlpha: 1 }).set(itemEls.value, { autoAlpha: 1, y: 0 })
    return tl
  }

  tl.set(overlayEl.value, { clipPath: 'inset(0 0 100% 0)' })
    .set(itemEls.value, { autoAlpha: 0, y: 32 })
    .to(overlayEl.value, { clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: 'power4.inOut' })
    .to(itemEls.value, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out' }, '-=0.25')

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
    navigation.closeMenu()
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
  () => navigation.isMenuOpen,
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
    }
  }
)

watch(
  () => route.path,
  () => navigation.closeMenu()
)

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  menuTimeline?.kill()
})
</script>

<template>
  <Teleport to="body">
    <div
      id="fullscreen-menu"
      ref="overlayEl"
      class="bg-black fixed inset-0 z-[60]"
      :class="navigation.isMenuOpen ? '' : 'pointer-events-none'"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      :style="{ visibility: navigation.isMenuOpen ? 'visible' : 'hidden' }"
    >
      <div ref="panelEl" class="flex h-full flex-col px-6 py-6 sm:px-10 sm:py-8">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" @click="navigation.closeMenu()">
            <BrandLogo inverse />
          </NuxtLink>
          <button
            ref="closeButtonEl"
            type="button"
            class="text-ui inline-flex items-center gap-3 text-white/70 uppercase transition-colors hover:text-white"
            aria-label="Close navigation menu"
            @click="navigation.closeMenu()"
          >
            <span class="tracking-[0.16em]">Close</span>
            <X class="size-4" aria-hidden="true" />
          </button>
        </div>

        <nav class="flex flex-1 flex-col justify-center" aria-label="Primary">
          <ul class="flex flex-col">
            <li v-for="(link, index) in navLinks" :key="link.to" class="border-t border-white/10 last:border-b">
              <NuxtLink
                :ref="(el) => setItemRef(el as Element | null, index)"
                :to="link.to"
                class="group hover:text-accent flex items-baseline gap-6 py-4 text-white transition-colors sm:py-6"
              >
                <span class="text-body-sm font-sans text-white/40">{{ link.index }}</span>
                <span class="font-serif text-[10vw] leading-none font-normal sm:text-6xl lg:text-7xl">{{ link.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="flex flex-col gap-4 pt-8 text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <a href="mailto:hello@24seven.studio" class="text-body-sm transition-colors hover:text-white">hello@24seven.studio</a>
          <p class="text-body-sm">Cambodia × Worldwide</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
