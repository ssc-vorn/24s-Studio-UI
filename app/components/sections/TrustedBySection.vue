<script setup lang="ts">
import { projectService } from '~/services/projectService'

const clients = projectService.getClientNames()

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const label = root.querySelector('[data-reveal="label"]')
  const items = Array.from(root.querySelectorAll('[data-reveal="item"]'))

  gsap.fromTo(
    [label, ...items],
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: reduced ? 0.001 : 0.7,
      stagger: reduced ? 0 : 0.06,
      ease: 'power2.out',
      scrollTrigger: { trigger: root, start: 'top 90%' }
    }
  )
})
</script>

<template>
  <section ref="root" class="bg-surface border-border-subtle border-y py-14 lg:py-16" aria-label="Trusted by">
    <Container>
      <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
        <p data-reveal="label" class="text-label text-ink-muted shrink-0 whitespace-nowrap">Trusted By</p>

        <ul class="flex flex-1 flex-wrap items-center gap-x-10 gap-y-5 lg:justify-between">
          <li v-for="client in clients" :key="client" data-reveal="item">
            <span class="font-serif text-lg text-ink-muted italic transition-colors duration-300 hover:text-ink sm:text-xl">
              {{ client }}
            </span>
          </li>
        </ul>
      </div>
    </Container>
  </section>
</template>
