import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

const state = {
  token: localStorage.getItem('user_token'),
  error: null
}

const getters = {
  token: state => {
    return state.token
  },

  isLoggedIn: state => {
    return !!state.token
  },

  loginError: state => {
    return state.error
  },

  currentUser: state => {
    return state.token && jwtDecode(state.token)
  }
}

const mutations = {
  LOGIN_SUCCESS (state, token) {
    state.token = token
    state.error = null
  },

  LOGIN_FAILURE (state, error) {
    state.token = null
    state.error = error
  },

  LOGOUT (state) {
    state.token = null
    state.error = null
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
        context.commit('LOGIN_SUCCESS', response.data.jwt)
      }).catch((error) => {
        context.commit('LOGIN_FAILURE', error)
        throw error
      })
  },

  logout (context) {
    localStorage.removeItem('user_token')
    context.commit('LOGOUT')
  }
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions
})
