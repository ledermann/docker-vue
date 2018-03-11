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
      <h1 class="title">
        <small>Audits of</small>
        {{ post.title }}
      </h1>

      <b-table :hoverable="true" :data="audits">
        <template slot-scope="props">
          <b-table-column type="is-narrow" label="Date">
            <timeago :since="props.row.created_at"></timeago>
          </b-table-column>

          <b-table-column label="Event">
            <b-tag type="is-primary">
              {{ props.row.event }}
            </b-tag>
          </b-table-column>

          <b-table-column label="Author">
            {{ props.row.whodunnit }}
          </b-table-column>
        </template>
      </b-table>
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
    this.$http.get('/posts/' + this.slug + '.json')
      .then(response => {
        this.post = response.data
      })

    this.$http.get('/posts/' + this.slug + '/audits.json')
      .then(response => {
        this.audits = response.data
      })
  }
}
</script>
