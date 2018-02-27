<template>
  <div class="content">
    <h1 class="title">{{ post.title }}</h1>

    <p>
      <b-tag type="is-dark" v-if="post.updated_at">
        {{ post.updated_at | moment("from", "now") }}
      </b-tag>
    </p>

    <div v-html="post.content"></div>

    <hr />

    <div v-html="post.copyright"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostShow',

  props: ['slug'],

  data() {
    return {
      post: {}
    }
  },

  mounted() {
    axios.get('https://docker-rails.georg-ledermann.de/posts/'+this.slug+'.json').
      then(response => this.post = response.data)
  }
}
</script>
