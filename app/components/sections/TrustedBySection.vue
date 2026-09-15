<script setup lang="ts">
import { trustedBrandRepository } from '~/repositories/trustedBrandRepository'
import { studioStats } from '~/data/studio'

interface Props {
  /** `full` — standalone showcase with heading + copy + bordered brand wall (Home). `compact` — a slim inline trust line for embedding inside another page's section (About, Contact). */
  variant?: 'full' | 'compact'
}

const props = withDefaults(defineProps<Props>(), { variant: 'full' })

const brands = trustedBrandRepository.list()

/**
 * HOME / Trusted By Brands — scroll — border lines draw in from center (full
 * variant only), an accent rule sweeps in before the label, then the brand
 * strip (marquee track, full variant, or the item row, compact variant)
 * fades up as one block.
 * Library: GSAP + ScrollTrigger. Duration: ~1.2s total. Easing: power3 in/out.
 * Mobile: identical timeline, shorter travel since the layout wraps narrower.
 * Reduced motion: every target snaps straight to its resting state, no draw.
 *
 * The marquee's own auto-scroll (full variant) is deliberately pure CSS
 * (see `<style>` below), not GSAP — it needs to run even if JavaScript
 * never initializes, which is the strongest form of the "animation is
 * enhancement, not dependency" rule this codebase follows elsewhere with
 * GSAP fallback states. `prefers-reduced-motion` and hover/focus-pause are
 * both handled in plain CSS too, so this motion never depends on JS at all.
 */
const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const borders = root.querySelectorAll('[data-reveal="border"]')
  const line = root.querySelector('[data-reveal="line"]')
  const label = root.querySelector('[data-reveal="label"]')
  const heading = root.querySelector('[data-reveal="heading"]')
  const items = root.querySelector('[data-reveal="items"]')
  const stats = root.querySelector('[data-reveal="stats"]')

  if (reduced) {
    gsap.set([...borders, line, label, heading, items, stats], { opacity: 1, scaleX: 1, x: 0, y: 0 })
    return
  }

  const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 85%' } })

  if (borders.length) tl.fromTo(borders, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut', stagger: 0.1 })
  tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, borders.length ? '-=0.5' : 0)
    .fromTo(label, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '<')

  if (heading) tl.fromTo(heading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')

  if (items) tl.fromTo(items, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
  if (stats) tl.fromTo(stats, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
})
</script>

<template>
  <section
    ref="root"
    class="bg-surface relative"
    :class="props.variant === 'full' ? 'py-28 lg:py-40' : 'py-14 lg:py-16'"
    aria-label="Trusted by brands"
  >
    <template v-if="props.variant === 'full'">
      <span data-reveal="border" class="bg-border-subtle absolute inset-x-0 top-0 h-px" aria-hidden="true" />
      <span data-reveal="border" class="bg-border-subtle absolute inset-x-0 bottom-0 h-px" aria-hidden="true" />
    </template>

    <Container>
      <template v-if="props.variant === 'full'">
        <div class="flex items-center gap-3">
          <span data-reveal="line" class="bg-accent h-px w-8 origin-left" aria-hidden="true" />
          <p data-reveal="label" class="text-label text-accent">Trust</p>
        </div>

        <div data-reveal="heading" class="mt-5 max-w-2xl">
          <h2 class="text-heading text-ink uppercase">Trusted By Brands</h2>
          <p class="text-body-lg text-ink-muted mt-6">
            We collaborate with ambitious brands, teams and businesses to create work that moves people.
          </p>
        </div>

        <div data-reveal="items" class="border-border-subtle marquee-viewport mt-16 overflow-hidden border-y py-10 sm:py-12">
          <!--
            Trailing margin (not container `gap`) on every item, including
            the very last one — so the doubled track is exactly two equal
            "item + spacing" halves and `translateX(-50%)` loops without
            the half-gap jump a `gap`-based track would have at the seam.
          -->
          <div class="marquee-track flex w-max items-center">
            <div v-for="brand in brands" :key="`a-${brand.id}`" class="mr-16 flex shrink-0 items-center justify-center sm:mr-24">
              <TrustedByItem :brand="brand" />
            </div>
            <div v-for="brand in brands" :key="`b-${brand.id}`" class="mr-16 flex shrink-0 items-center justify-center sm:mr-24" inert>
              <TrustedByItem :brand="brand" />
            </div>
          </div>
        </div>

        <div data-reveal="stats" class="mt-14 grid grid-cols-3 gap-6 sm:mt-16 sm:max-w-xl">
          <div v-for="stat in studioStats" :key="stat.label">
            <p class="text-heading text-accent">{{ stat.value }}</p>
            <p class="text-body-sm text-ink-muted mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </template>

      <div v-else class="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
        <div class="flex shrink-0 items-center gap-3">
          <span data-reveal="line" class="bg-accent h-px w-8 origin-left" aria-hidden="true" />
          <p data-reveal="label" class="text-label text-ink-muted whitespace-nowrap">Trusted By</p>
        </div>

        <ul data-reveal="items" class="flex flex-1 flex-wrap items-center gap-x-10 gap-y-5 lg:justify-between">
          <li v-for="brand in brands" :key="brand.id">
            <TrustedByItem :brand="brand" />
          </li>
        </ul>
      </div>
    </Container>
  </section>
</template>

<style scoped>
/*
 * Infinite marquee — deliberately plain CSS, not GSAP. The brand strip is
 * rendered twice back-to-back (the second copy is `inert`, so it never
 * reaches the accessibility tree or tab order); translating the track by
 * exactly -50% of its own width loops it seamlessly, since the second
 * half is pixel-identical to the first. Running this off `animation`
 * rather than a scroll-linked tween means it never depends on JavaScript
 * initializing at all, and `prefers-reduced-motion` is handled natively.
 */
.marquee-track {
  animation: trusted-by-marquee 34s linear infinite;
}

.marquee-track:hover,
.marquee-track:focus-within {
  animation-play-state: paused;
}

.marquee-viewport {
  mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
}

@keyframes trusted-by-marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
