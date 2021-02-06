import { onMounted } from '@vue/composition-api'

export function scrollFeatures () {
  function fromTop () {
    const fromTop = window.scrollY
    const nav = document.getElementById('navbar')
    if (
      !Array.from(nav.classList).includes('shadow-sm') &&
          fromTop > 58 &&
          window.outerWidth > 991
    ) {
      nav.classList.add('shadow-sm')
    }
    if (
      (Array.from(nav.classList).includes('shadow-sm') && fromTop < 60) ||
          window.outerWidth < 991
    ) {
      nav.classList.remove('shadow-sm')
    }
  }

  onMounted(function () {
    document.addEventListener('scroll', fromTop)
  })
}
