import Vue from 'vue'
import Router from 'vue-router'
import MatomoTracker from '@/utils/matomo-tracker'

import Posts from '@/pages/Posts'
import Post from '@/pages/Post'
import About from '@/pages/About'

Vue.use(Router)

const router = new Router({
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
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  linkActiveClass: 'is-active'
})

const matomo = new MatomoTracker()

router.beforeEach((to, from, next) => {
  matomo.trackPageView()
  next()
})

export default router
