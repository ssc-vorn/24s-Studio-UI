export const useUiStore = defineStore('ui', () => {
  const isPreloaderDone = ref(false)

  function completePreloader() {
    isPreloaderDone.value = true
  }

  return { isPreloaderDone, completePreloader }
})
