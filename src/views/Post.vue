<template>
  <layout-basic>

    <template v-if="isSuccess">
      <div slot="hero-body" class="container has-text-centered">
        <h1 class="title">
          {{ post.title }}
        </h1>
      </div>

      <div slot="hero-foot" class="container">
        <div class="tabs is-boxed is-centered">
          <ul>
            <router-link tag="li" :to="'/posts/' + post.slug" class="is-active" exact>
              <a>Article</a>
            </router-link>

            <router-link tag="li" :to="'/posts/' + post.slug + '/audits'" exact>
              <a>History</a>
            </router-link>
          </ul>
        </div>
      </div>

      <b-loading :active="isLoading"></b-loading>

      <div class="content">
        <p>
          <b-tag type="is-dark" v-if="post.updated_at">
            <timeago :since="post.updated_at"></timeago>
          </b-tag>
        </p>

        <silentbox-group>
            <silentbox-item v-for="(clip,index) in clips" :src="clip.urlLarge" v-bind:key="index">
              <figure class="image is-128x128">
                <img :src="clip.urlThumb">
              </figure>
            </silentbox-item>
        </silentbox-group>

        <hr />

        <div v-html="post.content"></div>

        <hr />

        <div class="has-text-grey" v-html="post.copyright"></div>

        <hr />
      </div>
    </template>

    <template v-else>
      <div slot="hero-body" class="container has-text-centered">
        <h1 class="title">
          ERROR
        </h1>
      </div>

      <div class="content">
        <ul>
          <li v-for="(error,index) in errors" :key="index">
            {{ error.message }}
          </li>
        </ul>
      </div>
    </template>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/LayoutBasic'

export default {
  name: 'Post',

  components: {
    LayoutBasic
  },

  props: ['slug'],

  beforeRouteUpdate (to, from, next) {
    this.loadData(to.params.slug)
    next()
  },

  data () {
    return {
      isLoading: true,
      errors: [],
      currentSlug: '',
      post: {}
    }
  },

  mounted () {
    this.loadData(this.slug)
  },

  methods: {
    loadData (slug) {
      this.isLoading = true
      this.$http.get('/posts/' + slug)
        .then(response => {
          this.post = response.data.post
          this.currentSlug = slug
          this.isLoading = false
          this.errors = []
        })
        .catch(error => {
          this.post = null
          this.currentSlug = null
          this.isLoading = false
          this.errors.push(error)
        })
    }
  },

  computed: {
    isSuccess () {
      return (this.errors.length === 0)
    },

    clips () {
      if (this.post.clips) {
        return this.post.clips.map(clip => {
          return { urlLarge: clip.large.url, urlThumb: clip.thumbnail.url }
        })
      }
    }
  }
}
</script>

<style lang="sass">
  .image
    display: inline-block
  .content figure
    margin-left: 0
    margin-right: 0.5rem
</style>
