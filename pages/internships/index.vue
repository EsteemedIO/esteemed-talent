<template>
  <div class="container pb-5 mt-4">
    <h2 class="font-weigth-bolder text-center">Internships</h2>
    <template v-if="loading">
      <img
        style="margin-top: 27vh"
        class="mx-auto d-block"
        width="20%"
        src="~/assets/imgs/loading.svg"
        alt="Blue Loading Spinner"
      />
    </template>
    <template v-else>
      <InternshipFeedDisplay />
    </template>
  </div>
</template>

<script>
import InternshipFeedDisplay from '~/components/Jobs/InternshipFeedDisplay'

export default {
  name: 'Internships',
  components: { InternshipFeedDisplay },
  computed: {
    loading() {
      return this.$store.state.loading
    }
  }
}
</script>
