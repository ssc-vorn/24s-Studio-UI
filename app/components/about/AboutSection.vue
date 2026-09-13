<script setup lang="ts">
import { revealAbout } from '~/animations/sections/about'

const values = [
  { title: 'Craft', description: 'Every pixel and frame is considered — nothing ships because it was easy.' },
  { title: 'Curiosity', description: 'We start each project by questioning the brief, not just answering it.' },
  { title: 'Candor', description: 'Honest creative feedback, even when it slows us down in the short term.' }
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
        <div class="lg:col-span-7">
          <span class="text-label text-primary-900 mb-6 flex items-center gap-3">
            <span class="h-px w-8 bg-primary-900" aria-hidden="true" />
            About the Studio
          </span>
          <p data-reveal="statement" class="text-h1 text-ink text-balance">
            We believe brands earn attention through craft, not noise —
            <span class="text-sand-400">so every project starts with a point of view, not a template.</span>
          </p>

          <div class="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div v-for="value in values" :key="value.title" data-reveal="meta">
              <h3 class="text-h4 text-ink">{{ value.title }}</h3>
              <p class="text-body-sm text-sand-600 mt-2">{{ value.description }}</p>
            </div>
          </div>
        </div>

        <div ref="imageContainer" class="relative overflow-hidden lg:col-span-5">
          <div ref="imageTarget" class="absolute inset-0 -top-10 -bottom-10">
            <img
              data-reveal="image"
              src="https://picsum.photos/900/1100?random=270"
              alt="Studio team working in the 24S design space"
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
            <div class="aspect-[5/6] overflow-hidden bg-sand-200">
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
