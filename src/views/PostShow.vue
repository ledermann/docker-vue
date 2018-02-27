<template>
  <Post :slug="$route.params.id"></Post>
</template>

<script>
import Post from '../components/Post.vue'

export default {
  name: 'PostShow',
  components: {
    Post
  }
}
</script>
