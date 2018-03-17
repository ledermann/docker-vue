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
            <search />
          </div>
            <a class="navbar-item" href="https://github.com/ledermann/docker-vue" title="Source">
              <b-icon pack="fab" icon="github" />
            </a>

            <router-link to="/about" exact class="navbar-item">
              About
            </router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
            <div class="navbar-link">
              <b-icon pack="fas" icon="user-circle" />
              &nbsp;
              {{ currentUser.email }}
            </div>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href="#" @click.prevent="logout">
                <b-icon pack="fas" icon="sign-out-alt" />
                Logout
              </a>
            </div>
          </div>

          <div v-else>
            <div class="navbar-item">
              <a class="button" @click.prevent="login">
                <b-icon pack="fas" icon="sign-in-alt" />
                <span>Login</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Search from '@/components/Search'
import Login from '@/components/Login'
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',

  components: {
    Search
  },

  data () {
    return {
      IsActive: false
    }
  },

  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser'])
  },

  methods: {
    toggleMenu () {
      this.IsActive = !this.IsActive
    },

    login () {
      this.$modal.open({
        parent: this,
        component: Login
      })
    },

    logout () {
      this.$store.dispatch('logout')

      this.$toast.open({
        message: 'You are logged out now...'
      })
    }
  }
}
</script>
