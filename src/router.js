import Vue from 'vue'
import Router from 'vue-router'

import PostsIndex from './views/PostsIndex'
import PostShow from './views/PostShow'
import PostAudits from './views/PostAudits'

Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/posts/:slug/audits',
      name: 'audits',
      props: true,
      component: PostAudits
    }

  ],
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  },
  linkActiveClass: 'is-active'
})
