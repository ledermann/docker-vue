<template>
  <b-table :hoverable="true" :loading="isLoading" :data="posts">
    <template slot-scope="props">
      <b-table-column label="Content">
        <b-icon v-if="props.row.clips_count > 0"
            pack="fas"
            icon="image"
            size="is-small">
        </b-icon>
        <strong>
          <router-link :to="{ name: 'post', params: {slug: props.row.slug} }">
            {{ props.row.title }}
          </router-link>
        </strong>
        {{ props.row.content }}
      </b-table-column>

      <!-- eslint-disable-next-line -->
      <b-table-column type="is-narrow" label="Last update">
        <b-tag type="is-dark">
          <timeago :since="props.row.updated_at"></timeago>
        </b-tag>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostsIndex',

  data () {
    return {
      isLoading: true,
      posts: []
    }
  },

  mounted () {
    axios.get('https://docker-rails.georg-ledermann.de/posts.json')
      .then(response => {
        this.posts = response.data
        this.isLoading = false
      })
  }
}
</script>
