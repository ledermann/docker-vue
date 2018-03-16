<template>
  <b-field>
    <b-autocomplete
      placeholder="Search..."
      v-model="query"
      :data="data"
      :loading="isFetching"
      @select="option => selected = option"
      @input="getAsyncData"
      @keyup.enter.native="onEnter">

      <template slot-scope="props">
        <strong v-html="props.option.title"></strong>
        <br>
        <small v-html="props.option.content"></small>
      </template>
    </b-autocomplete>
  </b-field>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  data () {
    return {
      data: [],
      query: '',
      selected: null,
      isFetching: false
    }
  },
  methods: {
    onEnter () {
      if (this.selected) {
        this.query = null
        this.$router.push({ path: `/posts/${this.selected.slug}` })
      }
    },
    getAsyncData: debounce(() => {
      this.data = []
      this.isFetching = true
      this.$http.get(`/posts?q=${this.query}`)
        .then(response => {
          this.data = response.data.posts
          this.isFetching = false
        })
        .catch((error) => {
          this.isFetching = false
          throw error
        })
    }, 300)
  }
}
</script>

<style>
  em {
    font-weight: bold;
    font-style: normal;
  }
</style>
