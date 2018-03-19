<template>
  <layout-basic>
    <template>
      <div slot="hero-body" class="container has-text-centered">
        <h1 class="title">
          New Post
        </h1>
      </div>

      <post-form :post="post" />
    </template>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/LayoutBasic'
import PostForm from '@/components/PostForm'

export default {
  name: 'NewPost',

  components: {
    LayoutBasic,
    PostForm
  },

  data () {
    return {
      post: {
        title: '',
        content: '',
        copyright: ''
      }
    }
  }
}
</script>
