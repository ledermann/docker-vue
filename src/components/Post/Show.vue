<template>
  <div class="content">
    <div class="columns">
      <div class="column">
        <b-taglist attached>
          <b-tag type="is-dark" size="is-medium">
            Last update
          </b-tag>

          <b-tag type="is-info" size="is-medium">
            <timeago :datetime="post.updated_at" :autoUpdate=5 />
          </b-tag>
        </b-taglist>
      </div>

      <div v-if="currentUser && currentUser.admin" class="column buttons has-text-right">
        <a @click="$emit('edit')" class="button">
          <span class="icon">
            <i class="fas fa-edit" />
          </span>
          <span>Edit</span>
        </a>

        <a @click="$emit('delete')" class="button">
          <span class="icon">
            <i class="fas fa-trash" />
          </span>
          <span>Delete</span>
        </a>
      </div>
    </div>

    <silentbox-group v-if="post.clips.length">
      <template v-for="clip in post.clips">
        <silentbox-item v-if="clip.thumbnail" :src="clip.large.url" :key="clip.id" class="clip">
          <img :src="clip.thumbnail.url">
        </silentbox-item>

        <img v-else src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" :key="clip.id" />
      </template>
    </silentbox-group>

    <hr />

    <div v-html="post.content" />

    <hr v-if="post.copyright" />

    <div class="has-text-grey" v-html="post.copyright" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PostShow',

  props: ['post'],

  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>
