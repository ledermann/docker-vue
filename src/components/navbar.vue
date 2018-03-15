<template lang="html">
  <nav class="navbar is-dark is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" exact class="navbar-item">
          <b-icon pack="fas" icon="home" />
        </router-link>
        <div class="navbar-burger burger" @click="toggleMenu" :class="{'is-active': IsActive}" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active': IsActive}">
        <div class="navbar-start">
          <div class="navbar-item">
            <autocomplete />
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item" v-if="loggedIn">
            <a class="button" @click="logout">
              <b-icon pack="fas" icon="sign-out-alt" />
              <span>Logout</span>
            </a>
          </div>
          <div v-else>
            <div class="navbar-item">
              <router-link to="/login" exact class="button">
                <b-icon pack="fas" icon="sign-in-alt" />
                <span>Login</span>
              </router-link>
            </div>
          </div>

          <div class="navbar-item">
            <a class="button" href="https://github.com/ledermann/docker-vue">
              <b-icon pack="fab" icon="github" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Autocomplete from '@/components/Autocomplete'

export default {
  name: 'Navbar',

  components: {
    Autocomplete
  },

  data () {
    return {
      IsActive: false,
      loggedIn: false
    }
  },

  mounted () {
    this.loggedIn = !!localStorage.token
  },

  methods: {
    toggleMenu: function () {
      this.IsActive = !this.IsActive
    },

    logout: function () {
      localStorage.removeItem('token')
      this.loggedIn = false
    }
  }
}
</script>
