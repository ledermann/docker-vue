<template>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">About the backend</p>
      </header>
      <section class="modal-card-body">
        <table class="table is-fullwidth">
          <tr>
            <th>Version</th>
            <td>{{ versions.version }}</td>
          </tr>

          <tr>
            <th>Build time</th>
            <td>{{ versions.build_time }}</td>
          </tr>

          <tr>
            <th>Ruby</th>
            <td>{{ versions.ruby }}</td>
          </tr>

          <tr>
            <th>Rubygems</th>
            <td>{{ versions.rubygems }}</td>
          </tr>

          <tr>
            <th>Rails</th>
            <td>{{ versions.rails }}</td>
          </tr>

          <tr>
            <th>PostgreSQL</th>
            <td>{{ versions.postgresql }}</td>
          </tr>

          <tr>
            <th>Elasticsearch</th>
            <td>{{ versions.elasticsearch }}</td>
          </tr>

          <tr>
            <th>memcached</th>
            <td>{{ versions.memcached }}</td>
          </tr>

          <tr>
            <th>Redis</th>
            <td>{{ versions.redis }}</td>
          </tr>
        </table>
      </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
      versions: {}
    }
  },

  mounted () {
    this.$http.get('/about')
      .then(response => {
        this.versions = response.data
      })
  }
}
</script>
