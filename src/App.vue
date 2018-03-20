<template>
  <div id="app">
    <keep-alive include="Posts">
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
  </div>
</template>
