<template>
  <div class="content">
    <div class="columns">
      <div class="column">
        <b-taglist attached>
            <b-tag type="is-dark" size="is-medium">
              Last update
            </b-tag>

            <b-tag type="is-info" size="is-medium">
              <timeago :since="post.updated_at" :autoUpdate=5 />
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
import { mapGetters } from 'vuex'

export default {
  name: 'PostShow',

  props: ['post'],

  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>
