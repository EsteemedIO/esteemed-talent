<template>
  <div class="p-1 p-md-3 py-4 p-md-4">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-9">
        <p class="px-3 p-md-4 h4 font-weight-bold mb-4">
          Open Positions ({{ jobsListShow.length }})
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 mb-4 mb-lg-0">
        <InternshipFilter class="sticky-top" />
      </div>
      <div class="col-lg-9 jobs_list">
        <template v-if="loading">
          <img width="100%" src="~/assets/imgs/loading.svg" />
        </template>
        <template v-else>
          <template v-for="(item, $index) in jobsListShow">
            <InternshipCard
              :key="$index"
              :job="item"
              :class="$index !== jobsListShow.length - 1 && 'mb-4'"
            />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import InternshipCard from './InternshipCard'
import InternshipFilter from './InternshipFilter'

export default {
  name: 'InternshipFeedDisplay',
  components: {
    InternshipCard,
    InternshipFilter
  },
  scrollToTop: true,
  computed: {
    jobsListShow() {
      return this.$store.state.jobsListShow
    }
  },
  mounted() {
    this.$store.dispatch('loadContent')
  }
}
</script>

<style scoped>
.jobs_list::-webkit-scrollbar {
  width: 0 !important;
}

.sticky-top {
  top: 100px;
  z-index: 0;
}
</style>
