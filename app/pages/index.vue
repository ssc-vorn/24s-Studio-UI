<script setup lang="ts">
useSeoMeta({
  title: '24 Seven Studio — Creative Studio, Cambodia × Worldwide',
  description:
    'A cinematic, art-directed creative studio building brands, digital experiences and visual stories for ambitious clients in Cambodia and worldwide.',
  ogTitle: '24 Seven Studio — Creative Studio, Cambodia × Worldwide',
  ogDescription:
    'A cinematic, art-directed creative studio building brands, digital experiences and visual stories for ambitious clients in Cambodia and worldwide.',
  ogImage: 'https://picsum.photos/1200/630?random=1',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: '24 Seven Studio — Creative Studio',
  twitterDescription:
    'A cinematic, art-directed creative studio building brands, digital experiences and visual stories for ambitious clients in Cambodia and worldwide.',
  twitterImage: 'https://picsum.photos/1200/630?random=1'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://24seven.studio' }]
})
</script>

<template>
  <main id="main-content">
    <HeroSection />
    <ManifestoSection />
    <TrustedBySection />
    <SelectedWork />
    <ServiceList />
    <AboutTeaser />
    <ProcessSection />
    <FeaturedCaseStudy />
    <TestimonialSection />
    <JournalTeaser />
    <FinalCta />
  </main>
</template>
