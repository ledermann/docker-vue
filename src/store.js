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
  LOGIN_USER (state, token) {
    state.isLoggedIn = true
    state.token = token
    state.currentUser = jwtDecode(token)
  },

  LOGOUT_USER (state) {
    state.isLoggedIn = false
    state.token = null
    state.currentUser = null
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
          localStorage.setItem('token', response.data.jwt)
        }

        context.commit('LOGIN_USER', response.data.jwt)
      })
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
