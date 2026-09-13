<script setup lang="ts">
import { projectService } from '~/services/projectService'

const clients = projectService.getTrustedClients()

/**
 * HOME / Trusted By — scroll — border lines draw in from center, an accent
 * rule sweeps in before the label, names clip-reveal in a stagger.
 * Library: GSAP + ScrollTrigger. Duration: ~1.4s total. Easing: power3 in/out.
 * Mobile: identical timeline, shorter travel since the row wraps narrower.
 * Reduced motion: every target snaps straight to its resting state, no draw.
 */
const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const borders = root.querySelectorAll('[data-reveal="border"]')
  const line = root.querySelector('[data-reveal="line"]')
  const label = root.querySelector('[data-reveal="label"]')
  const items = Array.from(root.querySelectorAll('[data-reveal="item"]'))

  if (reduced) {
    gsap.set([...borders, line, label, ...items], { opacity: 1, scaleX: 1, x: 0, y: 0, clipPath: 'inset(0 0 0% 0)' })
    return
  }

  gsap
    .timeline({ scrollTrigger: { trigger: root, start: 'top 88%' } })
    .fromTo(borders, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut', stagger: 0.1 })
    .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.5')
    .fromTo(label, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '<')
    .fromTo(
      items,
      { opacity: 0, y: 14, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.7, stagger: 0.07, ease: 'power3.out' },
      '-=0.3'
    )
})
</script>

<template>
  <section ref="root" class="bg-surface relative py-14 lg:py-16" aria-label="Trusted by">
    <span data-reveal="border" class="bg-border-subtle absolute inset-x-0 top-0 h-px" aria-hidden="true" />
    <span data-reveal="border" class="bg-border-subtle absolute inset-x-0 bottom-0 h-px" aria-hidden="true" />

    <Container>
      <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
        <div class="flex shrink-0 items-center gap-3">
          <span data-reveal="line" class="bg-accent h-px w-8 origin-left" aria-hidden="true" />
          <p data-reveal="label" class="text-label text-ink-muted whitespace-nowrap">Trusted By</p>
        </div>

        <ul class="flex flex-1 flex-wrap items-center gap-x-10 gap-y-5 lg:justify-between">
          <li v-for="client in clients" :key="client.slug" data-reveal="item">
            <TrustedByItem :name="client.name" :slug="client.slug" />
          </li>
        </ul>
      </div>
    </Container>
  </section>
</template>
