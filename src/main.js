import 'es6-promise/auto'
import '@/utils/configuration'
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css'
import VueSilentbox from 'vue-silentbox'
import VueTimeago from 'vue-timeago'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/api'

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})
Vue.use(VueSilentbox)

Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'en-US',
  locales: {
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
