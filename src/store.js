import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

const token = localStorage.getItem('token')
const state = {
  isLoggedIn: !!token,
  token: token,
  currentUser: token && jwtDecode(token)
}

const mutations = {
  LOGIN_USER (state, payload) {
    if (payload.rememberMe) {
      localStorage.setItem('token', payload.token)
    }

    state.isLoggedIn = true
    state.token = payload.token
    state.currentUser = jwtDecode(payload.token)
  },

  LOGOUT_USER (state) {
    localStorage.removeItem('token')

    state.isLoggedIn = false
    state.token = null
    state.currentUser = null
  }
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations
})
