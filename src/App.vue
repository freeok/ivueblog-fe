<template>
  <div id="app">
    <router-view v-loading.fullscreen="this.$store.state.fullscreenLoading"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  max-width: 960px;
  margin: 0 auto;
}
</style>
