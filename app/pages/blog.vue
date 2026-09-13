<script setup lang="ts">
import { blogPosts } from '~/data/blog'

useSeoMeta({
  title: 'Journal — Nexora',
  description: 'Notes on brand craft, motion design, digital product and strategy from the Nexora studio team.',
  ogTitle: 'Journal — Nexora',
  ogDescription: 'Notes on brand craft, motion design, digital product and strategy from the Nexora studio team.',
  ogImage: 'https://picsum.photos/1200/630?random=2',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Journal — Nexora',
  twitterDescription: 'Notes on brand craft, motion design, digital product and strategy from the Nexora studio team.',
  twitterImage: 'https://picsum.photos/1200/630?random=2'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://nexora.studio/blog' }]
})

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const cards = Array.from(root.querySelectorAll('[data-blog-card]'))
  if (!cards.length) return
  gsap.fromTo(
    cards,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: reduced ? 0.001 : 0.75,
      stagger: reduced ? 0 : 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: root, start: 'top 85%' }
    }
  )
})
</script>

<template>
  <main id="main-content">
    <section class="bg-off-white pt-44 pb-20 lg:pt-56 lg:pb-28">
      <Container>
        <SectionHeading
          eyebrow="Journal"
          title="Ideas, process and craft from the studio."
          description="Long-form notes on how we think about brand, motion and digital product work."
          size="h1"
        />
      </Container>
    </section>

    <section ref="root" class="bg-off-white pb-28 lg:pb-40">
      <Container>
        <div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="post in blogPosts" :id="`post-${post.id}`" :key="post.id" data-blog-card class="scroll-mt-32">
            <BlogCard :post="post" />
          </div>
        </div>
      </Container>
    </section>
  </main>
</template>
