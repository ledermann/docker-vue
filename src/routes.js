import VueRouter from 'vue-router';

import PostsIndex from './views/PostsIndex';
import AboutShow from './views/AboutShow';

let routes = [
  {
    path: '/',
    name: 'posts',
    component: PostsIndex
  },

  {
    path: '/about',
    name: 'about',
    component: AboutShow
  },
];

export default new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active'
});
