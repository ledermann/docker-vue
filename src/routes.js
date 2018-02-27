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
    path: '/posts/:slug',
    name: 'post',
    props: true,
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
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0};
  },
  linkActiveClass: 'is-active'
});
