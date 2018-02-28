<template>
  <div class="content">
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
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostShow',

  props: ['slug'],

  data () {
    return {
      post: {}
    }
  },

  mounted () {
    axios.get('https://docker-rails.georg-ledermann.de/posts/' + this.slug + '.json')
      .then(response => { this.post = response.data })
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

<style>
.vue-lightbox ul {
  text-align: left !important;
  max-width: inherit !important;
}

.vue-lightbox li {
  margin: 0 !important;
}

.vue-lightbox img {
  cursor: pointer;
}
</style>
