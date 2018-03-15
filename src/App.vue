<template>
  <div id="app">
    <navbar />

    <keep-alive include="PostIndex">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'

export default {
  components: {
    Navbar
  }
}
</script>
