export function useModal () {
  function showModal (type) {
    if (Array.isArray(this.$refs[type])) {
      this.$refs[type][0].showModal()
    } else {
      this.$refs[type].showModal()
    }
  }

  function hideModal (type) {
    if (Array.isArray(this.$refs[type])) {
      this.$refs[type][0].hideModal()
    } else {
      this.$refs[type].hideModal()
    }
  }

  return { showModal, hideModal }
}
