<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { animateHeroEntrance } from '~/animations/sections/hero'

const eyebrowEl = ref<HTMLElement | null>(null)
const lineEls = ref<HTMLElement[]>([])
const paragraphEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)

const reduced = useReducedMotion()
const { scrollTo } = useLenis()

function setLineRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) lineEls.value[index] = el
}

function handleClick(event: MouseEvent) {
  event.preventDefault()
  scrollTo('#portfolio')
}

let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

onMounted(() => {
  const { gsap } = useGsap()
  ctx = gsap.context(() => {
    animateHeroEntrance(
      gsap,
      {
        eyebrow: eyebrowEl.value,
        headingLines: lineEls.value,
        paragraph: paragraphEl.value,
        cta: ctaEl.value
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
  <div class="relative z-10 flex h-full flex-col justify-end pt-32 pb-20 lg:justify-center lg:pt-24 lg:pb-0">
    <span ref="eyebrowEl" class="text-label mb-6 text-white/70">Creative Studio</span>

    <h1 class="text-display text-white">
      <span :ref="(el) => setLineRef(el as Element | null, 0)" class="block overflow-hidden">Ideas That Inspire.</span>
      <span :ref="(el) => setLineRef(el as Element | null, 1)" class="block overflow-hidden text-white/60">Designs That Deliver.</span>
    </h1>

    <p ref="paragraphEl" class="text-body-lg mt-8 max-w-lg text-white/70">
      We create brands, digital experiences, motion and visual systems that move people.
    </p>

    <div ref="ctaEl" class="mt-10">
      <MagneticButton as="a" href="#portfolio" class="bg-white! text-primary-900! hover:bg-white/90!" @click="handleClick">
        View Portfolio
        <ArrowRight class="size-4" aria-hidden="true" />
      </MagneticButton>
    </div>
  </div>
</template>
