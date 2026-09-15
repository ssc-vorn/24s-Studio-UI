<script setup lang="ts">
const imageContainer = ref<HTMLElement | null>(null)
const imageTarget = ref<HTMLElement | null>(null)
useParallax(imageContainer, imageTarget, { distance: 36 })

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const statement = root.querySelector('[data-reveal="statement"]')
  const meta = root.querySelector('[data-reveal="meta"]')
  const image = root.querySelector('[data-reveal="image"]')

  const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 70%' } })

  if (reduced) {
    tl.set([statement, meta, image], { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' })
    return
  }

  tl.fromTo(statement, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    .fromTo(meta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6')
    .fromTo(
      image,
      { clipPath: 'inset(0 0 100% 0)', scale: 1.08 },
      { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.1, ease: 'power3.out' },
      '-=0.8'
    )
})
</script>

<template>
  <section id="about" ref="root" class="bg-surface py-28 lg:py-40">
    <Container>
      <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-7">
          <p data-reveal="statement" class="text-display text-ink">
            We build brands that don’t just look good.
            <span class="text-accent">They stay remembered.</span>
          </p>

          <div data-reveal="meta" class="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p class="text-body-lg text-ink-muted max-w-md">
              Twelve years of independent studio work across branding, digital, motion and marketing — for founders and institutions who care about the details.
            </p>
            <AnimatedLink to="/about" class="shrink-0">Learn About Us</AnimatedLink>
          </div>
        </div>

        <div ref="imageContainer" class="relative overflow-hidden lg:col-span-5">
          <div ref="imageTarget" class="absolute inset-0 -top-10 -bottom-10">
            <img
              data-reveal="image"
              src="https://picsum.photos/900/1100?random=210"
              alt="24s Studio team at work in the studio"
              loading="lazy"
              class="size-full object-cover"
            >
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
