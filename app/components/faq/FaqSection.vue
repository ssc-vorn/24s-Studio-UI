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
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal="heading" class="lg:col-span-4">
          <SectionHeading eyebrow="FAQ" title="Questions, answered." description="Everything you need to know before reaching out." />
        </div>

        <div data-reveal="list" class="lg:col-span-8">
          <FaqItem v-for="faq in faqs" :key="faq.id" :faq="faq" :is-open="activeId === faq.id" @toggle="toggle(faq.id)" />
        </div>
      </div>
    </Container>
  </section>
</template>
