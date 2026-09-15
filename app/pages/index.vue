<script setup lang="ts">
useSeoMeta({
  title: '24s Studio — Digital Creative Studio',
  description:
    'A cinematic, art-directed digital creative studio working across graphic design, brand identity, video editing, digital marketing and advertising for ambitious brands worldwide.',
  ogTitle: '24s Studio — Digital Creative Studio',
  ogDescription:
    'A cinematic, art-directed digital creative studio working across graphic design, brand identity, video editing, digital marketing and advertising for ambitious brands worldwide.',
  ogImage: 'https://picsum.photos/1200/630?random=1',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: '24s Studio — Digital Creative Studio',
  twitterDescription:
    'A cinematic, art-directed digital creative studio working across graphic design, brand identity, video editing, digital marketing and advertising for ambitious brands worldwide.',
  twitterImage: 'https://picsum.photos/1200/630?random=1'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://24s.studio' }]
})

const kineticWords = ['Design', 'Motion', 'Identity', 'Digital', 'Advertising']
</script>

<template>
  <main id="main-content">
    <!-- 02 — Hero: cinematic opening scene -->
    <HeroSection />

    <!-- 03 — Trusted By: minimal horizontal brand-logo system, deliberately
         restrained so it reads as credibility, not a logo wall. -->
    <TrustedBySection />

    <!-- 04 — Studio Introduction: editorial statement, its own composition -->
    <ManifestoSection />

    <!-- 05 — Services: interactive indexed list -->
    <ServiceList />

    <!-- 06 — Kinetic Editorial Marquee: the visual transition into Work -->
    <Marquee>
      <span v-for="(word, index) in kineticWords" :key="index" class="flex items-center">
        <span class="text-service-title px-6 text-ink/70 lg:px-10">{{ word }}</span>
        <span class="bg-accent inline-block size-2 shrink-0 rounded-full lg:size-2.5" />
      </span>
    </Marquee>

    <!-- 07 — Selected Work: immersive cinematic scene sequence -->
    <SelectedWork />

    <!-- 08 — Creative Manifesto: full-screen emotional composition -->
    <FinalStatementSection />

    <!-- 09 — Studio Proof / Metrics: structured, data-driven rhythm -->
    <StatsSection />

    <!-- 10 — Testimonial: editorial quote composition -->
    <TestimonialSection />

    <!-- 11 — Final CTA: the closing scene -->
    <FinalCta />
  </main>
</template>
