<template>
  <form @submit.prevent="submit">
    <div class="columns">
      <div class="column">
      </div>

      <div class="column buttons has-text-right">
        <a @click="submit" class="button is-success">
          <span class="icon">
            <i class="fas fa-check-circle" />
          </span>
          <span>Save</span>
        </a>

        <a @click="$emit('cancel')" class="button">
          <span class="icon">
            <i class="fas fa-times-circle" />
          </span>
          <span>Cancel</span>
        </a>
      </div>
    </div>

    <b-loading :is-full-page="false" :active="isSaving" />

    <b-field :type="fieldTypes.title" :message="fieldMessages.title">
      <b-input type="text" placeholder="Title" v-model="post.title" autofocus @keyup.native="keyup('title')"/>
    </b-field>

    <ImageUploader :post="post" />

    <b-tabs :animated="false">
      <b-tab-item label="Content" active >
        <b-field :type="fieldTypes.content" :message="fieldMessages.content">
          <VuePellEditor id="editorContent" v-model="post.content" @keyup.native="keyup('content')" />
        </b-field>
      </b-tab-item>

      <b-tab-item label="Copyright">
        <b-field :type="fieldTypes.copyright" :message="fieldMessages.copyright">
          <VuePellEditor id="editorCopyright" v-model="post.copyright" @keyup.native="keyup('copyright')" />
        </b-field>
      </b-tab-item>
    </b-tabs>
  </form>
</template>

<script>
import objectToFormData from 'object-to-formdata'
import VuePellEditor from 'vue-pell-editor'
import ImageUploader from '@/components/Post/ImageUploader'

export default {
  name: 'PostForm',

  components: {
    VuePellEditor,
    ImageUploader
  },

  props: ['post'],

  data () {
    return {
      errors: {},
      isSaving: false
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
      const formData = objectToFormData(this.post, null, null, 'post')

      this.isSaving = true
      this.$http[this.apiMethod](this.url, formData)
        .then(response => {
          this.isSaving = false
          this.$emit('afterSave', response.data.post)
        }).catch(error => {
          this.isSaving = false
          this.errors = error.response.data
        })
    }
  }
}
</script>

<style lang="sass">
  .b-tabs .tab-content
    padding: 1rem 0

  @import '~vue-pell-editor/dist/vue-pell-editor.css';
  .vp-editor
    border: 1px solid #ccc
</style>
