<template>
  <div id="all">
    <div id="center">
      <p :class="check"></p>
      <span>{{msg}}</span>
    </div>
  
  </div>
</template>
<script>
export default {
  name: 'alert',
  props: ['msg', 'check']
}
</script>

<style lang="scss" scoped>
@import '../style/app';

#all {
  @include flexbox();
  @include justify-content(center);
  @include align-items(center);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  #center {
    width: 70%;
    height: 14%;
    @include flexbox();
    @include justify-content(center);
    @include align-items(center);
    background: #fff;
    p {
      padding: .1rem;
      width: .5rem;
      height: .5rem;
      background: url('../imgs/w_icon_toast_success.png') no-repeat center center;
      background-size: 100%;
      &.check {
        background: url('../imgs/w_icon_toast_failure.png') no-repeat center center;
        background-size: 100%;
      }
    }
    span {
      margin-left: .1rem;
      font-size: 20px;
      font-weight: bolder;
      color: #333;
    }
  }
}
</style>
