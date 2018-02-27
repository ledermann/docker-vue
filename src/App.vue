<template>
  <div id="app">
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
        <keep-alive include="PostsIndex">
          <router-view></router-view>
        </keep-alive>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>
