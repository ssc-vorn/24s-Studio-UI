<script setup lang="ts">
import { studioStats } from '~/data/studio'

/**
 * HOME / Stats — scroll — each figure counts up from zero once the section
 * enters the viewport, landing at the same moment its label fades in below
 * it. A restrained pause between digits settling and the underline drawing
 * in keeps three simultaneous count-ups from reading as noisy.
 * Library: GSAP + ScrollTrigger. Duration: ~1.6s count, power2.out.
 * Reduced motion: figures render at their final value immediately, no count.
 */
const numberEls = ref<HTMLElement[]>([])
function setNumberRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) numberEls.value[index] = el
}

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const rule = root.querySelector('[data-reveal="rule"]')
  const items = Array.from(root.querySelectorAll('[data-reveal="item"]'))

  const targets = studioStats.map((stat) => ({
    numeric: Number.parseInt(stat.value, 10),
    suffix: stat.value.replace(/^\d+/, '')
  }))

  if (reduced) {
    gsap.set([rule, ...items], { opacity: 1, scaleX: 1, y: 0 })
    numberEls.value.forEach((el, i) => {
      if (el) el.textContent = `${targets[i]!.numeric}${targets[i]!.suffix}`
    })
    return
  }

  numberEls.value.forEach((el) => {
    if (el) el.textContent = '0'
  })

  const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 75%' } })

  if (rule) tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' })

  tl.fromTo(items, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 }, '-=0.35')

  targets.forEach((target, i) => {
    const el = numberEls.value[i]
    if (!el) return
    const proxy = { val: 0 }
    tl.to(
      proxy,
      {
        val: target.numeric,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${Math.round(proxy.val)}${target.suffix}`
        }
      },
      i === 0 ? '-=0.3' : '<0.08'
    )
  })
})
</script>

<template>
  <section ref="root" class="bg-surface border-border-subtle border-t py-24 lg:py-32">
    <Container>
      <span data-reveal="rule" class="bg-accent mb-14 block h-px w-full origin-left lg:mb-20" aria-hidden="true" />

      <div class="grid grid-cols-1 gap-14 sm:grid-cols-3 sm:gap-8">
        <div v-for="(stat, index) in studioStats" :key="stat.label" data-reveal="item">
          <p :ref="(el) => setNumberRef(el as Element | null, index)" class="text-display text-ink tabular-nums" aria-hidden="true">
            0
          </p>
          <p class="text-label text-ink-muted mt-4">{{ stat.label }}</p>
          <span class="sr-only">{{ stat.value }} {{ stat.label }}</span>
        </div>
      </div>
    </Container>
  </section>
</template>
