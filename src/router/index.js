import Vue from 'vue'
import Router from 'vue-router'

import Posts from '@/views/Posts'
import Post from '@/views/Post'
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
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  },
  linkActiveClass: 'is-active'
})
