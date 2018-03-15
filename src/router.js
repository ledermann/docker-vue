import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import Posts from './views/Posts'
import Post from './views/Post'
import Audits from './views/Audits'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: Posts
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/posts/:slug',
      name: 'post',
      props: true,
      component: Post
    },

    {
      path: '/posts/:slug/audits',
      name: 'audits',
      props: true,
      component: Audits
    }

  ],
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  },
  linkActiveClass: 'is-active'
})
