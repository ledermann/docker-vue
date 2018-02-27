import VueRouter from 'vue-router';

import Articles from './views/Articles';
import About from './views/About';

let routes = [
  {
    path: '/',
    component: Articles
  },

  {
    path: '/about',
    component: About
  },
];

export default new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active'
});
