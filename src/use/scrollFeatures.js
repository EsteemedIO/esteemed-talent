import { onMounted, onBeforeUnmount } from '@vue/composition-api'

export function scrollFeatures () {
  function fromTop () {
    const fromTop = window.scrollY
    const nav = document.getElementById('navbar')
    const navCollapse = document.getElementById('nav-collapse')
    if (
      !Array.from(nav.classList).includes('shadow-sm') &&
          fromTop > 58
    ) {
      nav.classList.add('shadow-sm')
    }
    if (
      (Array.from(nav.classList).includes('shadow-sm') && fromTop < 60)
    ) {
      nav.classList.remove('shadow-sm')
    }
    if (
      !Array.from(navCollapse.classList).includes('shadow-sm') &&
          window.outerWidth <= 991
    ) {
      navCollapse.classList.add('shadow-sm')
    }
    if (
      Array.from(navCollapse.classList).includes('shadow-sm') &&
          window.outerWidth > 991
    ) {
      navCollapse.classList.remove('shadow-sm')
    }
  }

  onMounted(function () {
    document.addEventListener('scroll', fromTop)
    document.addEventListener('resize', fromTop)
  })

  onBeforeUnmount(function () {
    document.removeEventListener('scroll', fromTop)
    document.removeEventListener('resize', fromTop)
  })
}
