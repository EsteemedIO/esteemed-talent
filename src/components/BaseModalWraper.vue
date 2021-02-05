<template>
  <b-modal :ref="modalRef" hide-header hide-footer centered size="lg">
    <div>
      <header class="p-3 px-4 header">
        <div class="d-flex flex-row justify-content-between align-items-center">
          <slot name="header" :modalTitle="modalTitle"></slot>
          <div class="escape" @click="hideModal()">&#215;</div>
        </div>
      </header>
      <form class="p-5 container">
        <slot name="form"></slot>
        <slot name="button" :modalTitle="modalTitle"></slot>
      </form>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'BaseModalWrapper',
  props: {
    modalRef: {
      type: String,
      default: 'my-modal'
    },
    modalTitle: String
  },
  methods: {
    showModal: function() {
      this.$refs[this.modalRef].show()
    },
    hideModal: function() {
      this.$refs[this.modalRef].hide()
    }
  }
}
</script>
