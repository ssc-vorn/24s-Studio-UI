<script setup lang="ts">
useSeoMeta({
  title: '24 Twenty Four Studio — Creative Studio, Cambodia × Global',
  description:
    'A cinematic, art-directed creative studio building brands, digital experiences and visual stories for ambitious clients in Cambodia and worldwide.',
  ogTitle: '24 Twenty Four Studio — Creative Studio, Cambodia × Global',
  ogDescription:
    'A cinematic, art-directed creative studio building brands, digital experiences and visual stories for ambitious clients in Cambodia and worldwide.',
  ogImage: 'https://picsum.photos/1200/630?random=1',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: '24 Twenty Four Studio — Creative Studio',
  twitterDescription:
    'A cinematic, art-directed creative studio building brands, digital experiences and visual stories for ambitious clients in Cambodia and worldwide.',
  twitterImage: 'https://picsum.photos/1200/630?random=1'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://24twentyfour.studio' }]
})
</script>

<template>
  <main id="main-content">
    <HeroSection />
    <ManifestoSection />
    <TrustedBySection />
    <StatsSection />
    <ServiceList />
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
