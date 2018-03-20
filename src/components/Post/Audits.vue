<template>
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
</template>

<script>
export default {
  name: 'PostAudits',

  props: ['post'],

  data () {
    return {
      audits: []
    }
  },

  mounted () {
    this.$http.get('/posts/' + this.post.slug + '/audits')
      .then(response => {
        this.audits = response.data.audits
      })
  }
}
</script>
