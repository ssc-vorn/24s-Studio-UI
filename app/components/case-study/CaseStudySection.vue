<script setup lang="ts">
interface Props {
  label: string
  text: string
  image?: string
  reverse?: boolean
}

const props = withDefaults(defineProps<Props>(), { reverse: false })

/**
 * CASE STUDY / narrative section — scroll — label reveals first, copy
 * follows a beat behind it (typography feels staged, not a single block),
 * the image wipes in via clip-path, and once visible the image drifts
 * subtly against the scroll (a restrained parallax) for the rest of its
 * time in view.
 * Library: GSAP + ScrollTrigger (entrance) + ScrollTrigger (scrub, image
 * drift only). Duration: ~0.5–0.9s entrance. Easing: power2/power3 out.
 * Reduced motion: entrance snaps to final state, no image drift.
 */
const { root } = useScrollAnimation(({ gsap, root, reduced, ScrollTrigger }) => {
  const label = root.querySelector('[data-reveal="label"]')
  const text = root.querySelector('[data-reveal="text"]')
  const imageWrap = root.querySelector('[data-reveal="image-wrap"]')
  const imageEl = root.querySelector('[data-reveal="image-el"]')

  if (reduced) {
    gsap.set([label, text, imageWrap], { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' })
    return
  }

  const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 82%' } })
  tl.fromTo(label, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }).fromTo(
    text,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
    '-=0.25'
  )

  if (imageWrap) {
    tl.fromTo(
      imageWrap,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out' },
      '-=0.55'
    )
  }

  if (imageEl) {
    gsap.fromTo(
      imageEl,
      { yPercent: -6 },
      { yPercent: 6, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }
    )
  }
})
</script>

<template>
  <div ref="root" class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-5" :class="image && reverse ? 'lg:order-2' : ''">
      <p data-reveal="label" class="text-label text-ink-muted mb-5">{{ props.label }}</p>
      <p data-reveal="text" class="text-body-lg text-ink">{{ props.text }}</p>
    </div>
    <div v-if="image" class="lg:col-span-7">
      <div data-reveal="image-wrap" class="relative aspect-4/3 w-full overflow-hidden">
        <img data-reveal="image-el" :src="image" :alt="props.label" loading="lazy" class="absolute inset-0 size-full scale-110 object-cover">
      </div>
    </div>
  </div>
</template>
