import Vue from 'vue'
import Router from 'vue-router'

import LoginNew from './views/Login/New'
import PostIndex from './views/Post/Index'
import PostShow from './views/Post/Show'
import AuditIndex from './views/Audit/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostIndex
    },

    {
      path: '/login',
      name: 'login',
      component: LoginNew
    },

    {
      path: '/posts/:slug',
      name: 'post',
      props: true,
      component: PostShow
    },

    {
      path: '/posts/:slug/audits',
      name: 'audits',
      props: true,
      component: AuditIndex
    }

  ],
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  },
  linkActiveClass: 'is-active'
})
