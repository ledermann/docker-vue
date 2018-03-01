<template>
  <div class="basic-layout">
    <div class="wrapper">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
      </div>

      <section class="hero is-info">
        <!-- Hero content: will be in the middle -->
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">
              Frontend for DockerRails
            </h1>
            <h2 class="subtitle">
              Built with Vue.js
            </h2>
          </div>
        </div>

        <!-- Hero footer: will stick at the bottom -->
        <div class="hero-foot">
          <nav class="tabs is-boxed">
            <div class="container">
              <ul>
                <router-link tag="li" to="/" exact>
                  <a>Posts</a>
                </router-link>

                <router-link tag="li" to="/about" exact>
                  <a>About</a>
                </router-link>
              </ul>
            </div>
          </nav>
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
