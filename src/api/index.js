import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import store from '@/store'
import ActionCable from 'actioncable'
import Configuration from '@/utils/configuration'

axios.defaults.baseURL = 'https://' + Configuration.value('backendHost') + '/api/v1'

axios.interceptors.request.use((config) => {
  if (store.getters.currentUser) {
    // Set JWT before request is sent
    config.headers.common['Authorization'] = 'Bearer ' + store.getters.token
  }
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)

Vue.prototype.$cable = ActionCable.createConsumer(
  'wss://' + Configuration.value('backendHost').replace(/.*?:\/\//g, '') + '/cable'
)
