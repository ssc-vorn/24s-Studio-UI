<script setup lang="ts">
import { pageEnter, pageLeave } from '~/animations/core/transitions'

const reduced = useReducedMotion()

function onLeave(el: Element, done: () => void) {
  if (reduced.value) {
    done()
    return
  }
  const { gsap } = useGsap()
  pageLeave(gsap, el, done)
}

function onEnter(el: Element, done: () => void) {
  if (reduced.value) {
    done()
    return
  }
  const { gsap } = useGsap()
  pageEnter(gsap, el, done)
}
</script>

<template>
  <NuxtPage :transition="{ mode: 'out-in', css: false, onLeave, onEnter }" />
</template>
