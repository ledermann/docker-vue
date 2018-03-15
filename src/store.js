import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

const storedToken = localStorage.getItem('token')
const state = {
  isLoggedIn: !!storedToken,
  token: storedToken,
  currentUser: storedToken && jwtDecode(storedToken)
}

const mutations = {
  LOGIN_USER (state, payload) {
    state.isLoggedIn = true
    state.token = payload.token
    state.currentUser = jwtDecode(payload.token)
  },

  LOGOUT_USER (state) {
    state.isLoggedIn = false
    state.token = null
    state.currentUser = null
  }
}

const actions = {
  login (context, payload) {
    if (payload.rememberMe) {
      localStorage.setItem('token', payload.token)
    }

    context.commit('LOGIN_USER', payload)
  },

  logout (context) {
    localStorage.removeItem('token')

    context.commit('LOGOUT_USER')
  }
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions
})
