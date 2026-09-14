<script setup lang="ts">
import { trustedBrandRepository } from '~/repositories/trustedBrandRepository'

interface Props {
  /** `full` — standalone showcase with heading + copy + bordered brand wall (Home). `compact` — a slim inline trust line for embedding inside another page's section (About, Contact). */
  variant?: 'full' | 'compact'
}

const props = withDefaults(defineProps<Props>(), { variant: 'full' })

const brands = trustedBrandRepository.list()

/**
 * HOME / Trusted By Brands — scroll — border lines draw in from center (full
 * variant only), an accent rule sweeps in before the label, brand cells
 * clip-reveal in a stagger.
 * Library: GSAP + ScrollTrigger. Duration: ~1.4s total. Easing: power3 in/out.
 * Mobile: identical timeline, shorter travel since the grid wraps narrower.
 * Reduced motion: every target snaps straight to its resting state, no draw.
 */
const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const borders = root.querySelectorAll('[data-reveal="border"]')
  const line = root.querySelector('[data-reveal="line"]')
  const label = root.querySelector('[data-reveal="label"]')
  const heading = root.querySelector('[data-reveal="heading"]')
  const items = Array.from(root.querySelectorAll('[data-reveal="item"]'))

  if (reduced) {
    gsap.set([...borders, line, label, heading, ...items], { opacity: 1, scaleX: 1, x: 0, y: 0, clipPath: 'inset(0 0 0% 0)' })
    return
  }

  const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 85%' } })

  if (borders.length) tl.fromTo(borders, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut', stagger: 0.1 })
  tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, borders.length ? '-=0.5' : 0)
    .fromTo(label, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '<')

  if (heading) tl.fromTo(heading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')

  tl.fromTo(
    items,
    { opacity: 0, y: 14, clipPath: 'inset(0 0 100% 0)' },
    { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.7, stagger: 0.06, ease: 'power3.out' },
    '-=0.3'
  )
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

        <div class="border-border-subtle divide-border-subtle mt-16 grid grid-cols-2 divide-x divide-y border sm:grid-cols-4">
          <div v-for="brand in brands" :key="brand.id" data-reveal="item" class="flex h-28 items-center justify-center px-4 sm:h-32">
            <TrustedByItem :brand="brand" />
          </div>
        </div>
      </template>

      <div v-else class="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
        <div class="flex shrink-0 items-center gap-3">
          <span data-reveal="line" class="bg-accent h-px w-8 origin-left" aria-hidden="true" />
          <p data-reveal="label" class="text-label text-ink-muted whitespace-nowrap">Trusted By</p>
        </div>

        <ul class="flex flex-1 flex-wrap items-center gap-x-10 gap-y-5 lg:justify-between">
          <li v-for="brand in brands" :key="brand.id" data-reveal="item">
            <TrustedByItem :brand="brand" />
          </li>
        </ul>
      </div>
    </Container>
  </section>
</template>
