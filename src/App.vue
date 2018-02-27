<template>
  <div id="app">
    <HelloWorld title="Welcome to DockerRails" subTitle="Cooming soon..."/>

    <ArticleList></ArticleList>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ArticleList from './components/ArticleList.vue'

export default {
  name: 'app',
  components: {
    HelloWorld, ArticleList
  }
}
</script>

<style>
</style>
