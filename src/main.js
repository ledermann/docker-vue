import Vue from 'vue'
import VueMoment from 'vue-moment'
import VueRouter from 'vue-router'
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'
import App from './App.vue'
import router from './routes';

Vue.use(VueRouter)
Vue.use(VueMoment)
Vue.use(Buefy, {
  defaultIconPack: 'fas'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
