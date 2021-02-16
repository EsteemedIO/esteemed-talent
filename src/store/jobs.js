import * as Api from '../api'
import { getListOptions } from '@/helpers'

export const jobs = {
  namespaced: true,
  state: {
    jobsList: [],
    jobsListShow: [],
    focusedJob: {}
  },
  mutations: {
    SET_JOB_FOCUS (state, { job }) {
      state.focusedJob = job
    },
    SET_JOBS (state, { jobs }) {
      state.jobsList = jobs
    },
    SET_JOBS_SHOW (state, { jobs }) {
      state.jobsListShow = jobs
    }
  },
  actions: {
    async getJobs ({ commit, state }) {
      const { data } = await Api.jobs.get()
      commit('SET_JOBS', { jobs: data })
      commit('SET_JOBS_SHOW', { jobs: state.jobsList })
    },
    async getJob ({ dispatch, commit, state }, { id }) {
      if (!state.jobsList.length) {
        await dispatch('getJobs')
      }
      const job = state.jobsList.find(item => item.id === id)
      if (!job) return commit('SET_JOB_FOCUS', { })
      commit('SET_JOB_FOCUS', { job })
    },
    async submitApplication (_, { applicant, job, resume }) {
      await Api.jobs.postApplicant({ applicant, job })
      await Api.jobs.postResume({ resume })
    },
    async filterJobs ({ state, commit }, { selected }) {
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
    }
  },
  getters: {
    getChoicesList ({ jobsListShow, jobsList }) {
      return [
        {
          options: ['Any', ...getListOptions(jobsList, 'address', 'state').map(address => address.split(',')[1] ? address.split(',')[1] : address)],
          title: 'State',
          ref: 'address'
        },
        {
          options: ['Any', ...getListOptions(jobsListShow, 'address').filter(address => address.split(',')[1]).map(address => address.split(',')[0])],
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
}
