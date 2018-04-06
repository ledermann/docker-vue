<template>
  <layout-basic>
    <div slot="hero-body" class="container has-text-centered">
      <h1 class="title">
        Frontend for DockerRails
      </h1>
      <h2 class="subtitle">
        Built with Vue.js
      </h2>

      <b-tag type="is-dark">
        {{ this.totalCount }} articles
      </b-tag>
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
          <b-tag type="is-info">
            <timeago :since="props.row.updated_at" :autoUpdate="5"></timeago>
          </b-tag>
        </b-table-column>
      </template>
    </b-table>

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/LayoutBasic'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Posts',

  components: {
    LayoutBasic,
    InfiniteLoading
  },

  activated () {
    this.$http.get('/posts?page=1')
      .then(response => {
        if (this.lastEtag !== response.headers.etag) {
          this.posts = response.data.posts
          this.totalCount = response.data.meta.total_count
          this.currentPage = 1
        }
        this.lastEtag = response.headers.etag
      })
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
      // This method loads the first page, too
      this.loadNextPage().then(response => {
        this.posts.push(...response.data.posts)
        this.totalCount = response.data.meta.total_count
        $state.loaded()

        if (response.data.meta.current_page === response.data.meta.total_pages) {
          $state.complete()
        };
      })
    }
  },

  data () {
    return {
      currentPage: 0,
      totalCount: 0,
      lastEtag: null,
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
