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
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import buildTime from '@/build-time.json'

export default {
  name: 'Foot',

  computed: {
    buildTime () {
      return buildTime.timestamp
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
