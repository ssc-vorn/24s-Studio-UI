<script setup lang="ts">
import { serviceRepository } from '~/repositories/serviceRepository'
import { animateServiceRowsReveal, crossfadeServiceMedia } from '~/animations/sections/services'

const serviceList = serviceRepository.list()

const activeIndex = ref(0)
const reduced = useReducedMotion()

interface RowExposed {
  separatorEl: HTMLElement | null
  titleEl: HTMLElement | null
  metaEl: HTMLElement | null
}
const rowRefs = ref<(RowExposed | null)[]>([])
const imageEls = ref<(HTMLElement | null)[]>([])

function setRowRef(el: unknown, index: number) {
  rowRefs.value[index] = el as RowExposed | null
}

function setImageRef(el: Element | null, index: number) {
  imageEls.value[index] = el as HTMLElement | null
}

function activate(index: number) {
  if (index === activeIndex.value) return
  const previous = activeIndex.value
  activeIndex.value = index

  const { gsap } = useGsap()
  const outgoing = imageEls.value[previous]
  const incoming = imageEls.value[index]
  if (!incoming) return

  if (reduced.value) {
    if (outgoing) gsap.set(outgoing, { opacity: 0 })
    gsap.set(incoming, { opacity: 1, clipPath: 'inset(0 0 0% 0)', scale: 1 })
    return
  }

  crossfadeServiceMedia(gsap, outgoing ?? null, incoming)
}

/**
 * HOME / Services — mount — heading handled separately by <SplitText>; this
 * only owns the row-list entrance (separators + titles + metas, one
 * coordinated timeline — see animateServiceRowsReveal) and setting the
 * initial image-panel state (first service visible, rest hidden, no
 * animation — the crossfade only ever runs in response to `activate()`).
 */
const { root } = useScrollAnimation(({ gsap, root, reduced: isReduced }) => {
  const separators = rowRefs.value.map((r) => r?.separatorEl).filter((el): el is HTMLElement => !!el)
  const titles = rowRefs.value.map((r) => r?.titleEl).filter((el): el is HTMLElement => !!el)
  const metas = rowRefs.value.map((r) => r?.metaEl).filter((el): el is HTMLElement => !!el)

  const images = imageEls.value.filter((el): el is HTMLElement => !!el)
  images.forEach((img, index) => {
    gsap.set(img, { opacity: index === 0 ? 1 : 0, clipPath: 'inset(0 0 0% 0)', scale: 1 })
  })

  if (isReduced) {
    gsap.set([...separators, ...titles, ...metas], { opacity: 1, scaleX: 1, y: 0 })
    return
  }

  animateServiceRowsReveal(gsap, { separators, titles, metas }, root)
})
</script>

<template>
  <section id="services" ref="root" class="bg-surface py-28 lg:py-40">
    <Container>
      <div class="max-w-3xl">
        <SplitText as="h2" class="text-heading text-ink">Every discipline. One studio.</SplitText>
        <p class="text-body-lg text-ink-muted mt-6">
          We combine strategy, identity, digital experience, technology and motion to create work that moves people.
        </p>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-x-12 lg:mt-24 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <ServiceRow
            v-for="(service, index) in serviceList"
            :key="service.id"
            :ref="(el) => setRowRef(el, index)"
            :service="service"
            :active="activeIndex === index"
            :is-last="index === serviceList.length - 1"
            @activate="activate(index)"
          />
        </div>

        <div class="relative mt-16 hidden lg:col-span-5 lg:mt-0 lg:block">
          <div class="sticky top-32">
            <div class="relative aspect-4/5 overflow-hidden">
              <img
                v-for="(service, index) in serviceList"
                :key="service.id"
                :ref="(el) => setImageRef(el as Element | null, index)"
                :src="service.image"
                :alt="`${service.title} — representative work`"
                loading="lazy"
                class="absolute inset-0 size-full object-cover"
              >
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
