<template>
  <section class="hero is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ title }}
        </h1>
        <h2 class="subtitle">
          {{ subTitle }}
        </h2>

        <b-icon
            pack="fas"
            icon="home"
            size="is-small">
        </b-icon>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String,
    subTitle: String
  }
}
</script>
