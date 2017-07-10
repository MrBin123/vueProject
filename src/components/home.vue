<template>
  <div id="index">
    <img src="../imgs/splash_bg.png">
  </div>
</template>

<script>
export default {
  name: 'index',
  mounted() {
    console.log(0);
  }  
}
</script>

<style lang='scss' scoped>
//  @import '../style/usage/core/reset';
#index {
  width : 100%;
  height:100%;
  // @include flexbox();
  // @include align-items(center);
  // @include justify-content(center);
  img{
    width: 100%;
    height: 100%;
  }

  
}
</style>
