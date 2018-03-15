<template>
  <div class="basic-layout">
    <div class="wrapper">
      <section class="hero is-info">
        <!-- Hero head: will stick at the top -->
        <div class="hero-head">
        </div>

        <!-- Hero content: will be in the middle -->
        <div class="hero-body">
          <slot name="hero-body">
          </slot>
        </div>

        <!-- Hero footer: will stick at the bottom -->
        <div class="hero-foot">
          <slot name="hero-foot">
          </slot>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <slot/>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>Built with <strong>Vue.js</strong> v{{ vueVersion }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'BasicLayout',

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

  .wrapper
    padding: 0 0 40px; // footer height
</style>
