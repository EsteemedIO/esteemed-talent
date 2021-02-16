<template>
  <div class="job_card bg-white mx-0 mx-md-2 p-3" @click="viewJob()">
    <div class="mb-2 w-100">
      <div class="d-flex flex-row justify-content-between flex-wrap mb-2">
        <a class="job_title h4 pt-1">{{ job.title }}</a>
        <div
          class="d-flex flex-row justify-content-start justify-content-md-end flex-wrap"
        >
          <div
            v-if="job.address"
            class="job_badge p-2 mt-md-0 mt-2 mr-4 mr-md-2"
          >
            {{ job.address }}
          </div>
          <div class="job_badge p-2 mt-md-0 mt-2 mr-4 mr-md-2">
            {{ job.employmentType }}
          </div>
          <div class="job_badge p-2 mt-md-0 mt-2 mr-4 mr-md-2">
            {{ dateFormated }}
          </div>
        </div>
      </div>
      <!-- <p class="font-weight-bolder h5">{{ job.publishedCategory.name }}</p> -->

      <!-- <p class="small my-1">Duration: {{ job.durationWeeks }} weeks</p> -->
      <div class="mt-4 bold job_description" v-html="shortDescription"></div>
    </div>
  </div>
</template>

<script>
import { convertText, convertDate } from '@/helpers'

export default {
  name: 'JobsCard',
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  computed: {
    dateFormated() {
      return convertDate(this.job.startDate, 'MMM dd, yyyy')
    },
    shortDescription() {
      const text = this.job.description
      return convertText(text)
    }
  },
  methods: {
    viewJob() {
      const id = this.job.id
      this.$store.dispatch('jobs/getJob', { id })
      this.$router.push('/jobs/' + id)
    }
  }
}
</script>

<style scoped>
.job_description {
  overflow: hidden;
  line-height: 28.8px;
  font-size: 1rem;
}
.job_card {
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.3s;
}

.job_card:hover {
  transform: scale(1.002);
  box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.1);
}

.job_card:active {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  transform: scale(0.999);
}

.job_title {
  color: #4a89dc;
}

.job_title:hover {
  color: #3a6ec5;
}

.job_badge {
  color: #0b344f;
  margin-right: 5px;
  background-color: #f4f4f4;
  border-radius: 8px;
  align-self: center;
}
</style>
