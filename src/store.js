import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const token = localStorage.getItem('token')
const state = {
  isLoggedIn: !!token,
  token: token
}

const mutations = {
  LOGIN_USER (state, payload) {
    if (payload.rememberMe) {
      localStorage.setItem('token', payload.token)
    }

    state.isLoggedIn = true
    state.token = payload.token
  },

  LOGOUT_USER (state) {
    localStorage.removeItem('token')

    state.isLoggedIn = false
    state.token = null
  }
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations
})
