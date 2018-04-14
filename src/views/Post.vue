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

      <template v-if="activeTab === 'Article' && !isLoading">
        <post-form v-if="isEditing" :original-post="post" :original-clips="clips" @cancel="cancelEdit" @afterSave="afterSave" />
        <post-show v-else :post="post" :clips="clips" @edit="startEdit" @delete="deleteData" />
      </template>

      <template v-if="activeTab === 'Audits'">
        <post-audits :post="post" />
      </template>
    </template>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/LayoutBasic'
import PostShow from '@/components/Post/Show'
import PostForm from '@/components/Post/Form'
import PostAudits from '@/components/Post/Audits'

export default {
  name: 'Post',

  components: {
    LayoutBasic, PostShow, PostForm, PostAudits
  },

  props: ['slug'],

  data () {
    return {
      activeTab: 'Article',
      isLoading: false,
      isEditing: false,
      errors: [],
      post: {},
      clips: []
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
            this.clips = response.data.post.clips.map((clip) => {
              return {
                urlLarge: clip.large.url,
                urlThumbnail: clip.thumbnail.url
              }
            })
            this.isLoading = false
            this.errors = []
          })
          .catch(error => {
            this.post = null
            this.clips = null
            this.isLoading = false
            this.errors.push(error)
          })
      } else {
        this.post = {
          title: '',
          content: '',
          copyright: '',
          clips: []
        }
        this.clips = []
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

    afterSave (updatedPost, updatedClips) {
      this.$toast.open({
        message: 'The post <b>' + updatedPost.title + '</b> was ' + (this.persisted ? 'updated.' : 'created.'),
        type: 'is-success'
      })
      this.isEditing = false
      this.post = updatedPost
      this.clips = updatedClips
      this.$router.push({name: 'post', params: {slug: this.post.slug}})
    }
  },

  computed: {
    isLoadingError () {
      return (this.errors.length > 0)
    },

    persisted () {
      return !!this.slug
    }
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
