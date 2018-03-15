<template>
  <layout-basic>
    <div slot="hero-body" class="container has-text-centered">
      <h1 class="title">
        Login
      </h1>
    </div>

    <div class="content">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <form>
              <b-field label="Your Email">
                <b-input type="email" size="is-large"
                         v-model="email" autofocus>
                </b-input>
              </b-field>

              <b-field label="Your password">
                <b-input type="password" size="is-large"
                         v-model="password">
                </b-input>
              </b-field>

              <hr>
              <button class="button is-info is-large is-fullwidth" v-on:click.prevent="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/basic'
import store from '@/store'

export default {
  name: 'Login',

  components: {
    LayoutBasic
  },

  beforeCreate () {
    if (store.state.isLoggedIn) {
      this.$router.push('/')
    }
  },

  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    submit: function () {
      var formData = new FormData()
      formData.append('auth[email]', this.email)
      formData.append('auth[password]', this.password)

      this.$http.post('/user_token', formData)
        .then(response => {
          localStorage.setItem('token', response.data.jwt)
          store.commit('LOGIN_USER')
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>
