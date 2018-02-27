import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'
import App from './App.vue'
import router from './routes';
import lightbox from 'vlightbox'
import VueTimeago from 'vue-timeago'

Vue.use(VueRouter)
Vue.use(Buefy, {
  defaultIconPack: 'fas'
})
Vue.use(lightbox)

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
  locales: {
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
