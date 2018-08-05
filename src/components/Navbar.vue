<template lang="html">
  <nav class="navbar is-dark is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" exact class="navbar-item" title="Home">
          <font-awesome-icon icon="home" size="lg" />
        </router-link>

        <router-link v-if="currentUser && currentUser.admin" :to="{ name: 'newPost'}" exact class="navbar-item" title="Add post">
          <font-awesome-icon icon="plus" size="lg"/>
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
        </div>

        <div class="navbar-end">
          <a class="navbar-item" href="https://github.com/ledermann/docker-vue" title="Sourcecode">
            <font-awesome-icon :icon="['fab', 'github']" size="lg" />
          </a>

          <router-link to="/about" exact class="navbar-item" title="About" >
            <font-awesome-icon icon="info-circle" size="lg" />
          </router-link>

          <template v-if="currentUser">
            <span class="navbar-item">
              <font-awesome-icon icon="user-circle" size="lg" />
              &nbsp;
              {{ currentUser.email }}
            </span>

            <a class="navbar-item" href="#" @click.prevent="logout" title="Logout" >
              <font-awesome-icon icon="sign-out-alt" size="lg"/>
            </a>
          </template>

          <template v-else>
            <span class="navbar-item">
              <a class="button" @click.prevent="login">
                <font-awesome-icon icon="user-circle" size="lg"/>
                <span>Login</span>
              </a>
            </span>
          </template>
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
    ...mapGetters(['currentUser'])
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
