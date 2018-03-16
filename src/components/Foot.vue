<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          Built

          <strong>
            <b-tooltip :label="buildTime" position="is-top" type="is-dark">
              <timeago :since="buildTime" :title="null" :autoUpdate="5"></timeago>
            </b-tooltip>
          </strong>

          with
          <strong>Vue.js</strong> v{{ vueVersion }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'
import timestamp from '@/timestamp.json'

export default {
  name: 'Foot',

  computed: {
    vueVersion () {
      return Vue.version
    },

    buildTime () {
      return timestamp.date
    }
  }
}
</script>

<style lang="sass">
  .footer
    position: fixed
    bottom: 0
    width: 100%
    padding: 0.5rem
</style>
