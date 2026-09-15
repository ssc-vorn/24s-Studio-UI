<script setup lang="ts">
import { animateManifestoSequence } from '~/animations/sections/manifesto'

const phrases = ['We are a', 'digital creative studio', 'building brands', 'with purpose.']
const supportingStatement =
  'Every project starts with a point of view, not a template — and ends with something worth remembering.'

const pinRoot = ref<HTMLElement | null>(null)
const stickyViewport = ref<HTMLElement | null>(null)
const phraseStack = ref<HTMLElement | null>(null)
const phraseEls = ref<HTMLElement[]>([])
const supportingEl = ref<HTMLElement | null>(null)
const visualEl = ref<HTMLElement | null>(null)

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
 * doesn't fight the theme system anywhere else. `useHeaderLightSection`
 * tells the floating header to swap to its dark-logo treatment for as long
 * as this section — the one unconditionally light field on the page — is
 * behind it.
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
  if (visualEl.value) {
    gsap.fromTo(
      visualEl.value,
      { clipPath: 'inset(0 0 100% 0)', scale: 1.08 },
      {
        clipPath: 'inset(0 0 0% 0)',
        scale: 1,
        duration: reduced ? 0.001 : 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: visualEl.value, start: 'top 75%' }
      }
    )
  }

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

useHeaderLightSection(root)
</script>

<template>
  <section ref="root" class="bg-warm">
    <div ref="pinRoot" class="relative">
      <div ref="stickyViewport" class="flex min-h-screen flex-col justify-center py-24 lg:py-0">
        <Container class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <!-- Asymmetric split — the statement leads on the wider column,
               a quiet secondary visual anchors the narrower one. Deliberately
               not the Hero's full-bleed-image-behind-text composition: this
               is the page's one editorial-magazine moment, image as a
               considered accent rather than a backdrop. -->
          <div class="lg:col-span-8">
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
          </div>

          <div class="hidden lg:col-span-4 lg:block">
            <div ref="visualEl" class="border-charcoal/10 aspect-3/4 overflow-hidden border">
              <img
                src="https://picsum.photos/900/1200?random=812"
                alt="A detail from the studio's own material and texture library"
                loading="lazy"
                class="size-full object-cover grayscale-[20%]"
              >
            </div>
          </div>
        </Container>
      </div>
    </div>
  </section>
</template>
