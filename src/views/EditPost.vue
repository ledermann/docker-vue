<template>
  <layout-basic>
    <template>
      <div slot="hero-body" class="container has-text-centered">
        <h1 class="title">
          {{ this.post.title }}
        </h1>
      </div>

      <form @submit.prevent="submit">
        <b-field label="Title" :type="fieldTypes.title" :message="fieldMessages.title">
          <b-input type="text" v-model="post.title" autofocus @keyup.native="keyup('title')"/>
        </b-field>

        <b-tabs :animated="false">
          <b-tab-item label="Content" active >
            <b-field :type="fieldTypes.content" :message="fieldMessages.content">
              <b-input type="textarea" v-model="post.content" @keyup.native="keyup('content')" />
            </b-field>
          </b-tab-item>

          <b-tab-item label="Images">
            <p>Not implemented yet...</p>
          </b-tab-item>

          <b-tab-item label="Copyright">
            <b-field :type="fieldTypes.copyright" :message="fieldMessages.copyright">
              <b-input type="textarea" v-model="post.copyright" @keyup.native="keyup('copyright')" />
            </b-field>
          </b-tab-item>
        </b-tabs>

        <div class="buttons">
          <input type="submit" value="Save" class="button is-primary is-large" />

          <router-link :to="'/posts/' + this.currentSlug" exact>
            <button class="button is-large">Cancel</button>
          </router-link>
        </div>
      </form>
    </template>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/LayoutBasic'
import objectToFormData from 'object-to-formdata'

export default {
  name: 'EditPost',

  components: {
    LayoutBasic
  },

  props: ['slug'],

  beforeRouteUpdate (to, from, next) {
    this.loadData(to.params.slug)
    next()
  },

  mounted () {
    this.loadData(this.slug)
  },

  data () {
    return {
      errors: {},
      isLoading: true,
      currentSlug: '',
      post: {}
    }
  },

  computed: {
    isSuccess () {
      return (this.errors.length === 0)
    },

    fieldTypes () {
      return {
        title: this.errors.title ? 'is-danger' : '',
        content: this.errors.content ? 'is-danger' : '',
        copyright: this.errors.copyright ? 'is-danger' : ''
      }
    },

    fieldMessages () {
      return {
        title: this.errors.title,
        content: this.errors.content,
        copyright: this.errors.copyright
      }
    }
  },

  methods: {
    loadData (slug) {
      this.isLoading = true
      this.$http.get('/posts/' + slug)
        .then(response => {
          this.post = response.data.post
          this.currentSlug = slug
          this.isLoading = false
          this.errors = {}
        })
        .catch(error => {
          this.post = null
          this.currentSlug = null
          this.isLoading = false
          this.errors.push(error)
        })
    },

    keyup (field) {
      this.errors[field] = null
    },

    submit () {
      const formData = objectToFormData(this.post, null, 'post')

      this.$http.patch(`/posts/${this.post.slug}`, formData)
        .then(response => {
          this.$router.push({ path: `/posts/${this.currentSlug}` })
        }).catch(error => {
          this.errors = error.response.data.errors
        })
    }
  }
}
</script>

<style lang="sass">
  .b-tabs .tab-content
    padding: 1rem 0
</style>
