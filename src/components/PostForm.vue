<template>
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
        <p>Not implemented yet...</p>
        </b-tab-item>

        <b-tab-item label="Copyright">
        <b-field :type="fieldTypes.copyright" :message="fieldMessages.copyright">
            <wysiwyg v-model="post.copyright" @keyup.native="keyup('content')" />
        </b-field>
        </b-tab-item>
    </b-tabs>

    <div class="buttons">
        <input type="submit" value="Save" class="button is-primary is-large" />
        <button @click="$emit('cancel')" class="button is-large">Cancel</button>
    </div>
  </form>
</template>

<script>
import objectToFormData from 'object-to-formdata'

export default {
  name: 'PostForm',

  props: ['post'],

  data () {
    return {
      errors: {}
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
    },

    url () {
      return this.post.slug ? `/posts/${this.post.slug}` : `/posts`
    },

    apiMethod () {
      return this.post.slug ? 'patch' : 'post'
    }
  },

  methods: {
    keyup (field) {
      this.errors[field] = null
    },

    submit () {
      const formData = objectToFormData(this.post, null, 'post')

      this.$http[this.apiMethod](this.url, formData)
        .then(response => {
          this.$emit('afterSave', response.data.post)
        }).catch(error => {
          this.errors = error.response.data
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
