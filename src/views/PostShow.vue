<template>
  <layout-basic>
    <b-loading :active="isLoading"></b-loading>

    <div class="content" v-if="!isLoading">
      <h1 class="title">{{ post.title }}</h1>

      <p>
        <b-tag type="is-dark" v-if="post.updated_at">
          <timeago :since="post.updated_at"></timeago>
        </b-tag>
      </p>

      <lightbox :images="clips" :nav="true"></lightbox>

      <hr />

      <div v-html="post.content"></div>

      <hr />

      <div class="has-text-grey" v-html="post.copyright"></div>

      <hr />
    </div>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/basic'
import axios from 'axios'

export default {
  name: 'PostShow',

  components: {
    LayoutBasic
  },

  props: ['slug'],

  data () {
    return {
      isLoading: true,
      post: {}
    }
  },

  mounted () {
    axios.get('https://docker-rails.georg-ledermann.de/posts/' + this.slug + '.json')
      .then(response => {
        this.post = response.data
        this.isLoading = false
      })
  },

  computed: {
    clips: function () {
      if (this.post.clips) {
        return this.post.clips.map(clip => {
          return { src: clip.large.url }
        })
      }
    }
  }
}
</script>

<style lang="sass">
.vue-lightbox
  ul
    text-align: left !important
    max-width: inherit !important

  li
    margin: 0 !important

  img
    cursor: pointer
</style>
