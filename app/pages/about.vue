<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'
import { processStages, studioStats, studioValues, teamMembers } from '~/data/studio'

useSeoMeta({
  title: 'About — 24 Seven Studio',
  description: 'A cinematic Swiss-luxury creative studio based in Phnom Penh, working with clients across Cambodia and worldwide.',
  ogTitle: 'About — 24 Seven Studio',
  ogDescription: 'A cinematic Swiss-luxury creative studio based in Phnom Penh, working with clients across Cambodia and worldwide.',
  ogImage: 'https://picsum.photos/1200/630?random=5',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://24seven.studio/about' }]
})

const capabilities = serviceRepository.list()
</script>

<template>
  <main id="main-content">
    <section class="relative flex min-h-[70vh] items-end overflow-hidden bg-black pb-20 lg:items-center lg:pb-0">
      <img src="https://picsum.photos/2400/1600?random=220" alt="" aria-hidden="true" class="absolute inset-0 size-full object-cover opacity-60">
      <div class="from-black/95 via-black/60 absolute inset-0 bg-gradient-to-t to-black/30" aria-hidden="true" />
      <Container class="relative z-10 pt-32">
        <span class="text-label mb-6 flex items-center gap-3 text-white/70">
          <span class="h-px w-8 bg-white/50" aria-hidden="true" />
          About the Studio
        </span>
        <h1 class="text-display-xl max-w-4xl text-white">A studio built for craft, not just campaigns.</h1>
      </Container>
    </section>

    <section class="bg-surface py-28 lg:py-40">
      <Container narrow>
        <Reveal as="p" class="text-heading text-ink text-balance">
          24 Seven Studio began with a simple frustration — too many brands looked expensive without being built to last. We exist to close that gap.
        </Reveal>
      </Container>
    </section>

    <section class="bg-surface pb-28 lg:pb-40">
      <Container>
        <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal as="div" class="lg:col-span-6">
            <span class="text-label text-accent mb-5 flex items-center gap-3">
              <span class="bg-accent h-px w-8" aria-hidden="true" />
              Who We Are
            </span>
            <p class="text-body-lg text-ink-muted max-w-md">
              We’re an independent studio of strategists, designers, engineers and filmmakers working across branding, digital product, motion and marketing — small enough to stay hands-on, senior enough to run without hand-holding.
            </p>

            <div class="border-border-subtle mt-12 grid grid-cols-3 gap-6 border-t pt-10">
              <div v-for="stat in studioStats" :key="stat.label">
                <p class="text-heading text-accent">{{ stat.value }}</p>
                <p class="text-body-sm text-ink-muted mt-1">{{ stat.label }}</p>
              </div>
            </div>
          </Reveal>

          <div class="relative overflow-hidden lg:col-span-6">
            <Reveal variant="clip" class="block aspect-4/5">
              <img src="https://picsum.photos/900/1100?random=221" alt="24 Seven Studio team reviewing work" loading="lazy" class="size-full object-cover">
            </Reveal>
          </div>
        </div>
      </Container>
    </section>

    <section class="bg-charcoal py-28 lg:py-40">
      <Container>
        <span class="text-label text-accent mb-5 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          Approach
        </span>
        <h2 class="text-heading max-w-2xl text-white">Four stages, no shortcuts.</h2>

        <ScrollReveal as="div" class="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stage in processStages" :key="stage.index" class="border-t border-white/15 pt-6">
            <span class="text-body-sm text-white/40">{{ stage.index }}</span>
            <h3 class="text-subheading mt-2 text-white">{{ stage.title }}</h3>
            <p class="text-body-sm mt-3 text-white/60">{{ stage.description }}</p>
          </div>
        </ScrollReveal>
      </Container>
    </section>

    <section class="bg-surface py-28 lg:py-40">
      <Container>
        <span class="text-label text-accent mb-5 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          Capabilities
        </span>
        <h2 class="text-heading max-w-2xl text-ink">Everything a brand needs, under one studio.</h2>

        <ScrollReveal as="div" class="border-border-subtle mt-14 grid grid-cols-1 border-t sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="capability in capabilities" :key="capability.id" class="border-border-subtle border-b py-8 pr-6 sm:border-r sm:last:border-r-0">
            <span class="text-body-sm text-ink-muted">{{ capability.index }}</span>
            <h3 class="text-subheading mt-2 text-ink">{{ capability.title }}</h3>
            <p class="text-body-sm text-ink-muted mt-3">{{ capability.summary }}</p>
          </div>
        </ScrollReveal>
      </Container>
    </section>

    <section class="bg-surface pb-28 lg:pb-40">
      <Container>
        <span class="text-label text-accent mb-5 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          Values
        </span>
        <h2 class="text-heading max-w-2xl text-ink">What we protect on every project.</h2>

        <ScrollReveal as="div" class="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="value in studioValues" :key="value.title">
            <h3 class="text-subheading text-ink">{{ value.title }}</h3>
            <p class="text-body-sm text-ink-muted mt-3">{{ value.description }}</p>
          </div>
        </ScrollReveal>
      </Container>
    </section>

    <section class="bg-surface pb-28 lg:pb-40">
      <Container>
        <span class="text-label text-accent mb-5 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          The Team
        </span>
        <h2 class="text-heading max-w-2xl text-ink">Small studio, senior team.</h2>

        <ScrollReveal as="div" class="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div v-for="member in teamMembers" :key="member.name">
            <div class="bg-charcoal-200 aspect-4/5 overflow-hidden">
              <img :src="member.image" :alt="`Portrait of ${member.name}`" loading="lazy" class="size-full object-cover">
            </div>
            <p class="text-body mt-4 text-ink">{{ member.name }}</p>
            <p class="text-body-sm text-ink-muted">{{ member.role }}</p>
          </div>
        </ScrollReveal>
      </Container>
    </section>

    <SelectedWork />
    <FinalCta />
  </main>
</template>
