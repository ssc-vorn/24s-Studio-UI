<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'
import { testimonialService } from '~/services/testimonialService'
import { processStages, studioStats, studioValues, teamMembers } from '~/data/studio'

useSeoMeta({
  title: 'About — 24s Studio',
  description: 'A cinematic, art-directed digital creative studio working with ambitious clients worldwide.',
  ogTitle: 'About — 24s Studio',
  ogDescription: 'A cinematic, art-directed digital creative studio working with ambitious clients worldwide.',
  ogImage: 'https://picsum.photos/1200/630?random=5',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://24s.studio/about' }]
})

const capabilities = serviceRepository.list()
const trustQuote = testimonialService.getSecondary()
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
        <p class="text-heading text-ink text-balance">
          <Reveal as="span" class="block">
            24s Studio began with a simple frustration — too many brands looked expensive without being built to last.
          </Reveal>
          <Reveal as="span" :delay="0.25" class="text-ink-muted mt-2 block">
            We exist to close that gap.
          </Reveal>
        </p>
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
              <img src="https://picsum.photos/900/1100?random=221" alt="24s Studio team reviewing work" loading="lazy" class="size-full object-cover">
            </Reveal>
          </div>
        </div>
      </Container>
    </section>

    <TrustedBySection variant="compact" />

    <!-- Approach — an asymmetric lead statement beside a connected list of
         stages (not a 4-up grid of boxes), on the studio's dark charcoal
         band. Uses each stage's fuller `detail` copy rather than the
         one-line `description` Home's teaser uses, since this page has
         room for the longer version. -->
    <section class="bg-charcoal py-28 lg:py-40">
      <Container>
        <span class="text-label text-accent mb-5 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          Approach
        </span>

        <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal as="div" class="lg:col-span-4">
            <h2 class="text-heading text-white">Four stages, no shortcuts.</h2>
            <p class="text-body-lg mt-6 max-w-sm text-white/60">
              Every engagement moves through the same discipline regardless of scope — skipping a stage is how brands end up expensive-looking but forgettable.
            </p>
          </Reveal>

          <div class="lg:col-span-8">
            <ScrollReveal as="div" :stagger="0.12" class="flex flex-col">
              <div
                v-for="stage in processStages"
                :key="stage.index"
                class="border-t border-white/15 py-8 first:pt-0 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-10"
              >
                <div class="flex items-baseline gap-4 lg:col-span-4">
                  <span class="text-body-sm text-white/40 tabular-nums">{{ stage.index }}</span>
                  <h3 class="text-subheading text-white">{{ stage.title }}</h3>
                </div>
                <p class="text-body mt-3 text-white/60 lg:col-span-8 lg:mt-0">{{ stage.detail }}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>

    <!-- Capabilities — full-width divided rows rather than bordered grid
         cells, each surfacing the service's own capability list (already in
         the data, just unused here before) for real hierarchy between the
         service name and its specifics rather than index/title/summary
         repeated four times identically. -->
    <section class="bg-surface py-28 lg:py-40">
      <Container>
        <span class="text-label text-accent mb-5 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          Capabilities
        </span>
        <h2 class="text-heading max-w-2xl text-ink">Everything a brand needs, under one studio.</h2>

        <ScrollReveal as="div" class="border-border-subtle mt-14 border-t">
          <div
            v-for="capability in capabilities"
            :key="capability.id"
            class="border-border-subtle border-b py-10 lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-8"
          >
            <div class="flex items-baseline gap-4 lg:col-span-4">
              <span class="text-body-sm text-ink-muted tabular-nums">{{ capability.index }}</span>
              <h3 class="text-subheading text-ink">{{ capability.title }}</h3>
            </div>
            <p class="text-body text-ink-muted mt-3 lg:col-span-3 lg:mt-0">{{ capability.summary }}</p>
            <p class="text-body-sm text-ink-muted/80 mt-3 lg:col-span-5 lg:mt-0 lg:text-right">
              {{ capability.capabilities.join(' · ') }}
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>

    <!-- Values — the most expressive of the three: large ghost numerals,
         no borders/dividers at all, generous whitespace. Reads as a pause
         rather than another data list, deliberately unlike the two
         denser sections above it. -->
    <section class="bg-surface pb-28 lg:pb-40">
      <Container>
        <span class="text-label text-accent mb-5 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          Values
        </span>
        <h2 class="text-heading max-w-2xl text-ink">What we protect on every project.</h2>

        <ScrollReveal as="div" :stagger="0.16" class="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
          <div v-for="(value, index) in studioValues" :key="value.title" class="flex gap-6">
            <span class="text-display shrink-0 leading-none text-ink/10" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="pt-2">
              <h3 class="text-subheading text-ink">{{ value.title }}</h3>
              <p class="text-body text-ink-muted mt-3 max-w-sm">{{ value.description }}</p>
            </div>
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

    <section v-if="trustQuote" class="bg-charcoal py-28 lg:py-40">
      <Container narrow>
        <TestimonialQuote :testimonial="trustQuote" size="compact" tone="white" />
      </Container>
    </section>

    <SelectedWork />
    <FinalCta />
  </main>
</template>
