<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>Built with <strong>Vue.js</strong> v{{ vueVersion }}</p>
      </div>
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Foot',

  computed: {
    vueVersion () {
      return Vue.version
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
