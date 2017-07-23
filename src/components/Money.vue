<template>
  <div id="money">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <money-footer></money-footer>
  </div>
</template>

<script>

import Footer from './MoneyFooter'
export default {
  name: 'money',
  components: {
    'money-footer': Footer
  }
}
</script>

<style lang='scss' scoped>
@import '../style/usage/core/reset';

#money {
  width: 100%;
  height: 100%;
  @include flexbox();
  @include flex-direction(column);
}
</style>
