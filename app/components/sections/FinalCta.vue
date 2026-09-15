<script setup lang="ts">
/**
 * HOME / Final CTA — scroll — typography and the CTA arrive in sequence (CTA
 * settling in with a slight scale, so it reads as the section's focal
 * point), while the background image slowly zooms and drifts against the
 * scroll for as long as the section is in view — restrained enough to
 * never compete with the CTA itself. The film's final scene, closing in
 * slowly rather than sitting static.
 * Library: GSAP + ScrollTrigger (entrance timeline) + ScrollTrigger (scrub,
 * background drift only). Duration: ~1s entrance. Easing: power3.out.
 * Reduced motion: entrance snaps to final state, no background drift.
 */
const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const cta = root.querySelector('[data-reveal="cta"]')
  const bg = root.querySelector('[data-reveal="bg"]')
  const mark = root.querySelector('[data-reveal="mark"]')

  if (reduced) {
    gsap.set([heading, cta, mark], { opacity: 1, y: 0, scale: 1 })
    return
  }

  const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 75%' } })
  tl.fromTo(mark, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, 0)
    .fromTo(heading, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.15)
    .fromTo(cta, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7')

  if (bg) {
    gsap.fromTo(
      bg,
      { yPercent: -8, scale: 1.05 },
      { yPercent: 8, scale: 1.18, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }
    )
  }

  if (mark) {
    gsap.to(mark, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    })
  }
})
</script>

<template>
  <section ref="root" class="relative overflow-hidden bg-black py-36 lg:py-52">
    <img
      data-reveal="bg"
      src="https://picsum.photos/2000/1200?random=290"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 size-full scale-105 object-cover opacity-25"
      loading="lazy"
    >
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/80" aria-hidden="true" />

    <!-- Geometric 24s form — the brand's numeral, faint and asymmetric,
         echoing the Hero's ghost mark without repeating its exact
         placement/scale: bottom-right here, corner-cropped, closing the
         film rather than opening it. -->
    <span
      data-reveal="mark"
      class="pointer-events-none absolute -right-[6vw] -bottom-[8vw] z-0 hidden font-serif text-[26vw] leading-none text-white/[0.05] select-none sm:block"
      aria-hidden="true"
    >24</span>

    <Container class="relative z-10 flex flex-col items-center text-center">
      <h2 data-reveal="heading" class="text-display max-w-4xl text-white">
        Let’s make something matter.
      </h2>

      <div data-reveal="cta" class="mt-12">
        <MagneticButton as="NuxtLink" href="/contact" data-cursor="start" class="bg-white! text-black! hover:bg-accent! hover:text-white!">
          Start a Project →
        </MagneticButton>
      </div>
    </Container>
  </section>
</template>
