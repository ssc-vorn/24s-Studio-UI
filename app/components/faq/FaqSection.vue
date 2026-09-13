<script setup lang="ts">
import { faqs } from '~/data/faqs'

const activeId = ref<number | null>(faqs[0]?.id ?? null)

function toggle(id: number) {
  activeId.value = activeId.value === id ? null : id
}

const { root } = useScrollAnimation(({ gsap, root }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const list = root.querySelector('[data-reveal="list"]')

  gsap.fromTo(
    [heading, list],
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
  )
})
</script>

<template>
  <section id="faq" ref="root" class="bg-off-white py-28 lg:py-40">
    <Container narrow>
      <div data-reveal="heading" class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Frequently Asked Questions" title="FAQ" />
        <AnimatedLink href="#faq" class="shrink-0">View All FAQs</AnimatedLink>
      </div>

      <div data-reveal="list" class="mt-12 rounded-2xl border border-fog bg-white px-6 sm:px-8 [&>*:last-child]:border-b-0">
        <FaqItem v-for="faq in faqs" :key="faq.id" :faq="faq" :is-open="activeId === faq.id" @toggle="toggle(faq.id)" />
      </div>
    </Container>
  </section>
</template>
