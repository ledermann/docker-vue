import 'es6-promise/auto'
import '@/utils/configuration'
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faPlus, faInfoCircle, faUserCircle, faSignOutAlt, faImage, faTrash, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VuePellEditor from 'vue-pell-editor'
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

Vue.use(VueTimeago)

Vue.use(VuePellEditor)

library.add(faHome, faPlus, faInfoCircle, faUserCircle, faGithub, faSignOutAlt, faImage, faTrash, faCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
