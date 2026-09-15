<script setup lang="ts">
import { NuxtLink } from '#components'

interface Props {
  as?: 'button' | 'a' | 'NuxtLink'
  href?: string
  variant?: 'solid' | 'outline' | 'ghost'
  type?: 'button' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'solid',
  type: 'button'
})

const emit = defineEmits<{ click: [MouseEvent] }>()

const el = ref<HTMLElement | { $el: HTMLElement } | null>(null)
useMagnetic(el)

// `:is="'NuxtLink'"` (a bare string) never resolves: Nuxt's component
// auto-import only rewrites literal `<NuxtLink>` tags found in a
// template, not a string buried inside a JS ternary — so at runtime Vue
// falls back to rendering an unknown native element `<nuxtlink>` with no
// `to`-to-`href` translation and no router click handling at all. Silent:
// no console warning, no visual difference, just a dead link. Importing
// the component itself from #components and binding `:is` to that
// reference (not a string) resolves it correctly.
const tag = computed(() => (props.as === 'NuxtLink' ? NuxtLink : props.as))
</script>

<template>
  <component
    :is="tag"
    ref="el"
    :href="props.as === 'a' ? href : undefined"
    :to="props.as === 'NuxtLink' ? href : undefined"
    :type="props.as === 'button' ? props.type : undefined"
    class="text-label group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 whitespace-nowrap transition-colors duration-300 will-change-transform"
    :class="[
      props.variant === 'solid'
        ? 'bg-ink text-surface hover:bg-accent hover:text-white'
        : props.variant === 'outline'
          ? 'border-ink/30 text-ink hover:border-accent hover:text-accent border'
          : 'text-ink hover:text-accent'
    ]"
    @click="emit('click', $event)"
  >
    <slot />
  </component>
</template>
