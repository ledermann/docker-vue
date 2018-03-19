<template>
  <layout-basic>
    <template>
      <div slot="hero-body" class="container has-text-centered">
        <h1 class="title">
          {{ this.post.title }}
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
  name: 'EditPost',

  components: {
    LayoutBasic,
    PostForm
  },

  props: ['slug'],

  beforeRouteUpdate (to, from, next) {
    this.loadData(to.params.slug)
    next()
  },

  mounted () {
    this.loadData(this.slug)
  },

  data () {
    return {
      isLoading: true,
      post: {}
    }
  },

  computed: {
    isSuccess () {
      return (this.errors.length === 0)
    }
  },

  methods: {
    loadData (slug) {
      this.isLoading = true
      this.$http.get('/posts/' + slug)
        .then(response => {
          this.post = response.data.post
          this.isLoading = false
          this.errors = {}
        })
        .catch(error => {
          this.post = null
          this.isLoading = false
          this.errors.push(error)
        })
    }
  }
}
</script>
