<script setup lang="ts">
import { animateHeroEntrance, animateHeroExit } from '~/animations/sections/hero'
import { trustedBrandRepository } from '~/repositories/trustedBrandRepository'

// A curated subset, not the full roster — the trust layer is a credibility
// signal riding along the bottom of the Hero, not a showcase. All real
// brands (see data/trustedBrands.ts), just fewer of them.
const featuredBrands = trustedBrandRepository.list().slice(0, 6)

const backgroundEl = ref<HTMLElement | null>(null)
const backgroundScrollWrap = ref<HTMLElement | null>(null)
const imageFrame = ref<HTMLElement | null>(null)
const eyebrowEl = ref<HTMLElement | null>(null)
const headingEl = ref<HTMLElement | null>(null)
const paragraphEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)
const trustLayerEl = ref<HTMLElement | null>(null)
const clientsLabelEl = ref<HTMLElement | null>(null)
const clientsListEl = ref<HTMLElement | null>(null)
const scrollIndicatorEl = ref<HTMLElement | null>(null)

const reduced = useReducedMotion()

let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined
let headlineSplit: InstanceType<typeof import('gsap/SplitText').SplitText> | undefined

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

    if (reduced.value) return

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
  headlineSplit?.revert()
  ctx?.revert()
})
</script>

<template>
  <div class="relative flex min-h-[100svh] flex-col">
    <!-- Hero media — a normal, sized block between the CTA and the trust
         layer on mobile (per the mobile content order below); a full-bleed
         absolute background on desktop. Same image, same entrance/parallax
         targets either way — only its positioning changes per breakpoint. -->
    <div ref="imageFrame" class="relative order-2 mx-6 mt-10 aspect-4/5 overflow-hidden sm:mx-10 lg:absolute lg:inset-0 lg:order-none lg:m-0 lg:aspect-auto" aria-hidden="true">
      <div ref="backgroundScrollWrap" class="absolute inset-0">
        <img
          ref="backgroundEl"
          src="https://picsum.photos/2400/1600?random=201"
          alt=""
          fetchpriority="high"
          class="size-full object-cover opacity-70 grayscale-[15%]"
        >
      </div>
      <div class="from-black/95 via-black/60 absolute inset-0 bg-gradient-to-t to-black/30" />
      <div class="absolute inset-0 bg-black/25" />
    </div>

    <Container class="relative z-10 order-1 flex flex-1 flex-col justify-center pt-32 pb-12 lg:pb-20">
      <span ref="eyebrowEl" class="text-label mb-6 text-white/70">Digital Creative Studio</span>

      <h1 ref="headingEl" class="text-display-xl max-w-5xl text-white">
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
