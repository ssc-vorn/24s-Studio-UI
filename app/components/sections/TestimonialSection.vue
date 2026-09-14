<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { testimonialService } from '~/services/testimonialService'

const testimonials = testimonialService.getFeatured()
const total = testimonials.length

const activeIndex = ref(0)
const active = computed(() => testimonials[activeIndex.value])
const indexLabel = computed(() => String(activeIndex.value + 1).padStart(2, '0'))
const totalLabel = String(total).padStart(2, '0')

const reduced = useReducedMotion()

const AUTOPLAY_MS = 7000
let autoplayTimer: ReturnType<typeof setInterval> | undefined

function stopAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer)
  autoplayTimer = undefined
}

function startAutoplay() {
  stopAutoplay()
  if (reduced.value || total <= 1) return
  autoplayTimer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % total
  }, AUTOPLAY_MS)
}

function goTo(index: number) {
  activeIndex.value = (index + total) % total
  startAutoplay()
}
function next() {
  goTo(activeIndex.value + 1)
}
function prev() {
  goTo(activeIndex.value - 1)
}

function onKeydown(event: KeyboardEvent) {
  if (!root.value?.contains(document.activeElement)) return
  if (event.key === 'ArrowRight') next()
  else if (event.key === 'ArrowLeft') prev()
}

onMounted(() => {
  startAutoplay()
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  stopAutoplay()
  window.removeEventListener('keydown', onKeydown)
})

/**
 * HOME / Testimonials — editorial crossfade driven by Vue's JS transition
 * hooks on GSAP: the outgoing quote fades and lifts out, the incoming quote
 * fades and settles in from just below. Duration ~0.5s, power2 easing.
 * Reduced motion swaps instantly with no motion.
 */
function onEnter(el: Element, done: () => void) {
  if (reduced.value) {
    // BaseTransition (mode="out-in") requires `done` to resolve asynchronously —
    // calling it synchronously here races Vue's own leave/enter bookkeeping.
    nextTick(done)
    return
  }
  const { gsap } = useGsap()
  gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', onComplete: done })
}
function onLeave(el: Element, done: () => void) {
  if (reduced.value) {
    nextTick(done)
    return
  }
  const { gsap } = useGsap()
  gsap.to(el, { opacity: 0, y: -18, duration: 0.35, ease: 'power2.in', onComplete: done })
}

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const content = root.querySelector('[data-reveal="content"]')
  if (reduced) {
    gsap.set(content, { opacity: 1, y: 0 })
    return
  }
  gsap.fromTo(
    content,
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 75%' } }
  )
})
</script>

<template>
  <section
    v-if="active"
    ref="root"
    class="bg-surface py-28 lg:py-40"
    aria-roledescription="carousel"
    aria-label="Client testimonials"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @focusin="stopAutoplay"
    @focusout="startAutoplay"
  >
    <Container narrow>
      <div data-reveal="content" class="flex flex-col items-center">
        <div class="flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          <p class="text-label text-accent">Testimonials</p>
        </div>

        <div class="relative mt-14 flex min-h-[18rem] w-full items-center justify-center sm:mt-16">
          <Transition :css="false" mode="out-in" @enter="onEnter" @leave="onLeave">
            <TestimonialQuote :key="active.id" :testimonial="active" />
          </Transition>
        </div>

        <div v-if="total > 1" class="mt-14 flex items-center gap-6">
          <button
            type="button"
            class="text-ink-muted hover:text-ink flex size-11 items-center justify-center transition-colors"
            aria-label="Previous testimonial"
            @click="prev"
          >
            <ArrowLeft class="size-4" aria-hidden="true" />
          </button>

          <p class="text-caption text-ink-muted tabular-nums" aria-live="polite">
            {{ indexLabel }} / {{ totalLabel }}
          </p>

          <button
            type="button"
            class="text-ink-muted hover:text-ink flex size-11 items-center justify-center transition-colors"
            aria-label="Next testimonial"
            @click="next"
          >
            <ArrowRight class="size-4" aria-hidden="true" />
          </button>
        </div>

        <div v-if="total > 1" class="mt-4 flex items-center">
          <button
            v-for="(item, index) in testimonials"
            :key="item.id"
            type="button"
            class="flex size-9 items-center justify-center"
            :aria-label="`Go to testimonial ${index + 1}`"
            :aria-current="index === activeIndex ? 'true' : undefined"
            @click="goTo(index)"
          >
            <span
              class="block h-1.5 rounded-full transition-all duration-300"
              :class="index === activeIndex ? 'bg-accent w-6' : 'bg-border-subtle w-1.5'"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </Container>
  </section>
</template>
