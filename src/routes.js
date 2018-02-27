import VueRouter from 'vue-router';

import PostsIndex from './views/PostsIndex';
import PostShow from './views/PostShow';
import AboutShow from './views/AboutShow';

let routes = [
  {
    path: '/',
    name: 'posts',
    component: PostsIndex
  },

  {
    path: '/posts/:id',
    name: 'post',
    component: PostShow
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
