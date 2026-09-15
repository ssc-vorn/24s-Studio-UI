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
</script>

<template>
  <main id="main-content">
    <HeroSection />
    <ManifestoSection />
    <StatsSection />
    <ServiceList />
    <Marquee :items="['Design', 'Identity', 'Motion', 'Digital', 'Advertising']" />
    <SelectedWork />
    <AboutTeaser />
    <ProcessSection />
    <FeaturedCaseStudy />
    <TestimonialSection />
    <JournalTeaser />
    <FinalStatementSection />
    <FinalCta />
  </main>
</template>
