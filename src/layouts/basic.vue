<template>
  <div class="basic-layout">
    <nav class="navbar is-dark is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" exact class="navbar-item">
            Frontend for DockerRails
          </router-link>
          <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="button is-success" href="https://github.com/ledermann/docker-vue">
                    <span class="icon">
                      <i class="fab fa-github"></i>
                    </span>
                    <span>Source</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="wrapper">
      <section class="hero is-info">
        <!-- Hero head: will stick at the top -->
        <div class="hero-head">
        </div>

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
