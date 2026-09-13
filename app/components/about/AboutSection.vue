<script setup lang="ts">
import { revealAbout } from '~/animations/sections/about'

const stats = [
  { value: '12+', label: 'Years Experience' },
  { value: '50+', label: 'Happy Clients' },
  { value: '100+', label: 'Projects Completed' }
]

const team = [
  { name: 'Elena Marchetti', role: 'Founder & Creative Director', image: 'https://picsum.photos/500/600?random=271' },
  { name: 'Tom Bellweather', role: 'Motion Director', image: 'https://picsum.photos/500/600?random=272' },
  { name: 'Priya Nair', role: 'Head of Strategy', image: 'https://picsum.photos/500/600?random=273' },
  { name: 'Marcus Feld', role: 'Lead Engineer', image: 'https://picsum.photos/500/600?random=274' }
]

const imageContainer = ref<HTMLElement | null>(null)
const imageTarget = ref<HTMLElement | null>(null)
useParallax(imageContainer, imageTarget, { distance: 40 })

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const statement = root.querySelector('[data-reveal="statement"]')
  const image = root.querySelector('[data-reveal="image"]')
  const meta = Array.from(root.querySelectorAll('[data-reveal="meta"]'))
  revealAbout(gsap, { statement, image, meta }, root, reduced)

  const teamEls = Array.from(root.querySelectorAll('[data-team-member]'))
  gsap.fromTo(
    teamEls,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: reduced ? 0.001 : 0.7,
      stagger: reduced ? 0 : 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: root, start: 'top 60%' }
    }
  )
})
</script>

<template>
  <section id="about" ref="root" class="bg-off-white py-28 lg:py-40">
    <Container>
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-6">
          <span class="text-label text-primary-900 mb-6 flex items-center gap-3">
            <span class="h-px w-8 bg-primary-900" aria-hidden="true" />
            Our Story
          </span>
          <h2 data-reveal="statement" class="text-h1 text-ink">About Us</h2>
          <p class="text-body-lg text-sand-600 mt-6 max-w-md">
            A creative studio with a passion for turning ideas into extraordinary experiences. We're a team of
            designers, developers and storytellers who believe in the power of creativity to inspire, connect and
            drive results for brands worldwide.
          </p>

          <div class="mt-14 grid grid-cols-3 gap-6 border-t border-fog pt-10">
            <div v-for="stat in stats" :key="stat.label" data-reveal="meta">
              <p class="text-h2 text-primary-900">{{ stat.value }}</p>
              <p class="text-body-sm text-sand-600 mt-1">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <div ref="imageContainer" class="relative overflow-hidden rounded-3xl lg:col-span-6">
          <div ref="imageTarget" class="absolute inset-0 -top-10 -bottom-10">
            <img
              data-reveal="image"
              src="https://picsum.photos/900/1100?random=270"
              alt="Studio team working in the Nexora design space"
              loading="lazy"
              class="size-full object-cover"
            >
          </div>
        </div>
      </div>

      <div class="mt-28">
        <p class="text-label text-sand-600 mb-10">The Team</p>
        <div class="grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div v-for="member in team" :key="member.name" data-team-member>
            <div class="aspect-[5/6] overflow-hidden rounded-2xl bg-sand-200">
              <img :src="member.image" :alt="`Portrait of ${member.name}`" loading="lazy" class="size-full object-cover">
            </div>
            <p class="text-body mt-4 text-ink">{{ member.name }}</p>
            <p class="text-body-sm text-sand-600">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
