<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'

const serviceList = serviceRepository.list()

/**
 * HOME / Services — sticky card stack with a title-then-detail scroll
 * narrative layered on top. Every card pins in place with pure CSS
 * position: sticky (a slightly larger top offset per card, so earlier cards
 * peek out above), compositor-friendly with no scroll-linked JS driving the
 * pin/cover motion itself. On top of that, only the card currently at the
 * front of the stack — tracked via the shared useScrollStory machinery —
 * unfolds its full detail; every other card collapses to a title-only tab,
 * so scrolling down through the stack reads as: title, then detail, then
 * collapse back to a title as the next card takes over.
 *
 * `useScrollStory`'s activeIndex defaults to 0 the instant the component
 * mounts — before the user has scrolled anywhere near this section — so
 * binding `active` straight to it would expand the first card immediately
 * on page load. `hasActivated` only flips once a stage's own ScrollTrigger
 * actually fires, so every card genuinely starts as a title-only tab and
 * only expands once the user scrolls to reach it.
 */
const hasActivated = ref(false)
const showAllForReducedMotion = ref(false)

const { root, activeIndex } = useScrollStory({
  setup: ({ gsap, root, reduced, ScrollTrigger, stages }) => {
    const heading = root.querySelector('[data-reveal="heading"]')
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: reduced ? 0.001 : 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
      )
    }

    // useScrollStory never calls onChange under reduced motion, so
    // hasActivated would stay false forever — show every card's detail
    // outright instead of leaving reduced-motion users with title-only tabs
    // they have no way to expand.
    if (reduced) {
      showAllForReducedMotion.value = true
      return
    }

    // activeIndex already defaults to 0, so the first card's own onEnter
    // never actually calls onChange — activate() treats "still index 0" as
    // a no-op — which would otherwise skip straight from "nothing shown" to
    // the *second* card's detail, with the first card never getting its
    // moment. Watch its zone directly so hasActivated flips at the real
    // scroll point a user reaches it.
    const firstStage = stages[0]
    if (firstStage) {
      ScrollTrigger.create({
        trigger: firstStage,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => {
          hasActivated.value = true
        },
        onEnterBack: () => {
          hasActivated.value = true
        }
      })
    }

    return {
      onChange: () => {
        hasActivated.value = true
      }
    }
  }
})
</script>

<template>
  <section id="services" ref="root" class="bg-surface py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span class="text-label text-accent mb-5 flex items-center gap-3">
            <span class="bg-accent h-px w-8" aria-hidden="true" />
            What We Do
          </span>
          <h2 class="text-heading text-ink">Every discipline, one studio.</h2>
        </div>
        <AnimatedLink to="/services" class="shrink-0">All Services</AnimatedLink>
      </div>

      <div class="mt-14 lg:mt-20">
        <div
          v-for="(service, index) in serviceList"
          :key="service.id"
          class="pb-3 last:pb-0"
          :class="index !== serviceList.length - 1 ? 'min-h-[18vh] lg:min-h-[24vh]' : ''"
        >
          <ServiceItem :service="service" :index="index" :active="showAllForReducedMotion || (hasActivated && activeIndex === index)" />
        </div>
      </div>
    </Container>
  </section>
</template>
