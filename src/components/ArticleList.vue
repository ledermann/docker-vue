<template>
  <div class="container">
    <b-table :data="items">
      <template slot-scope="props">
        <b-table-column field="title" label="Content">
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

        <b-table-column type="is-narrow" field="updated_at" label="Last update">
          <b-tag type="is-dark">
            {{ props.row.updated_at | moment("from", "now") }}
          </b-tag>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticleList',

  data() {
    return {
      items: [],
    }
  },

  mounted() {
    axios.get("https://docker-rails.georg-ledermann.de/posts.json").
      then(response => this.items = response.data)
  }
}
</script>
