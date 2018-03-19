import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import store from '@/store'

axios.defaults.baseURL =
  process.env.API_URL || process.env.NODE_ENV === 'production'
    ? 'https://docker-rails.georg-ledermann.de/api/v1'
    : 'https://docker-rails.dev/api/v1'

axios.interceptors.request.use((config) => {
  if (store.getters.isLoggedIn) {
    // Set JWT before request is sent
    config.headers.common['Authorization'] = 'Bearer ' + store.getters.token
  }
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
