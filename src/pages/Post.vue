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
          {{ this.persisted ? post.title : 'Add post' }}
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
        <post-form v-if="isEditing" :original-post="post" @cancel="cancelEdit" @afterSave="afterSave" />
        <post-show v-else :post="post" @edit="startEdit" @delete="deleteData" />
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
      post: {
        clips: []
      },
      channel: null
    }
  },

  mounted () {
    this.loadData()
  },

  destroyed () {
    if (this.channel) {
      this.channel.unsubscribe()
      this.channel = null
    }
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
            this.subscribeToUpdateChannel()
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
          copyright: '',
          clips: []
        }
        this.startEdit()
      }
    },

    subscribeToUpdateChannel () {
      if (this.channel) return

      const vm = this
      this.channel = this.$cable.subscriptions.create({ channel: 'PostUpdateChannel', post_id: this.post.id }, {
        received (data) {
          if (data.slug === vm.post.slug) {
            vm.post = data
          } else {
            vm.$router.replace({ name: 'post', params: { slug: data.slug } })
          }
        }
      })
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
              this.$router.push({ name: 'posts' })
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
        this.$router.push({ name: 'posts' })
      }
    },

    afterSave (updatedPost) {
      this.$toast.open({
        message: 'The post <b>' + updatedPost.title + '</b> was ' + (this.persisted ? 'updated.' : 'created.'),
        type: 'is-success'
      })
      this.isEditing = false
      this.post = updatedPost
      this.$router.push({ name: 'post', params: { slug: this.post.slug } })
      this.subscribeToUpdateChannel()
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
.clip
  display: inline-block
  border: 1px solid #ddd
  line-height: 0

  img
    object-fit: cover
    width: 128px
    height: 128px

</style>
