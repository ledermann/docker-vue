<template>
  <layout-basic>
    <template v-if="isLoadingError">
      <div slot="hero-body" class="container has-text-centered">
        <h1 class="title">
          ERROR
        </h1>
      </div>

      <div class="content">
        <ul>
          <li v-for="(error,index) in errors" :key="index">
            {{ error.message }}
          </li>
        </ul>
      </div>
    </template>

    <template v-else>
      <div slot="hero-body" class="container has-text-centered">
        <h1 class="title">
          {{ this.persisted ? post.title : 'New Post' }}
        </h1>
      </div>

      <div v-if="persisted" slot="hero-foot" class="container">
        <div class="tabs is-boxed is-centered">
          <ul>
            <li :class="{ 'is-active': this.activeTab === 'Article' }">
              <a @click="showArticle">Article</a>
            </li>

            <li :class="{ 'is-active': this.activeTab === 'Audits' }">
              <a @click="showAudits">History</a>
            </li>
          </ul>
        </div>
      </div>

      <b-loading :active="isLoading" />

      <template v-if="activeTab === 'Article'">
        <post-form v-if="isEditing" :post="post" @cancel="cancelEdit" @afterSave="afterSave" />

        <div v-if="!isEditing && !isLoading" class="content">
          <div class="columns">
            <div class="column">
                <b-tag type="is-dark" v-if="post.updated_at">
                  <timeago :since="post.updated_at"></timeago>
                </b-tag>
            </div>

            <div v-if="currentUser && currentUser.admin" class="column buttons has-text-right">
              <a @click="startEdit" class="button">
                <span class="icon">
                  <i class="fas fa-edit" />
                </span>
                <span>Edit</span>
              </a>

              <a @click="deleteData" class="button">
                <span class="icon">
                  <i class="fas fa-trash" />
                </span>
                <span>Delete</span>
              </a>
            </div>
          </div>

          <silentbox-group>
              <silentbox-item v-for="(clip,index) in clips" :src="clip.urlLarge" v-bind:key="index">
                <figure class="image is-128x128">
                  <img :src="clip.urlThumb">
                </figure>
              </silentbox-item>
          </silentbox-group>

          <hr />

          <div v-html="post.content" />

          <hr v-if="post.copyright" />

          <div class="has-text-grey" v-html="post.copyright" />
        </div>
      </template>

      <template v-if="activeTab === 'Audits'">
        <post-audits :post="post" />
      </template>

    </template>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/LayoutBasic'
import PostForm from '@/components/Post/Form'
import PostAudits from '@/components/Post/Audits'
import { mapGetters } from 'vuex'

export default {
  name: 'Post',

  components: {
    LayoutBasic, PostForm, PostAudits
  },

  props: ['slug'],

  data () {
    return {
      activeTab: 'Article',
      isLoading: false,
      isEditing: false,
      errors: [],
      post: {}
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    showArticle () {
      this.activeTab = 'Article'
    },

    showAudits () {
      this.activeTab = 'Audits'
    },

    loadData () {
      if (this.persisted) {
        this.isLoading = true
        this.$http.get('/posts/' + this.slug)
          .then(response => {
            this.post = response.data.post
            this.isLoading = false
            this.errors = []
          })
          .catch(error => {
            this.post = null
            this.isLoading = false
            this.errors.push(error)
          })
      } else {
        this.post = {
          title: '',
          content: '',
          copyright: ''
        }
        this.startEdit()
      }
    },

    deleteData () {
      this.$dialog.confirm({
        title: 'Confirmation',
        message: 'Are you sure you want to delete the post <b>' + this.post.title + '</b>? This action cannot be undone.',
        confirmText: 'Delete this post',
        type: 'is-danger',
        onConfirm: () => {
          this.$http.delete('/posts/' + this.slug)
            .then(response => {
              this.$router.push({name: 'posts'})
              this.$toast.open({
                message: 'The post <b>' + this.post.title + '</b> was deleted.',
                type: 'is-warning'
              })
            })
            .catch(error => {
              console.log(error)
              this.$toast.open({
                message: 'Deleting of this post failed!',
                type: 'is-danger'
              })
            })
        }
      })
    },

    startEdit () {
      this.isEditing = true
    },

    cancelEdit () {
      this.isEditing = false

      if (!this.persisted) {
        this.$router.push({name: 'posts'})
      }
    },

    afterSave (updatedPost) {
      this.isEditing = false
      this.post = updatedPost
      this.$router.push({name: 'post', params: {slug: this.post.slug}})
    }
  },

  computed: {
    isLoadingError () {
      return (this.errors.length > 0)
    },

    persisted () {
      return !!this.slug
    },

    clips () {
      if (this.post.clips) {
        return this.post.clips.map(clip => {
          return { urlLarge: clip.large.url, urlThumb: clip.thumbnail.url }
        })
      }
    },

    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="sass">
  .image
    display: inline-block
  .content figure
    margin-left: 0
    margin-right: 0.5rem
</style>
