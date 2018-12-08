<template>
  <div>
    <b-loading :is-full-page="false" :active="isLoading" />

    <b-table :data="audits">
      <template slot-scope="props">
        <b-table-column label="Date">
          <b-tooltip :label="props.row.created_at" position="is-left" type="is-dark">
            <timeago :datetime="props.row.created_at" :autoUpdate=5 ></timeago>
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
</template>

<script>
export default {
  name: 'PostAudits',

  props: ['post'],

  data () {
    return {
      audits: [],
      isLoading: false
    }
  },

  mounted () {
    this.isLoading = true
    this.$http.get('/posts/' + this.post.slug + '/audits')
      .then(response => {
        this.audits = response.data.audits
        this.isLoading = false
      }).catch(error => {
        console.log(error)
        this.isLoading = false
      })
  }
}
</script>

<style lang="sass">
.b-table
  min-height: 100px
</style>
