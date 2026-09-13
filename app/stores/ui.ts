export const useUiStore = defineStore('ui', () => {
  const isPreloaderDone = ref(false)
  const isWebglSupported = ref(true)

  function completePreloader() {
    isPreloaderDone.value = true
  }

  function setWebglSupported(value: boolean) {
    isWebglSupported.value = value
  }

  return { isPreloaderDone, isWebglSupported, completePreloader, setWebglSupported }
})
