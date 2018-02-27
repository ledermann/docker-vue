import VueRouter from 'vue-router';

import PostsIndex from './views/PostsIndex';
import AboutShow from './views/AboutShow';

let routes = [
  {
    path: '/',
    component: PostsIndex
  },

  {
    path: '/about',
    component: AboutShow
  },
];

export default new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active'
});
