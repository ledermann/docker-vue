<template>
  <Post :slug='slug'></Post>
</template>

<script>
import Post from '../components/Post.vue'

export default {
  name: 'PostShow',
  props: ['slug'],
  components: {
    Post
  }
}
</script>
