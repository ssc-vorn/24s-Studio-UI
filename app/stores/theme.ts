export const useThemeStore = defineStore('theme', () => {
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === 'dark')

  function toggle() {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }

  return { isDark, toggle }
})
