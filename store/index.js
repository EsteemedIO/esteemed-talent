import Vue from 'vue'
import Vuex from 'vuex'
import * as Api from '~/api'
import VueGtm from '@gtm-support/vue2-gtm'

import { timeout, getListOptions } from '~/helpers'

Vue.use(Vuex)
Vue.use(VueGtm, {
  id: 'GTM-WHGM9PZ'
})

export const state = () => ({
  jobsList: [],
  jobsListShow: [],
  internshipList: [],
  internshipListShow: [],
  loading: true,
  error: ''
})
export const mutations = {
  SET_LOADING (state, { loading }) {
    state.loading = loading
  },
  SET_JOB_FOCUS (state, { job }) {
    state.focusedJob = job
  },
  SET_JOBS (state, { jobs }) {
    state.jobsList = jobs
  },
  SET_JOBS_SHOW (state, { jobs }) {
    state.jobsListShow = jobs
  },
  SET_INTERNSHIP (state, { jobs }) {
    state.internshipsList = jobs
  },
  SET_INTERNSHIP_SHOW (state, { jobs }) {
    state.internshipsListShow = jobs
  },
  SET_ERROR (state, { err }) {
    state.error = err.message
  }
}
export const actions = {
  async loadContent ({ commit, dispatch, state, rootState }) {
    if (state.error) commit('SET_ERROR', { err: '' })
    try {
      await dispatch('getJobs')
      dispatch('loading', false)
    } catch (err) {
      commit('SET_ERROR', { err })
    }
  },
  loading ({ commit }, loading) {
    commit('SET_LOADING', { loading })
  },
  async handleErr ({ commit, dispatch }, { err }) {
    if (err.message) {
      await timeout(() => dispatch('handleErr', { err: '' }), 5)
    }
    commit('SET_ERROR', { err })
  },
  // ======================== Jobs Actions ======================== //
  async getJobs ({ commit, state }) {
    const { data } = await Api.jobs.get()
    commit('SET_JOBS', { jobs: data })
    commit('SET_JOBS_SHOW', { jobs: state.jobsList })
    commit('SET_INTERNSHIP', { jobs: state.jobsList.filter(job => job.employmentType == 'Internship') })
    commit('SET_INTERNSHIP_SHOW', { jobs: state.internshipList })
  },
  async getJob ({ dispatch, commit, state }, { id }) {
    if (!state.jobsList.length) {
      await dispatch('getJobs')
    }
    const job = state.jobsList.find(item => item.id === id)
    if (state.error) await commit('SET_ERROR', { err: { message: '' } })
    if (!job) {
      return await commit('SET_ERROR', {
        err: { message: 'Job does not exist, or is no longer active' }
      })
    }
    commit('SET_JOB_FOCUS', { job })
    return job
  },

  filterJobs ({ state, commit }, { selected }) {
    const search = Object.keys(selected).reduce((acc, cur) => {
      if (selected[cur] !== 'Any') {
        acc.push(selected[cur].toLocaleLowerCase())
      }
      return acc
    }, [])
    if (search.length) {
      const filteredJobs = state.jobsList.filter(job => {
        const values = Object.values(job).join(' ').toLocaleLowerCase()
        const searchRes = search.every(item => values.includes(item))
        return searchRes
      })
      commit('SET_JOBS_SHOW', { jobs: filteredJobs })
    } else {
      commit('SET_JOBS_SHOW', { jobs: state.jobsList })
    }
  },
  async submitApplication (_, { applicant, job, resume }) {
    try {
      await Api.jobs.postApplicant({ applicant, job })
      await Api.jobs.postResume({ resume })
      return 'Application submitted successfully!'
    } catch (err) {
      return 'Error uploading application'
    }
  }
}

export const getters = {
  getChoicesList ({ jobsListShow, jobsList }) {
    return [
      {
        options: [
          'Any',
          ...getListOptions(jobsList, 'address', 'state').map(address =>
            address.split(',')[1] ? address.split(',')[1] : address
          )
        ],
        title: 'State',
        ref: 'address'
      },
      {
        options: [
          'Any',
          ...getListOptions(jobsListShow, 'address')
            .filter(address => address.split(',')[1])
            .map(address => address.split(',')[0])
        ],
        title: 'City',
        ref: 'addressCity'
      },
      {
        options: ['Any', ...getListOptions(jobsList, 'employmentType')],
        title: 'Employment Type',
        ref: 'employmentType'
      }
    ]
  }
}
