<template>
  <div class="p-1 p-md-3 py-4 p-md-4">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-9">
        <p class="px-3 p-md-4 h4 font-weight-bold mb-4">
          Open Positions ({{ state.jobsListShow.length }})
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 mb-4 mb-lg-0">
        <JobsFilter class="sticky-top" />
      </div>
      <div class="col-lg-9 jobs_list">
        <h1 v-if="state.loading" class="text-center">loading</h1>
        <template v-else>
          <template v-for="(item, $index) in state.jobsListShow">
            <JobsCard
              :key="$index"
              :job="item"
              :class="$index !== state.jobsListShow.length - 1 && 'mb-4'"
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
