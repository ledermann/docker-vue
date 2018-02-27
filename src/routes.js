import VueRouter from 'vue-router';

import Posts from './views/Posts';
import About from './views/About';

let routes = [
  {
    path: '/',
    component: Posts
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
