<template>
  <layout-basic>
    <div slot="hero-body" class="container has-text-centered">
      <h1 v-if="!isLoading" class="title">
        {{ post.title }}
      </h1>
    </div>

    <div slot="hero-foot" class="container">
      <div class="tabs is-boxed is-centered">
        <ul>
          <router-link tag="li" :to="'/posts/' + this.slug" exact>
            <a>Article</a>
          </router-link>

          <router-link tag="li" :to="'/posts/' + this.slug + '/audits'" class="is-active" exact>
            <a>History</a>
          </router-link>
        </ul>
      </div>
    </div>

    <b-loading :active="isLoading"></b-loading>

    <div class="content" v-if="!isLoading">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <b-table :data="audits">
            <template slot-scope="props">
              <b-table-column label="Date">
                <b-tooltip :label="props.row.created_at" position="is-left" type="is-dark">
                  <timeago :since="props.row.created_at"></timeago>
                </b-tooltip>
              </b-table-column>

              <b-table-column label="Event">
                <b-tag type="is-light">
                  {{ props.row.event }}
                </b-tag>
              </b-table-column>

              <b-table-column label="Author">
                {{ props.row.whodunnit || 'unknown' }}
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/basic'

export default {
  name: 'AuditIndex',

  components: {
    LayoutBasic
  },

  props: ['slug'],

  computed: {
    isLoading () {
      return (!this.post) || (!this.audits)
    }
  },

  data () {
    return {
      post: null,
      audits: []
    }
  },

  mounted () {
    this.$http.get('/posts/' + this.slug)
      .then(response => {
        this.post = response.data.post
      })

    this.$http.get('/posts/' + this.slug + '/audits')
      .then(response => {
        this.audits = response.data.audits
      })
  }
}
</script>
