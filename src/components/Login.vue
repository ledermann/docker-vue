<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Login</p>
    </header>

    <section class="modal-card-body">
      <form>
        <b-field label="Your Email">
          <b-input type="email" size="is-large" v-model="email" autofocus @keyup.native="onKey" />
        </b-field>

        <b-field label="Your password">
          <b-input type="password" size="is-large" v-model="password" @keyup.native="onKey" />
        </b-field>

        <b-field>
          <b-checkbox v-model="rememberMe">Remember me</b-checkbox>
        </b-field>
      </form>
    </section>

    <footer class="modal-card-foot">
      <div>
        <button class="button is-primary" @click="submit">Login</button>
        <button class="button" @click="cancel">Cancel</button>
      </div>

      <div v-if="failed" class="tag is-danger">
        Invalid email or password!
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data () {
    return {
      email: '',
      password: '',
      rememberMe: true,
      failed: false
    }
  },

  methods: {
    onKey () {
      this.failed = false
    },

    cancel () {
      this.$parent.close()
    },

    submit () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      }).then(() => {
        this.$parent.close()

        this.$toast.open({
          message: 'Welcome, you have successfuly logged in!',
          type: 'is-success'
        })
      }).catch(() => {
        this.failed = true
      })
    }
  }
}
</script>

<style lang="sass">
  .modal-card-foot
    justify-content: space-between
</style>
