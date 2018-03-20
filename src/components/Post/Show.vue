<template>
  <div>
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

<script>
export default {
  name: 'PostShow',

  props: ['post'],

  computed: {
    clips () {
      if (this.post.clips) {
        return this.post.clips.map(clip => {
          return { urlLarge: clip.large.url, urlThumb: clip.thumbnail.url }
        })
      }
    }
  }
}
</script>
