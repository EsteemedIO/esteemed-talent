import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as Api from '../api'

import { auth } from './auth'
import { jobs } from './jobs'

import { timeout } from '../helpers'

Vue.use(Vuex)

const loadVuexPlugs = () =>
  [new VuexPersistence().plugin]

export default new Vuex.Store({
  state: {
    talentList: [],
    focusedTalent: {},
    loading: true,
    error: ''
  },
  mutations: {
    SET_LOADING (state, { loading }) {
      state.loading = loading
    },
    SET_TALENT (state, { talent }) {
      state.talentList = talent
    },
    SET_TALENT_FOCUS (state, { talent }) {
      state.focusedTalent = talent
    },
    SET_ERROR (state, { err }) {
      state.error = err.message
    }
  },
  actions: {
    async loadContent ({ commit, dispatch, state, rootState }) {
      if (state.error) commit('SET_ERROR', { err: '' })
      if (rootState.auth.authStatus && !rootState.auth.user) dispatch('auth/logout', null, { root: true })
      try {
        await dispatch('getTalent')
        await dispatch('jobs/getJobs', null, { root: true })
        dispatch('loading', false)
      } catch (err) {
        commit('SET_ERROR', { err: err })
      }
    },
    loading ({ commit }, loading) {
      commit('SET_LOADING', { loading })
    },
    async handleErr ({ commit, dispatch }, { err }) {
      if (err.message) { await timeout(() => dispatch('handleErr', { err: '' }), 5) }
      commit('SET_ERROR', { err })
    },
    // ======================== Talent Actions ======================== //
    async getTalent ({ commit }) {
      const { data } = await Api.talent.get()
      commit('SET_TALENT', { talent: data })
    },
    getIndividualTalent ({ commit, state }, { id }) {
      const talent = state.talentList.find(item => item.id === id)
      commit('SET_TALENT_FOCUS', { talent })
    }
  },
  getters: {},
  modules: {
    auth,
    jobs
  },
  plugins: loadVuexPlugs()
})
