<template>
  <layout-basic>
    <div slot="hero-body" class="container has-text-centered">
      <h1 class="title">
        Frontend for DockerRails
      </h1>
      <h2 class="subtitle">
        Built with Vue.js
      </h2>
    </div>

    <b-table :hoverable="true" :data="posts">
      <template slot-scope="props">
        <b-table-column label="Content" @click.native="onClick(props.row)">
          <b-icon v-if="props.row.clips_count > 0"
              pack="fas"
              icon="image"
              size="is-small">
          </b-icon>
          <strong>
            {{ props.row.title }}
          </strong>
          {{ props.row.content }}
        </b-table-column>

        <!-- eslint-disable-next-line -->
        <b-table-column type="is-narrow" label="Last update" @click.native="onClick(props.row)">
          <b-tag type="is-dark">
            <timeago :since="props.row.updated_at"></timeago>
          </b-tag>
        </b-table-column>
      </template>
    </b-table>

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/basic'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'PostIndex',

  components: {
    LayoutBasic,
    InfiniteLoading
  },

  methods: {
    loadNextPage () {
      this.currentPage++
      return this.$http.get('/posts?page=' + this.currentPage)
    },

    onClick (row) {
      this.$router.push({name: 'post', params: {slug: row.slug}})
    },

    infiniteHandler ($state) {
      // This method loads the first page, two
      this.loadNextPage().then(response => {
        if (response.data.length > 0) {
          this.posts.push(...response.data)
          $state.loaded()
        } else {
          $state.complete()
        };
      })
    }
  },

  data () {
    return {
      currentPage: 0,
      posts: []
    }
  }
}
</script>

<style scoped>
  .table td {
    cursor: pointer;
  }
</style>
