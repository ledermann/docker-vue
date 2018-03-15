<template>
  <div id="app">
    <navbar />

    <keep-alive include="Posts">
      <router-view></router-view>
    </keep-alive>

    <foot />
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import Foot from '@/components/foot'

export default {
  components: {
    Navbar,
    Foot
  }
}
</script>
