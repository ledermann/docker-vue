<template>
  <div>
    <navbar />

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

    <foot />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'

export default {
  name: 'LayoutBasic',

  components: {
    Navbar,
    Foot
  }
}
</script>
