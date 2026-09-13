export const useNavigationStore = defineStore('navigation', () => {
  const isMenuOpen = ref(false)
  const isScrolled = ref(false)

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

  return { isMenuOpen, isScrolled, openMenu, closeMenu, toggleMenu, setScrolled }
})
