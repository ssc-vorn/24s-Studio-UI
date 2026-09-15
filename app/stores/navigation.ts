export const useNavigationStore = defineStore('navigation', () => {
  const isMenuOpen = ref(false)
  const isScrolled = ref(false)
  /** True while the header is floating over a section whose background is
   * unconditionally light regardless of the site's dark/light theme (e.g.
   * the Studio Introduction's cream field) — see useHeaderLightSection. */
  const headerOnLight = ref(false)

  function openMenu() {
    isMenuOpen.value = true
  }

  function closeMenu() {
    isMenuOpen.value = false
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  function setScrolled(value: boolean) {
    isScrolled.value = value
  }

  function setHeaderOnLight(value: boolean) {
    headerOnLight.value = value
  }

  return { isMenuOpen, isScrolled, headerOnLight, openMenu, closeMenu, toggleMenu, setScrolled, setHeaderOnLight }
})
