<script setup lang="ts">
import { blogPosts } from '~/data/blog'

const previewPosts = blogPosts.slice(0, 4)

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const cards = Array.from(root.querySelectorAll('[data-blog-card]'))

  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
  }

  if (cards.length) {
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.001 : 0.75,
        stagger: reduced ? 0 : 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 72%' }
      }
    )
  }
})
</script>

<template>
  <section id="blog" ref="root" class="bg-off-white py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Latest Articles" title="Blog" />
        <AnimatedLink to="/blog" class="shrink-0">View All Blog</AnimatedLink>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="post in previewPosts" :key="post.id" data-blog-card>
          <NuxtLink :to="`/blog#post-${post.id}`">
            <BlogCard :post="post" />
          </NuxtLink>
        </div>
      </div>

      <div class="mt-14 flex justify-center">
        <MagneticButton as="NuxtLink" href="/blog">View All Blog</MagneticButton>
      </div>
    </Container>
  </section>
</template>
