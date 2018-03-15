<template>
  <div class="basic-layout">
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
</template>

<script>
export default {
  name: 'BasicLayout'
}
</script>
