<template>
  <div class="container mt-5 mt-lg-0">
    <nuxt-link class="mb-5" to="/internships">
      <div class="hover_move">
        <BIconChevronLeft />
        <span class="ml-2">{{ !err ? 'Back' : 'Browse Open Jobs' }}</span>
      </div>
    </nuxt-link>
    <template v-if="loading">
      <img
        style="margin-top: 27vh"
        class="mx-auto d-block"
        width="20%"
        src="~/assets/imgs/loading.svg"
        alt="Blue Loading Spinner"
      />
    </template>
    <div v-else-if="err">
      <p class="h3 mt-5 text-danger text-center">
        {{ err }}
      </p>
    </div>
    <div v-else-if="focusedJob.id" class="p-3 py-4">
      <h1 class="mt-5">{{ focusedJob.title }}</h1>
      <div
        class="d-flex flex-md-row flex-column justify-content-start flex-wrap my-5"
      >
        <div
          v-if="focusedJob.address"
          class="job_badge p-2 mt-md-0 mt-2 mr-4 mr-md-2 mr-auto"
        >
          {{ focusedJob.address }}
        </div>
        <div
          v-if="focusedJob.employmentType"
          class="job_badge p-2 mt-md-0 mt-2 mr-4 mr-md-2 mr-auto"
        >
          {{ focusedJob.employmentType }}
        </div>

        <div
          v-if="dateFormated"
          class="job_badge p-2 mt-md-0 mt-2 mr-4 mr-md-2 mr-auto"
        >
          {{ dateFormated }}
        </div>
      </div>
      <div v-html="focusedJob.description"></div>
      <div class="d-flex flex-md-row flex-column flex-wrap job_btn mt-5">
        <div class="mr-5 mr-md-2">
          <BaseButton class="btn btn-primary" @click="showModal('jobModal')">
            APPLY NOW
          </BaseButton>
        </div>
        <!-- <div class="mr-5 my-2 my-md-0 mr-md-2">
          <BaseButton class="btn btn_transparent">SHARE NOW</BaseButton>
        </div> -->
        <div class="mr-5 mr-md-2">
          <BaseButton class="btn btn_transparent" @click="print">
            PRINT
          </BaseButton>
        </div>
      </div>
    </div>

    <BaseModalWraper
      ref="jobModal"
      modal-ref="jobModal"
      hide-header
      hide-footer
      centered
      content-class="job_modal"
      body-class="job_modal small_screen_modal"
      dialog-class="small_screen_modal"
    >
      <template #header>
        <div>
          <h2>
            {{
              focusedJob.title.length > 27
                ? focusedJob.title.substr(0, 25) + '...'
                : focusedJob.title
            }}
          </h2>
          <p>
            {{ focusedJob.address && focusedJob.address + ' |' }}
            {{ focusedJob.employmentType }}
          </p>
        </div>
      </template>
      <template #form>
        <ul v-if="!success" class="form_list mx-5">
          <template v-for="(item, $index) in formFields">
            <div :key="$index" class="mb-4">
              <BaseInput
                :key="$index"
                v-model="applicant[item.ref]"
                :label="item.label"
                :type="item.type"
                class="form-group mb-n1"
              />
              <small v-if="item.ref !== 'phone'" class="text-danger">
                {{ item.label }} is required
              </small>
            </div>
          </template>
          <li class="form-group mt-5">
            <label for="resume">UPLOAD RESUME</label>
            <input
              ref="resume"
              type="file"
              class="file_upload w-100 p-4 text-center"
              accept=".html,.txt.doc,.docx,.pdf,.rtf,.odt"
              @change="handleFileUpload()"
            />
            <small
              >Accepted Resume types are html,text,txt,pdf,doc,docx,rtf,odt
            </small>
          </li>
        </ul>
        <h5 v-else style="color: #009480">{{ success }}</h5>
      </template>
      <template #button>
        <footer class="flex-md-row mx-5">
          <BaseButton
            v-if="!success"
            class="btn btn-primary d-block w-100 mt-5 mx-auto modal_btn"
            @click.prevent="submitApplication(applicant)"
          >
            <div>APPLY</div>
          </BaseButton>
          <div v-if="error">
            <small class="text-danger">{{ error }}</small>
          </div>
        </footer>
      </template>
    </BaseModalWraper>
  </div>
</template>

<script>
import { BIconChevronLeft } from 'bootstrap-vue'
import { convertText, convertDate, timeout } from '~/helpers'
import { jobs } from '~/api'

export default {
  name: 'Job',
  components: {
    BIconChevronLeft
  },
  async asyncData({ params, payload }) {
    if (payload) {
      console.log('payload.id==>>', payload.id)
      return { focusedJob: payload }
    } else {
      const { data } = await jobs.get()
      const focusedJob = data.find(({ id }) => id === parseInt(params.id))
      return { focusedJob }
    }
  },
  data() {
    return {
      formFields: [
        {
          ref: 'firstName',
          label: 'FIRST NAME',
          type: 'text'
        },
        {
          ref: 'lastName',
          label: 'LAST NAME',
          type: 'text'
        },
        {
          ref: 'email',
          label: 'EMAIL',
          type: 'email'
        },
        {
          ref: 'phone',
          label: 'MOBILE PHONE',
          type: 'phone'
        }
      ],
      applicant: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        resume: ''
      },
      resume: null,
      loading: true,
      error: '',
      success: ''
    }
  },
  head() {
    return {
      title: this.focusedJob.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: convertText(this.focusedJob.description, true)
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.focusedJob.title + ' | Esteemed.io'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: convertText(this.focusedJob.description, true)
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          property: 'twitter:description',
          content: convertText(this.focusedJob.description, true)
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          property: 'twitter:title',
          content: this.focusedJob.title + ' | Esteemed.io'
        }
      ]
    }
  },
  computed: {
    convertedText() {
      const text = this.focusedJob.description
      return convertText(text)
    },
    dateFormated() {
      return convertDate(this.focusedJob.startDate, 'MMM dd, yyyy')
    },
    err() {
      return this.$store.state.error
    }
  },
  async mounted() {
    await this.$store.dispatch('getJob', {
      id: parseInt(this.$route.params.id)
    })
    this.loading = false
  },
  methods: {
    showModal(type) {
      if (Array.isArray(this.$refs[type])) {
        this.$refs[type][0].showModal()
      } else {
        this.$refs[type].showModal()
      }
    },
    hideModal(type) {
      if (Array.isArray(this.$refs[type])) {
        this.$refs[type][0].hideModal()
      } else {
        this.$refs[type].hideModal()
      }
    },
    async submitApplication(applicant) {
      const { firstName, lastName, email } = this.applicant
      if (!firstName || !lastName || !email)
        return (this.error = 'Missing Required Fields')
      if (this.resume.resume === null)
        return (this.error = 'No Resume Attached')

      const msg = await this.$store.dispatch('submitApplication', {
        applicant: this.applicant,
        job: this.$store.state.focusedJob,
        resume: this.resume
      })

      if (msg) {
        this.success = msg
        await timeout(() => this.hideModal('jobModal'), 3)
        // second timeout avoids showing fields as modal closes
        await timeout(() => (this.success = ''), 3.5)
      }
    },
    handleFileUpload() {
      const formData = new FormData()
      formData.append('file', this.$refs.resume.files[0])
      this.resume = formData
    },
    print() {
      this.window.print()
    }
  }
}
</script>

<style scoped>
small {
  cursor: default;
}
.btn_transparent {
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.file_upload {
  border: 1px dashed black;
}

.form_list {
  list-style-type: none !important;
}

>>> ul {
  margin-top: 1rem;
  padding-left: 2rem;
}
</style>
