<template>
  <div class="p-1 p-md-3 py-4 p-md-4">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-9">
        <p class="px-3 p-md-4 h4 font-weight-bold mb-4">
          Open Positions ({{ state.jobs.jobsListShow.length }})
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <JobsFilter class="sticky-top" />
      </div>
      <div class="col-lg-9 jobs_list">
        <h1 v-if="state.loading" class="text-center">loading</h1>
        <template v-else>
          <template v-for="(item, $index) in state.jobs.jobsListShow">
            <JobsCard
              :key="$index"
              :job="item"
              :class="$index !== state.jobs.jobsListShow.length - 1 && 'mb-4'"
            />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import store from '@/store'
import JobsCard from './JobsCard'
import JobsFilter from './JobsFilter'
import { getState } from '@/use/getState'

export default {
  name: 'JobsFeedDisplay',
  components: { JobsCard, JobsFilter },
  setup(_, { root }) {
    onMounted(() => {
      store.dispatch('loadContent')
    })

    return getState(root)
  },
  created() {
    document.title = 'Esteemed - Careers'
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
