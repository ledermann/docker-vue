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

    <ImageUploader :post="post" :clips="clips" />

    <b-tabs :animated="false">
      <b-tab-item label="Content" active >
        <b-field :type="fieldTypes.content" :message="fieldMessages.content" class="content">
          <VuePellEditor id="editorContent" v-model="post.content" @keyup.native="keyup('content')" />
        </b-field>
      </b-tab-item>

      <b-tab-item label="Copyright">
        <b-field :type="fieldTypes.copyright" :message="fieldMessages.copyright" class="content">
          <VuePellEditor id="editorCopyright" v-model="post.copyright" @keyup.native="keyup('copyright')" />
        </b-field>
      </b-tab-item>
    </b-tabs>
  </form>
</template>

<script>
import ImageUploader from '@/components/Post/ImageUploader'
import jsonToFormData from '@/utils/object-to-formdata'

export default {
  name: 'PostForm',

  components: {
    ImageUploader
  },

  props: ['original-post'],

  data () {
    return {
      errors: {},
      isSaving: false,
      post: {
        title: this.originalPost.title,
        content: this.originalPost.content,
        copyright: this.originalPost.copyright,
        clips_attributes: this.originalPost.clips.map((clip) => {
          return {
            _destroy: 0,
            id: clip.id
          }
        })
      },
      clips: this.originalPost.clips.map((clip) => {
        return {
          urlLarge: clip.large.url,
          urlThumbnail: clip.thumbnail.url
        }
      })
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
      return this.originalPost.slug ? `/posts/${this.originalPost.slug}` : `/posts`
    },

    apiMethod () {
      return this.originalPost.slug ? 'patch' : 'post'
    }
  },

  methods: {
    keyup (field) {
      this.errors[field] = null
    },

    submit () {
      const formData = jsonToFormData({
        post: this.post
      })

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

<style lang="scss">
  .b-tabs .tab-content {
    padding: 1rem 0
  }

  .vp-editor {
    border: 1px solid #ccc
  }
</style>
