import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

const state = {
  token: localStorage.getItem('user_token')
}

const getters = {
  token: state => {
    return state.token
  },

  isLoggedIn: state => {
    return !!state.token
  },

  currentUser: state => {
    return state.token && jwtDecode(state.token)
  }
}

const mutations = {
  LOGIN_USER (state, token) {
    state.token = token
  },

  LOGOUT_USER (state) {
    state.token = null
  }
}

const actions = {
  login (context, auth) {
    var formData = new FormData()
    formData.append('auth[email]', auth.email)
    formData.append('auth[password]', auth.password)

    return Vue.axios.post('/user_token', formData)
      .then(response => {
        if (auth.rememberMe) {
          localStorage.setItem('user_token', response.data.jwt)
        }

        context.commit('LOGIN_USER', response.data.jwt)
      })
  },

  logout (context) {
    localStorage.removeItem('user_token')

    context.commit('LOGOUT_USER')
  }
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions
})
