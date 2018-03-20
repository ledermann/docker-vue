import Vue from 'vue'
import Router from 'vue-router'

import Posts from '@/views/Posts'
import Post from '@/views/Post'
import Audits from '@/views/Audits'
import About from '@/views/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: Posts
    },

    {
      path: '/about',
      name: 'about',
      component: About
    },

    {
      path: '/posts/new',
      name: 'newPost',
      props: { slug: null },
      component: Post
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
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  },
  linkActiveClass: 'is-active'
})
