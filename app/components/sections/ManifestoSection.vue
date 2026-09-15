<script setup lang="ts">
import { animateManifestoSequence } from '~/animations/sections/manifesto'

const phrases = ['We create', 'brands,', 'digital experiences', 'and visual stories', 'that move people.']
const supportingStatement =
  'Every project starts with a point of view, not a template — and ends with something worth remembering.'

const pinRoot = ref<HTMLElement | null>(null)
const stickyViewport = ref<HTMLElement | null>(null)
const phraseStack = ref<HTMLElement | null>(null)
const phraseEls = ref<HTMLElement[]>([])
const supportingEl = ref<HTMLElement | null>(null)

function setPhraseRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) phraseEls.value[index] = el
}

/**
 * A kinetic phrase sequence rather than one flowing paragraph — see
 * animations/sections/manifesto.ts for the full reasoning. Template default
 * (also the entire reduced-motion/no-JS path): a normal short section, no
 * scroll runway, no sticky — phrases stacked in flow and fully visible.
 *
 * Background is a hardcoded `bg-warm`, not the theme-reactive `bg-surface`
 * token every other section uses — deliberate. This is the Hero's
 * black-to-cream "signature moment": Hero is unconditionally black
 * regardless of the site's dark/light toggle, so the section right after it
 * has to be unconditionally cream to land that cut, not near-black in dark
 * mode (which `bg-surface` would be). Safe to hardcode because this
 * component is homepage-only (checked: no other route imports it) — it
 * doesn't fight the theme system anywhere else.
 *
 * The tall scroll-runway height and the sticky positioning are applied
 * imperatively here, only on the full-motion path, rather than as a
 * reactive template class/style binding. That's deliberate, not a style
 * preference: `reduced` is always `false` during SSR (no window to read
 * `prefers-reduced-motion` from), so a real reduced-motion visitor's first
 * paint is server-rendered with the "full motion" branch â€” and Vue's
 * hydration explicitly does not patch `class`/`style` mismatches after the
 * fact (a documented performance optimization: "check-only, the DOM will
 * not be rectified"). A template binding on `reduced` would silently never
 * take effect for exactly the visitors it's meant to protect. Every other
 * section in this codebase avoids that trap the same way: reduced-motion
 * handling always lives inside this mount-only GSAP setup callback,
 * mutating the DOM directly, never in a template `:class`/`:style`.
 */
const { root } = useScrollAnimation(({ gsap, reduced }) => {
  if (reduced) return
  if (!pinRoot.value || !stickyViewport.value || !phraseStack.value || !supportingEl.value || !phraseEls.value.length) return

  gsap.set(pinRoot.value, { minHeight: '320vh' })
  gsap.set(stickyViewport.value, { position: 'sticky', top: 'var(--nav-height)' })

  animateManifestoSequence(gsap, {
    pinRoot: pinRoot.value,
    container: phraseStack.value,
    phrases: phraseEls.value,
    supporting: supportingEl.value
  })
})
</script>

<template>
  <section ref="root" class="bg-warm">
    <div ref="pinRoot" class="relative">
      <div ref="stickyViewport" class="flex min-h-screen flex-col justify-center py-24">
        <Container narrow>
          <div ref="phraseStack" class="relative">
            <p
              v-for="(phrase, index) in phrases"
              :key="phrase"
              :ref="(el) => setPhraseRef(el as Element | null, index)"
              class="text-display text-charcoal"
            >
              {{ phrase }}
            </p>
          </div>

          <p ref="supportingEl" class="text-body-lg mt-10 max-w-xl text-charcoal/60">
            {{ supportingStatement }}
          </p>
        </Container>
      </div>
    </div>
  </section>
</template>
