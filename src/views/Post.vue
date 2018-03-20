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
            <router-link tag="li" :to="'/posts/' + post.slug" class="is-active" exact>
              <a>Article</a>
            </router-link>

            <router-link tag="li" :to="'/posts/' + post.slug + '/audits'" exact>
              <a>History</a>
            </router-link>
          </ul>
        </div>
      </div>

      <b-loading :active="isLoading"></b-loading>

      <post-form v-if="isEditing" :post="post" @cancel="cancelEdit" @afterSave="afterSave" />

      <div v-if="!isEditing && !isLoading" class="content">
        <div class="columns">
          <div class="column">
              <b-tag type="is-dark" v-if="post.updated_at">
                <timeago :since="post.updated_at"></timeago>
              </b-tag>
          </div>

          <div class="column has-text-right">
            <a v-if="currentUser && currentUser.admin" @click="startEdit" class="button">
              <span class="icon">
                <i class="fas fa-edit" />
              </span>
              <span>Edit</span>
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
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/LayoutBasic'
import PostForm from '@/components/PostForm'
import { mapGetters } from 'vuex'

export default {
  name: 'Post',

  components: {
    LayoutBasic, PostForm
  },

  props: ['slug'],

  data () {
    return {
      isLoading: true,
      isEditing: false,
      errors: [],
      post: {}
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
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
        this.isLoading = false
        this.post = {
          title: '',
          content: '',
          copyright: ''
        }
        this.startEdit()
      }
    },

    startEdit () {
      this.isEditing = true
    },

    cancelEdit () {
      this.isEditing = false
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
