<script setup lang="ts">
import { animateHeroEntrance, animateHeroExit } from '~/animations/sections/hero'
import { trustedBrandRepository } from '~/repositories/trustedBrandRepository'

// A curated subset, not the full roster — the trust layer is a credibility
// signal riding along the bottom of the Hero, not a showcase. All real
// brands (see data/trustedBrands.ts), just fewer of them.
const featuredBrands = trustedBrandRepository.list().slice(0, 6)

const heroRootEl = ref<HTMLElement | null>(null)
const backgroundEl = ref<HTMLElement | null>(null)
const backgroundScrollWrap = ref<HTMLElement | null>(null)
const imageFrame = ref<HTMLElement | null>(null)
const numeralEl = ref<HTMLElement | null>(null)
const markEl = ref<HTMLElement | null>(null)
const edgeLabelEl = ref<HTMLElement | null>(null)
const eyebrowEl = ref<HTMLElement | null>(null)
const headingEl = ref<HTMLElement | null>(null)
const paragraphEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)
const trustLayerEl = ref<HTMLElement | null>(null)
const clientsLabelEl = ref<HTMLElement | null>(null)
const clientsListEl = ref<HTMLElement | null>(null)
const scrollIndicatorEl = ref<HTMLElement | null>(null)

const { isDesktop } = useBreakpoints()
const reduced = useReducedMotion()

let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined
let headlineSplit: InstanceType<typeof import('gsap/SplitText').SplitText> | undefined
let cleanupParallax: (() => void) | undefined

function isFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches
}

/**
 * Mouse-reactive depth — three layers drift at different rates against the
 * pointer (background image barely, the ghost "24" numeral more, the
 * geometric corner mark the most, in the opposite direction), so the Hero
 * reads as physically layered rather than flat. Desktop, fine-pointer and
 * full-motion only; quickTo setters are cheap enough to run on every
 * pointermove without a rAF-throttling layer of our own.
 */
function setupParallax(gsapInstance: typeof import('gsap').gsap) {
  if (!heroRootEl.value || !backgroundScrollWrap.value || reduced.value || !isDesktop.value || !isFinePointer()) return

  const moveBg = gsapInstance.quickTo(backgroundScrollWrap.value, 'x', { duration: 0.9, ease: 'power3.out' })
  const moveBgY = gsapInstance.quickTo(backgroundScrollWrap.value, 'y', { duration: 0.9, ease: 'power3.out' })
  const moveNumeral = numeralEl.value ? gsapInstance.quickTo(numeralEl.value, 'x', { duration: 1.1, ease: 'power3.out' }) : null
  const moveNumeralY = numeralEl.value ? gsapInstance.quickTo(numeralEl.value, 'y', { duration: 1.1, ease: 'power3.out' }) : null
  const moveMark = markEl.value ? gsapInstance.quickTo(markEl.value, 'x', { duration: 0.7, ease: 'power3.out' }) : null
  const moveMarkY = markEl.value ? gsapInstance.quickTo(markEl.value, 'y', { duration: 0.7, ease: 'power3.out' }) : null

  function onPointerMove(event: PointerEvent) {
    const rect = heroRootEl.value!.getBoundingClientRect()
    const relX = (event.clientX - rect.left) / rect.width - 0.5
    const relY = (event.clientY - rect.top) / rect.height - 0.5

    moveBg(relX * -10)
    moveBgY(relY * -10)
    moveNumeral?.(relX * 22)
    moveNumeralY?.(relY * 14)
    moveMark?.(relX * -30)
    moveMarkY?.(relY * -20)
  }

  heroRootEl.value.addEventListener('pointermove', onPointerMove, { passive: true })
  cleanupParallax = () => heroRootEl.value?.removeEventListener('pointermove', onPointerMove)
}

onMounted(() => {
  const { gsap, SplitText } = useGsap()
  ctx = gsap.context(() => {
    // Line-mode split of the fixed 3-line headline — same GSAP SplitText
    // plugin useSplitText/SplitText.vue use elsewhere, just invoked
    // directly here rather than through that composable: this entrance is
    // one absolute-time-positioned sequence shared with the eyebrow/CTA/
    // trust-layer tweens below, not a standalone scroll-triggered reveal,
    // which is the shape useSplitText is built for. `mask: 'lines'` gives
    // the same "physically released from a clipped band" reveal the old
    // hand-coded per-line spans had, so the entrance tween below only
    // needs opacity/y, not a second clip-path on top of the mask.
    const headingLines: Element[] = []
    if (headingEl.value && !reduced.value) {
      headlineSplit = new SplitText(headingEl.value, { type: 'lines', mask: 'lines' })
      headingLines.push(...headlineSplit.lines)
    } else if (headingEl.value) {
      headingLines.push(headingEl.value)
    }

    const clientsList = clientsListEl.value ? Array.from(clientsListEl.value.children) : []

    animateHeroEntrance(
      gsap,
      {
        background: backgroundEl.value,
        eyebrow: eyebrowEl.value,
        headingLines,
        paragraph: paragraphEl.value,
        ctas: ctaEl.value,
        clientsLabel: clientsLabelEl.value,
        clientsList,
        scrollIndicator: scrollIndicatorEl.value
      },
      reduced.value
    )

    // Decorative geometric layer — ghost numeral, corner mark and the
    // vertical edge label — fades in just after the headline settles
    // rather than racing it, so it reads as set dressing, not competing
    // content. Reduced motion: all three snap straight to resting state.
    const decor = [numeralEl.value, markEl.value, edgeLabelEl.value].filter(Boolean)
    if (reduced.value) {
      gsap.set(decor, { opacity: 1, scale: 1, rotate: 0 })
    } else if (decor.length) {
      gsap.fromTo(
        decor,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', stagger: 0.08 },
        0.6
      )
    }

    if (reduced.value) return

    setupParallax(gsap)

    // Continuous background zoom for as long as Hero is scrolling past —
    // independent of the entrance tween above (different element: this
    // wrapper, not the img `background` targets), so the two never fight
    // for control of the same transform.
    if (backgroundScrollWrap.value) {
      gsap.fromTo(
        backgroundScrollWrap.value,
        { scale: 1 },
        {
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: backgroundScrollWrap.value.closest('section'),
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
          }
        }
      )
    }

    // The ghost numeral drifts opposite the background's scroll-zoom and
    // fades out ahead of the headline, giving the geometric layer its own
    // sense of depth as the Hero scrolls past rather than moving in lockstep.
    if (numeralEl.value) {
      gsap.to(numeralEl.value, {
        yPercent: 20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: numeralEl.value.closest('section'), start: 'top top', end: 'bottom top', scrub: 0.5 }
      })
    }

    // Exit scrub — headline/copy/CTA lift and fade as the Hero scrolls
    // past; the trust layer only dims, it doesn't disappear.
    const heroSection = imageFrame.value?.closest('section')
    if (heroSection) {
      animateHeroExit(gsap, {
        trigger: heroSection,
        heading: headingEl.value,
        paragraph: paragraphEl.value,
        ctas: ctaEl.value,
        trustLayer: trustLayerEl.value
      })
    }
  })
})

onUnmounted(() => {
  cleanupParallax?.()
  headlineSplit?.revert()
  ctx?.revert()
})
</script>

<template>
  <div ref="heroRootEl" class="relative flex min-h-[100svh] flex-col">
    <!-- Hero media — a normal, sized block between the CTA and the trust
         layer on mobile (per the mobile content order below); a full-bleed
         absolute background on desktop. Same image, same entrance/parallax
         targets either way — only its positioning changes per breakpoint. -->
    <div ref="imageFrame" class="relative z-0 order-2 mx-6 mt-10 aspect-4/5 overflow-hidden sm:mx-10 lg:absolute lg:inset-0 lg:order-none lg:m-0 lg:aspect-auto" aria-hidden="true">
      <div ref="backgroundScrollWrap" class="absolute inset-0">
        <img
          ref="backgroundEl"
          src="https://picsum.photos/2400/1600?random=201"
          alt=""
          fetchpriority="high"
          class="size-full scale-105 object-cover opacity-70 grayscale-[15%]"
        >
      </div>
      <!-- Navy depth wash — an asymmetric glow in the brand's primary hue,
           layered above the neutral black gradient so the frame reads as
           lit rather than merely darkened. -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_82%_12%,rgba(10,47,122,0.4),transparent_70%)]" />
      <div class="from-black/95 via-black/60 absolute inset-0 bg-gradient-to-t to-black/30" />
      <div class="absolute inset-0 bg-black/25" />
      <!-- Film grain — static SVG turbulence, overlay-blended at very low
           opacity so it reads as texture rather than noise. -->
      <div class="hero-grain absolute inset-0" />
    </div>

    <!-- Ghost numeral — the brand's core geometric motif (see BrandLogo)
         blown up into a near-invisible watermark, anchored to the frame
         rather than the copy so it survives independently of headline
         length. Drifts opposite the pointer and fades on scroll-exit. -->
    <span
      ref="numeralEl"
      class="pointer-events-none absolute top-24 right-[4vw] z-[5] hidden font-serif text-[30vw] leading-none font-medium text-white/[0.06] select-none sm:block lg:-top-[6vw] lg:text-[26vw]"
      aria-hidden="true"
    >24</span>

    <!-- Geometric corner mark — the wordmark's cut-corner square, echoed
         here at hero scale as a lone floating accent rather than a repeated
         motif, so the brand's geometry shows up in the layout itself. -->
    <span
      ref="markEl"
      class="border-navy-tint/50 bg-accent/90 pointer-events-none absolute top-[18%] left-[6%] z-[5] hidden size-3 rotate-45 lg:block"
      aria-hidden="true"
    />

    <!-- Corner frame — four crop-mark brackets inset from the viewport
         edge, a restrained nod to the "grids, cropping" direction rather
         than a literal viewfinder overlay. Static: framing, not motion. -->
    <div class="pointer-events-none absolute inset-4 z-[5] hidden lg:block sm:inset-6" aria-hidden="true">
      <span class="absolute top-0 left-0 size-5 border-t border-l border-white/25" />
      <span class="absolute top-0 right-0 size-5 border-t border-r border-white/25" />
      <span class="absolute bottom-0 left-0 size-5 border-b border-l border-white/25" />
      <span class="absolute right-0 bottom-0 size-5 border-r border-b border-white/25" />
    </div>

    <!-- Vertical edge label — an editorial index rather than decoration:
         names the five disciplines the paragraph below only summarises,
         run along the frame the way a magazine cover runs a spine credit. -->
    <div
      ref="edgeLabelEl"
      class="text-label pointer-events-none absolute top-1/2 left-8 z-[5] hidden -translate-y-1/2 [writing-mode:vertical-rl] text-white/40 lg:block"
      aria-hidden="true"
    >
      Graphic Design — Brand Identity — Video Editing — Digital Marketing — Advertising
    </div>

    <Container class="relative z-10 order-1 flex flex-1 flex-col justify-center pt-32 pb-12 lg:pb-20">
      <div class="flex items-center gap-3">
        <span class="bg-accent h-px w-8" aria-hidden="true" />
        <span ref="eyebrowEl" class="text-label text-white/70">Digital Creative Studio</span>
      </div>

      <h1 ref="headingEl" class="text-display-xl mt-6 max-w-5xl text-white">
        We Make<br>
        <span class="text-white/55">Brands</span><br>
        Move.
      </h1>

      <p ref="paragraphEl" class="text-body-lg mt-8 max-w-md text-white/70">
        Graphic design, brand identity, video editing, digital marketing and advertising — built as one continuous system, not five disconnected vendors.
      </p>

      <div ref="ctaEl" class="mt-10 flex flex-wrap items-center gap-4">
        <MagneticButton as="NuxtLink" href="/contact" data-cursor="start" class="bg-white! text-black! hover:bg-accent! hover:text-white!">
          Start a Project
        </MagneticButton>
        <MagneticButton as="NuxtLink" href="/work" variant="outline" data-cursor="explore" class="border-white/40! text-white! hover:border-accent! hover:text-accent!">
          Explore Our Work →
        </MagneticButton>
      </div>
    </Container>

    <!-- Trust layer — the Hero's credibility floor, not a separate section:
         roughly the bottom 15-20% on desktop, a quiet closing block on
         mobile. Enters only after the headline (see animateHeroEntrance's
         1.15s/1.25s positions) and only dims (never disappears) on scroll
         exit (see animateHeroExit). -->
    <div ref="trustLayerEl" class="relative z-10 order-3 shrink-0">
      <Container class="border-t border-white/10 py-8 lg:py-10">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span ref="clientsLabelEl" class="text-label mb-4 block text-white/50 lg:mb-5">Selected Clients</span>
            <div ref="clientsListEl" class="flex flex-wrap items-center gap-x-8 gap-y-3 lg:gap-x-12">
              <TrustedByItem v-for="brand in featuredBrands" :key="brand.id" :brand="brand" inverse />
            </div>
          </div>

          <div ref="scrollIndicatorEl" class="hidden shrink-0 lg:block">
            <ScrollIndicator inverse />
          </div>
        </div>
      </Container>
    </div>
  </div>
</template>

<style scoped>
.hero-grain {
  opacity: 0.06;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
</style>
