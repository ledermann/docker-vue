<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          Built

          <strong>
            <b-tooltip :label="buildTime" position="is-top" type="is-dark">
              <timeago :datetime="buildTime" :title="null" :autoUpdate=5></timeago>
            </b-tooltip>
          </strong>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Foot',

  computed: {
    buildTime () {
      return BUILDTIME
    }
  }
}
</script>

<style lang="sass" scoped>
  .footer
    position: fixed
    bottom: 0
    width: 100%
    padding: 0.5rem
</style>
