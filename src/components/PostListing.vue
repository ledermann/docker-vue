<template>
  <b-table :hoverable="true" :data="items">
    <template slot-scope="props">
      <b-table-column label="Content">
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
      <b-table-column type="is-narrow" label="Last update">
        <b-tag type="is-dark">
          {{ props.row.updated_at | moment("from", "now") }}
        </b-tag>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostListing',

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
