<template>
  <div>
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

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import axios from 'axios'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'PostsIndex',

  components: {
    InfiniteLoading
  },

  methods: {
    loadNextPage () {
      this.currentPage++
      return axios.get('https://docker-rails.georg-ledermann.de/posts.json?page=' + this.currentPage)
    },

    infiniteHandler ($state) {
      // This method loads the first page, two
      this.loadNextPage().then(response => {
        if (response.data.length > 0) {
          this.posts.push(...response.data)
          $state.loaded()
          this.isLoading = false
        } else {
          $state.complete()
        };
      })
    }
  },

  data () {
    return {
      isLoading: true,
      currentPage: 0,
      posts: []
    }
  }
}
</script>
