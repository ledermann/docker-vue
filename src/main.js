import Vue from 'vue'

import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'

import App from './App.vue'

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
