<script setup lang="ts">
useSeoMeta({
  title: 'Services — 24s Studio',
  description: 'Graphic design, brand identity, video editing, digital marketing and advertising — full-service creative work from strategy through execution.',
  ogTitle: 'Services — 24s Studio',
  ogDescription: 'Graphic design, brand identity, video editing, digital marketing and advertising — full-service creative work from strategy through execution.',
  ogImage: 'https://picsum.photos/1200/630?random=4',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://24s.studio/services' }]
})
</script>

<template>
  <main id="main-content">
    <section class="bg-surface pt-44 pb-8 lg:pt-56 lg:pb-12">
      <Container>
        <span class="text-label text-accent mb-6 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          What We Do
        </span>
        <h1 class="text-display-xl max-w-4xl text-ink">Full-service creative, held to one standard.</h1>
        <p class="text-body-lg text-ink-muted mt-8 max-w-xl">
          Every discipline you need, run by one studio, so nothing gets lost in translation between strategy, design and production.
        </p>
      </Container>
    </section>

    <ServiceList heading="Five disciplines. One studio." intro="Select a service to see the process, capabilities and work behind it." />

    <FinalCta />
  </main>
</template>
