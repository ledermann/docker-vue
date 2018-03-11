<template>
  <div class="basic-layout">
    <nav class="navbar is-dark is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" exact class="navbar-item">
            <b-icon pack="fas" icon="home"></b-icon>
          </router-link>
          <div class="navbar-burger burger" @click="toggleMenu" :class="{'is-active': navIsActive}" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active': navIsActive}">
          <div class="navbar-start">
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="button is-success" href="https://github.com/ledermann/docker-vue">
                    <b-icon pack="fab" icon="github"></b-icon>
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

  data () {
    return {
      navIsActive: false
    }
  },

  methods: {
    toggleMenu: function () {
      this.navIsActive = !this.navIsActive
    }
  },

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
