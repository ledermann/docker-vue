import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoggedIn: !!localStorage.getItem('token')
}

const mutations = {
  LOGIN_USER (state) {
    state.isLoggedIn = true
  },

  LOGOUT_USER (state) {
    state.isLoggedIn = false
  }
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations
})
