<template>
  <b-field>
    <b-autocomplete
      placeholder="Search..."
      v-model="query"
      :data="data"
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
import debounce from 'debounce'

export default {
  data () {
    return {
      data: [],
      query: '',
      selected: null
    }
  },
  methods: {
    onEnter () {
      if (this.selected) {
        this.query = null
        this.$router.push({ name: 'post', params: { slug: this.selected.slug } })
      }
    },

    getAsyncData: debounce(function () {
      this.data = []
      this.$http.get(`/posts?q=${this.query}`)
        .then(response => {
          this.data = response.data.posts
        })
        .catch((error) => {
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
