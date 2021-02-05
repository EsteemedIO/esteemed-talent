import * as Auth from '../auth/cognitoAuth'
import { timeout } from '../helpers'
import { oauth } from '../api'

export const auth = {
  namespaced: true,
  state: {
    authStatus: false,
    user: null,
    authError: ''
  },
  mutations: {
    SET_AUTH (state, { authStatus }) {
      state.authStatus = authStatus
    },
    SET_USER (state, { user }) {
      state.user = user
    },
    SET_AUTH_ERROR (state, { err }) {
      state.authError = err.message
    }
  },
  actions: {
    async authState ({ commit, dispatch, state }) {
      if (state.authStatus) {
        await dispatch('fetchUser')
      } else {
        commit('SET_USER', null)
      }
    },
    async signup ({ dispatch }, { user }) {
      const { email, password, firstName, lastName } = user
      try {
        return await Auth.signUp({ email, password, firstName, lastName })
      } catch (err) {
        if (err) { return dispatch('handleAuthErr', { err }) }
      }
    },
    async verify ({ dispatch }, { user }) {
      const { email, verifyCode } = user
      try {
        await Auth.verify({ email, verifyCode })
        return dispatch('login', { user })
      } catch (err) {
        if (err) { return dispatch('handleAuthErr', { err }) }
      }
    },
    async login ({ dispatch }, { user }) {
      const { email, password } = user
      try {
        await Auth.login({ email, password })
        await dispatch('fetchUser')
        return 'success'
      } catch (err) {
        if (err) { return dispatch('handleAuthErr', { err }) }
      }
    },
    async fetchUser ({ commit, dispatch }) {
      try {
        const { user, expires } = await Auth.fetchUser()
        commit('SET_USER', { user })
        commit('SET_AUTH', { authStatus: true })
        await timeout(() => dispatch('fetchUser'), expires)
      } catch (err) {
        commit('SET_USER', { user: null })
        if (err) { return dispatch('handleAuthErr', { err }) }
      }
    },
    // *********************************************** //
    async signinSlack (_, { code }) {
      try {
        const { data } = await oauth.slackToken({ code })
        console.log('data==>>', data)
        console.log('token==>>', data.authed_user.access_token)
        const user = await oauth.slackUser({ token: data.authed_user.access_token })
        console.log('user==>>', user)
      } catch (err) {
        console.log('err==>>', err)
      }
    },
    // *********************************************** //

    async logout ({ commit }) {
      await Auth.logout()
      commit('SET_USER', { user: null })
      commit('SET_AUTH', { authStatus: false })
    },
    async handleAuthErr ({ commit, dispatch }, { err }) {
      // load temporary error message for five seconds
      if (err.message) { await timeout(() => dispatch('handleAuthErr', { err: '' }), 5) }
      commit('SET_AUTH_ERROR', { err })
    }
  },
  getters: {
    getUserFullName: ({ user }) => {
      return `${user.attributes.given_name} ${user.attributes.family_name} `
    }
  }
}
