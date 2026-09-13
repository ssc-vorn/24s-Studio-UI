export const useNavigationStore = defineStore('navigation', () => {
  const isMobileMenuOpen = ref(false)
  const activeSection = ref<string>('hero')
  const isScrolled = ref(false)

  function openMobileMenu() {
    isMobileMenuOpen.value = true
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function setActiveSection(id: string) {
    activeSection.value = id
  }

  function setScrolled(value: boolean) {
    isScrolled.value = value
  }

  return {
    isMobileMenuOpen,
    activeSection,
    isScrolled,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
    setActiveSection,
    setScrolled
  }
})
