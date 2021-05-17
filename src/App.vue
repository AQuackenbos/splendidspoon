<template>
  <div id="app" class="section">
    <div class="container">
      <img alt="Splendid Spoon logo" src="./assets/ss-logo.webp">
      <h1 class="subtitle">Demonstration Project - Cubic Subscriptions</h1>
    </div>
    <ViewContainer />
  </div>
</template>

<script>
import ViewContainer from './components/View.vue'

export default {
  name: 'App',
  components: {
    ViewContainer
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
