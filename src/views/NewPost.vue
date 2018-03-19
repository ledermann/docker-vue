<template>
  <layout-basic>
    <template>
      <div slot="hero-body" class="container has-text-centered">
        <h1 class="title">
          New Post
        </h1>
      </div>

      <form @submit.prevent="submit">
        <b-field label="Title" :type="fieldTypes.title" :message="fieldMessages.title">
          <b-input type="text" v-model="post.title" autofocus @keyup.native="keyup('title')"/>
        </b-field>

        <b-tabs :animated="false">
          <b-tab-item label="Content" active >
            <b-field :type="fieldTypes.content" :message="fieldMessages.content">
              <wysiwyg v-model="post.content" @keyup.native="keyup('content')" />
            </b-field>
          </b-tab-item>

          <b-tab-item label="Images">
            <p>Not ready yet...</p>
          </b-tab-item>

          <b-tab-item label="Copyright">
            <b-field :type="fieldTypes.copyright" :message="fieldMessages.copyright">
              <wysiwyg v-model="post.copyright" @keyup.native="keyup('content')" />
            </b-field>
          </b-tab-item>
        </b-tabs>

        <input type="submit" value="Save" class="button is-primary" />
      </form>
    </template>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/LayoutBasic'
import objectToFormData from 'object-to-formdata'

export default {
  name: 'NewPost',

  components: {
    LayoutBasic
  },

  data () {
    return {
      errors: {},
      post: {
        title: '',
        content: '',
        copyright: ''
      }
    }
  },

  computed: {
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
    keyup (field) {
      this.errors[field] = null
    },

    submit () {
      const formData = objectToFormData(this.post, null, 'post')

      this.$http.post('/posts', formData)
        .then(response => {
          this.$router.push({ path: `/posts/${response.data.post.slug}` })
        }).catch(error => {
          this.errors = error.response.data.errors
        })
    }
  }
}
</script>

<style lang="sass">
  @import "~vue-wysiwyg/dist/vueWysiwyg.css"

  .b-tabs .tab-content
    padding: 1rem 0
</style>
