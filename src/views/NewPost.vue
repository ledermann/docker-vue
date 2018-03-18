<template>
  <layout-basic>
    <template>
      <div slot="hero-body" class="container has-text-centered">
        <h1 class="title">
          New Post
        </h1>
      </div>

      <form @submit.prevent="submit">
        <b-field label="Title" :type="types.title" :message="messages.title">
          <b-input type="text" v-model="post.title" autofocus @keyup.native="keyup('title')"/>
        </b-field>

        <b-tabs :animated="false">
          <b-tab-item label="Content" active >
            <b-field :type="types.content" :message="messages.content">
              <b-input type="textarea" v-model="post.content" @keyup.native="keyup('content')" />
            </b-field>
          </b-tab-item>

          <b-tab-item label="Images">
            <p>Not ready yet...</p>
          </b-tab-item>

          <b-tab-item label="Copyright">
            <b-field :type="types.copyright" :message="messages.copyright">
              <b-input type="textarea" v-model="post.copyright" @keyup.native="keyup('copyright')" />
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
      post: {}
    }
  },

  computed: {
    types () {
      return {
        title: this.errors.title ? 'is-danger' : '',
        content: this.errors.content ? 'is-danger' : '',
        copyright: this.errors.copyright ? 'is-danger' : ''
      }
    },

    messages () {
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
      console.log(this.post)
      const formData = objectToFormData(this.post, null, 'post')

      this.$http.post('/posts', formData)
        .then(response => {
          this.post = {}
          this.errors = {}
          this.$router.push({ path: `/posts/${response.data.post.slug}` })
        }).catch(error => {
          this.errors = error.response.data.errors || {}
        })
    }
  }
}
</script>

<style lang="sass">
  .b-tabs .tab-content
    padding: 1rem 0
</style>
