<script setup lang="ts">
import { animateHeroEntrance, animateHeroExit } from '~/animations/sections/hero'
import { trustedBrandRepository } from '~/repositories/trustedBrandRepository'

// A curated subset, not the full roster — the trust layer is a credibility
// signal riding along the bottom of the Hero, not a showcase. All real
// brands (see data/trustedBrands.ts), just fewer of them.
const featuredBrands = trustedBrandRepository.list().slice(0, 6)

const visualWrapEl = ref<HTMLElement | null>(null)
const visualEl = ref<HTMLElement | null>(null)
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
        visual: visualEl.value,
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

    // Continuous expand/drift for as long as Hero is scrolling past —
    // independent of the entrance tween above (different element: the
    // outer wrap, not the inner visual the entrance targets), so the two
    // never fight for control of the same transform. This is the "visual
    // expands/shifts" half of the scroll-exit moment the brief asks for.
    if (visualWrapEl.value) {
      gsap.fromTo(
        visualWrapEl.value,
        { scale: 1, yPercent: 0 },
        {
          scale: 1.15,
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: visualWrapEl.value.closest('section'),
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
          }
        }
      )
    }

    // Exit scrub — headline/copy/CTA lift and fade as the Hero scrolls
    // past; the trust layer only dims, it doesn't disappear.
    const heroSection = visualWrapEl.value?.closest('section')
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
  <div class="relative flex min-h-[100svh] flex-col overflow-hidden bg-black">
    <!-- Abstract visual centerpiece — CSS-only layered glow + an almost
         invisible Khmer-inspired stepped/diamond line rhythm, standing in
         for the reference's curved luminous form without copying it or
         reaching for WebGL/Three.js. Entrance (opacity/scale-in) lives on
         the inner `visualEl`; the continuous scroll-driven expand/drift
         above lives on this outer wrap — see the comment there for why
         they're split across two elements. -->
    <div ref="visualWrapEl" class="absolute inset-0" aria-hidden="true">
      <div ref="visualEl" class="hero-visual absolute inset-0">
        <div class="hero-visual__glow hero-visual__glow--a" />
        <div class="hero-visual__glow hero-visual__glow--b" />
        <div class="hero-visual__glow hero-visual__glow--c" />
        <svg class="hero-visual__lines" viewBox="0 0 720 720" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="heroLineRhythm" width="90" height="90" patternUnits="userSpaceOnUse">
              <path d="M45 6 L84 45 L45 84 L6 45 Z" fill="none" stroke="white" stroke-width="0.6" />
              <path d="M45 26 L64 45 L45 64 L26 45 Z" fill="none" stroke="white" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="720" height="720" fill="url(#heroLineRhythm)" />
        </svg>
        <div class="hero-visual__vignette" />
      </div>
    </div>

    <Container class="relative z-10 flex flex-1 flex-col items-center justify-center pt-32 pb-12 text-center lg:pb-20">
      <span ref="eyebrowEl" class="text-label mb-6 text-white/70">Cambodia × Global — Creative Studio</span>

      <h1 ref="headingEl" class="text-display-xl mx-auto max-w-4xl text-white">
        Ideas<br>
        <span class="text-white/55">That</span><br>
        Move.
      </h1>

      <p ref="paragraphEl" class="text-body-lg mx-auto mt-8 max-w-md text-white/70">
        We build brands, digital experiences and visual worlds for ambitious ideas.
      </p>

      <div ref="ctaEl" class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <MagneticButton as="NuxtLink" href="/contact" data-cursor="start" class="rounded-full bg-white! text-black! hover:bg-accent! hover:text-white!">
          Start a Project
        </MagneticButton>
        <MagneticButton as="NuxtLink" href="/work" variant="outline" data-cursor="explore" class="rounded-full border-white/40! text-white! hover:border-accent! hover:text-accent!">
          Explore Our Work →
        </MagneticButton>
      </div>
    </Container>

    <!-- Trust layer — the Hero's credibility floor, not a separate section:
         roughly the bottom 15-20% on desktop, a quiet closing block on
         mobile. Enters only after the headline (see animateHeroEntrance's
         1.15s/1.25s positions) and only dims (never disappears) on scroll
         exit (see animateHeroExit). -->
    <div ref="trustLayerEl" class="relative z-10 shrink-0">
      <Container class="border-t border-white/10 py-8 lg:py-10">
        <div class="flex flex-col items-center gap-5">
          <span ref="clientsLabelEl" class="text-label block text-white/50">Selected Clients</span>
          <div ref="clientsListEl" class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-12">
            <TrustedByItem v-for="brand in featuredBrands" :key="brand.id" :brand="brand" inverse />
          </div>
          <div ref="scrollIndicatorEl" class="mt-2 hidden lg:block">
            <ScrollIndicator inverse />
          </div>
        </div>
      </Container>
    </div>
  </div>
</template>

<style scoped>
.hero-visual__glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  mix-blend-mode: screen;
  will-change: transform, opacity;
}

.hero-visual__glow--a {
  top: 8%;
  left: 50%;
  width: 58vw;
  height: 58vw;
  max-width: 860px;
  max-height: 860px;
  transform: translateX(-50%);
  background: radial-gradient(circle at 42% 42%, var(--color-electric-soft) 0%, var(--color-electric) 38%, transparent 72%);
  opacity: 0.5;
  animation: hero-drift-a 20s ease-in-out infinite;
}

.hero-visual__glow--b {
  bottom: -12%;
  left: 16%;
  width: 42vw;
  height: 42vw;
  max-width: 680px;
  max-height: 680px;
  background: radial-gradient(circle, var(--color-navy-tint) 0%, transparent 70%);
  opacity: 0.35;
  animation: hero-drift-b 24s ease-in-out infinite;
}

.hero-visual__glow--c {
  top: 26%;
  right: 4%;
  width: 32vw;
  height: 32vw;
  max-width: 520px;
  max-height: 520px;
  background: radial-gradient(circle, var(--color-electric-200) 0%, transparent 75%);
  opacity: 0.28;
  animation: hero-drift-c 28s ease-in-out infinite;
}

.hero-visual__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
}

.hero-visual__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 40%, transparent 0%, rgba(5, 6, 8, 0.45) 55%, rgba(5, 6, 8, 0.94) 100%);
}

@keyframes hero-drift-a {
  0%,
  100% {
    transform: translateX(-50%) translateY(0) scale(1);
  }
  50% {
    transform: translateX(-50%) translateY(-3%) scale(1.06);
  }
}

@keyframes hero-drift-b {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(2%, -2%) scale(1.08);
  }
}

@keyframes hero-drift-c {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(-2%, 2%) rotate(6deg);
  }
}

/* The one-time GSAP entrance above is already reduced-motion-gated in
   hero.ts; this ambient loop is separate (it never stops), so it gets its
   own gate here — same pattern ScrollIndicator.vue uses for its infinite
   scroll-hint animation. */
@media (prefers-reduced-motion: reduce) {
  .hero-visual__glow {
    animation: none;
  }
}
</style>
