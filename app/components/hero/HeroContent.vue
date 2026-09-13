<script setup lang="ts">
import { animateHeroEntrance } from '~/animations/sections/hero'

const backgroundEl = ref<HTMLElement | null>(null)
const eyebrowEl = ref<HTMLElement | null>(null)
const lineEls = ref<HTMLElement[]>([])
const paragraphEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)
const scrollIndicatorEl = ref<HTMLElement | null>(null)

const reduced = useReducedMotion()

function setLineRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) lineEls.value[index] = el
}

let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

onMounted(() => {
  const { gsap } = useGsap()
  ctx = gsap.context(() => {
    animateHeroEntrance(
      gsap,
      {
        background: backgroundEl.value,
        eyebrow: eyebrowEl.value,
        headingLines: lineEls.value,
        paragraph: paragraphEl.value,
        ctas: ctaEl.value,
        scrollIndicator: scrollIndicatorEl.value
      },
      reduced.value
    )
  })
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
    <img
      ref="backgroundEl"
      src="https://picsum.photos/2400/1600?random=201"
      alt=""
      fetchpriority="high"
      class="size-full object-cover opacity-70 grayscale-[15%]"
    >
    <div class="from-black/95 via-black/60 absolute inset-0 bg-gradient-to-t to-black/30" />
    <div class="absolute inset-0 bg-black/25" />
  </div>

  <Container class="relative z-10 flex min-h-screen flex-col justify-end pt-32 pb-24 lg:justify-center lg:pb-0">
    <span ref="eyebrowEl" class="text-label mb-6 text-white/70">Creative Studio</span>

    <h1 class="text-display-xl max-w-5xl text-white">
      <span :ref="(el) => setLineRef(el as Element | null,0)" class="block overflow-hidden">Ideas That Inspire,</span>
      <span :ref="(el) => setLineRef(el as Element | null,1)" class="block overflow-hidden text-white/55">Designs That Deliver.</span>
    </h1>

    <p ref="paragraphEl" class="text-body-lg mt-8 max-w-md text-white/70">
      A creative studio building brands, digital experiences and visual stories that move people.
    </p>

    <div ref="ctaEl" class="mt-10 flex flex-wrap items-center gap-4">
      <MagneticButton as="NuxtLink" href="/contact" class="bg-white! text-black! hover:bg-accent! hover:text-white!">
        Start a Project
      </MagneticButton>
      <MagneticButton as="NuxtLink" href="/work" variant="outline" class="border-white/40! text-white! hover:border-accent! hover:text-accent!">
        Explore Work
      </MagneticButton>
    </div>
  </Container>

  <div ref="scrollIndicatorEl" class="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
    <ScrollIndicator inverse />
  </div>
</template>
