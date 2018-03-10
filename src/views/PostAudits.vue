<template>
  <layout-basic>
    <b-loading :active="isLoading"></b-loading>

    <div class="tabs is-boxed is-right">
      <ul>
        <router-link tag="li" :to="'/posts/' + this.slug" exact>
          <a>Article</a>
        </router-link>

        <router-link tag="li" :to="'/posts/' + this.slug + '/audits'" class="is-active" exact>
          <a>Audits</a>
        </router-link>
      </ul>
    </div>

    <!-- <h1 class="title">{{ post.title }}</h1> -->

    <div class="content" v-if="!isLoading">
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
  name: 'PostAudits',

  components: {
    LayoutBasic
  },

  props: ['slug'],

  data () {
    return {
      isLoading: true,
      post: null,
      audits: []
    }
  },

  mounted () {
    this.$http.get('/posts/' + this.slug + '/audits.json')
      .then(response => {
        this.audits = response.data
        this.isLoading = false
      })
  }
}
</script>
