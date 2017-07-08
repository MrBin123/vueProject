<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='scss' scoped>
@import './style/usage/core/reset';
#app {
  @include flexbox();
  
}
</style>
