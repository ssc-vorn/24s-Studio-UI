<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { projectRepository } from '~/repositories/projectRepository'
import { serviceRepository } from '~/repositories/serviceRepository'
import { articleRepository } from '~/repositories/articleRepository'

interface NavLink {
  index: string
  label: string
  to: string
  image: string
}

const navLinks: NavLink[] = [
  { index: '01', label: 'Work', to: '/work', image: projectRepository.list()[0]!.coverImage },
  { index: '02', label: 'Services', to: '/services', image: serviceRepository.list()[0]!.image },
  { index: '03', label: 'Studio', to: '/about', image: 'https://picsum.photos/1200/1500?random=220' },
  { index: '04', label: 'Insights', to: '/insights', image: articleRepository.list()[0]!.image },
  { index: '05', label: 'Contact', to: '/contact', image: 'https://picsum.photos/1200/1500?random=290' }
]

const navigation = useNavigationStore()
const reduced = useReducedMotion()
const route = useRoute()

const overlayEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)
const logoEl = ref<HTMLElement | null>(null)
const itemEls = ref<HTMLElement[]>([])
const previewEls = ref<HTMLElement[]>([])
const firstLinkEl = ref<HTMLElement | null>(null)
const closeButtonEl = ref<HTMLElement | null>(null)

const activeIndex = ref(0)

let menuTimeline: ReturnType<typeof import('gsap').gsap.timeline> | null = null

function setItemRef(el: Element | { $el: HTMLElement } | null, index: number) {
  const node = el instanceof HTMLElement ? el : (el as { $el: HTMLElement } | null)?.$el
  if (node instanceof HTMLElement) {
    itemEls.value[index] = node
    if (index === 0) firstLinkEl.value = node
  }
}

function setPreviewRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) previewEls.value[index] = el
}

function isCurrent(link: NavLink) {
  return link.to === '/' ? route.path === '/' : route.path.startsWith(link.to)
}

function buildMenuTimeline() {
  const { gsap } = useGsap()
  if (!overlayEl.value || !panelEl.value) return null

  const tl = gsap.timeline({ paused: true })

  if (reduced.value) {
    tl.set(overlayEl.value, { autoAlpha: 1 }).set(itemEls.value, { autoAlpha: 1, y: 0 }).set(logoEl.value, { autoAlpha: 1, scale: 1 })
    return tl
  }

  tl.set(overlayEl.value, { clipPath: 'inset(0 0 100% 0)' })
    .set(itemEls.value, { autoAlpha: 0, y: 32 })
    .set(logoEl.value, { autoAlpha: 0, scale: 0.9 })
    .to(overlayEl.value, { clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: 'power4.inOut' })
    .to(logoEl.value, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '-=0.35')
    .to(itemEls.value, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out' }, '-=0.3')

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

/**
 * Preview panel — a plain opacity crossfade between stacked, absolutely
 * positioned images (desktop only), driven by whichever nav item currently
 * has hover or focus. No GSAP here: this is a two-state visual swap, not a
 * scroll- or timeline-driven sequence, so a CSS transition is the simplest
 * correct tool — consistent with how ServiceRow's own media panel is the
 * only other hover-preview in the app, though that one crossfades via GSAP
 * because it also has to coordinate with a scroll-triggered entrance this
 * panel doesn't have.
 */
function setActive(index: number) {
  activeIndex.value = index
}

function buildInitial() {
  if (!menuTimeline) menuTimeline = buildMenuTimeline()
}

watch(
  () => navigation.isMenuOpen,
  async (isOpen) => {
    lockScroll(isOpen)
    if (isOpen) {
      activeIndex.value = navLinks.findIndex((link) => isCurrent(link))
      if (activeIndex.value === -1) activeIndex.value = 0
      document.addEventListener('keydown', handleKeydown)
      buildInitial()
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
            <span ref="logoEl" class="inline-block">
              <BrandLogo inverse />
            </span>
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

        <div class="grid flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <nav class="lg:col-span-7" aria-label="Primary">
            <ul class="flex flex-col">
              <li v-for="(link, index) in navLinks" :key="link.to" class="border-t border-white/10 last:border-b">
                <NuxtLink
                  :ref="(el) => setItemRef(el as Element | { $el: HTMLElement } | null, index)"
                  :to="link.to"
                  class="group hover:text-accent flex items-baseline gap-6 py-4 text-white transition-colors sm:py-6"
                  @mouseenter="setActive(index)"
                  @focus="setActive(index)"
                >
                  <span class="text-body-sm font-sans" :class="isCurrent(link) ? 'text-accent' : 'text-white/40'">{{ link.index }}</span>
                  <span class="font-serif text-[10vw] leading-none font-normal sm:text-6xl lg:text-7xl">{{ link.label }}</span>
                  <span v-if="isCurrent(link)" class="bg-accent ml-auto hidden size-2 shrink-0 rounded-full lg:block" aria-hidden="true" />
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Preview panel — desktop only. Mobile has no hover state to
               drive it, so it's simply absent there rather than shown inert;
               the mobile nav is the plain single-column list on its own,
               not this layout with a piece removed. -->
          <div class="relative hidden aspect-4/5 overflow-hidden bg-white/5 lg:col-span-5 lg:block">
            <img
              v-for="(link, index) in navLinks"
              :key="link.to"
              :ref="(el) => setPreviewRef(el as Element | null, index)"
              :src="link.image"
              :alt="`${link.label} preview`"
              loading="lazy"
              class="absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out"
              :class="activeIndex === index ? 'opacity-100' : 'opacity-0'"
            >
            <div class="from-black/60 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" aria-hidden="true" />
          </div>
        </div>

        <div class="flex flex-col gap-4 pt-8 text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <a href="mailto:hello@24s.studio" class="text-body-sm transition-colors hover:text-white">hello@24s.studio</a>
          <p class="text-body-sm">Available Worldwide</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
