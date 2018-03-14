<template>
  <layout-basic>
    <div slot="hero-body" class="container has-text-centered">
      <h1 class="title">
        Login
      </h1>
    </div>

    <form>
      <section>
        <b-field label="Email">
          <b-input type="email"
                   v-model="email">
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input type="password"
                   v-model="password"
                   password-reveal>
          </b-input>
        </b-field>

        <button class="button is-primary" v-on:click.prevent="submit">Login</button>
      </section>
    </form>
  </layout-basic>
</template>

<script>
import LayoutBasic from '@/layouts/basic'

export default {
  name: 'LoginNew',

  components: {
    LayoutBasic
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
          this.$router.push({ path: '/' })
        })
    }
  },

  computed: {
  }
}
</script>
