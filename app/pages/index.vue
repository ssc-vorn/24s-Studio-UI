<script setup lang="ts">
useSeoMeta({
  title: 'Nexora — Creative Digital Studio',
  description:
    'A premium creative studio building brands, digital experiences, video and motion for ambitious companies.',
  ogTitle: 'Nexora — Creative Digital Studio',
  ogDescription:
    'A premium creative studio building brands, digital experiences, video and motion for ambitious companies.',
  ogImage: 'https://picsum.photos/1200/630?random=1',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Nexora — Creative Digital Studio',
  twitterDescription:
    'A premium creative studio building brands, digital experiences, video and motion for ambitious companies.',
  twitterImage: 'https://picsum.photos/1200/630?random=1'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://nexora.studio' }]
})
</script>

<template>
  <main id="main-content">
    <HeroSection />
    <PortfolioSection />
    <ServicesSection />
    <AboutSection />
    <TestimonialsSection />
    <PricingSection />
    <FaqSection />
    <BlogSection />
    <ContactSection />
  </main>
</template>
