<template>
  <div>
    <silentbox-group v-if="post.clips.length">
      <template v-for="clip in post.clips">
        <silentbox-item v-if="clip.thumbnail" :src="clip.large.url" :key="clip.id">
          <figure class="image is-128x128">
            <img :src="clip.thumbnail.url">
          </figure>
        </silentbox-item>

        <figure v-else class="image is-128x128" :key="clip.id">
          <b-icon icon="sync-alt" size="is-large" custom-class="fa-spin" />
        </figure>
      </template>
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

  props: ['post']
}
</script>
