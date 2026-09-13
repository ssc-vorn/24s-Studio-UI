<script setup lang="ts">
const { root } = useScrollAnimation(({ gsap, root }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const cta = root.querySelector('[data-reveal="cta"]')

  gsap.fromTo(
    [heading, cta],
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 75%' } }
  )
})
</script>

<template>
  <section ref="root" class="relative overflow-hidden bg-black py-36 lg:py-52">
    <img
      src="https://picsum.photos/2000/1200?random=290"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 size-full object-cover opacity-25"
      loading="lazy"
    >
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/80" aria-hidden="true" />

    <Container class="relative z-10 flex flex-col items-center text-center">
      <h2 data-reveal="heading" class="text-display max-w-4xl text-white">
        Have an idea worth building?
      </h2>

      <div data-reveal="cta" class="mt-12">
        <MagneticButton as="NuxtLink" href="/contact" class="bg-white! text-black! hover:bg-accent! hover:text-white!">
          Start a Project
        </MagneticButton>
      </div>
    </Container>
  </section>
</template>
