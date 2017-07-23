<template>
  <div id="moneyheader">
    <ul id="head">
      <li :class="{active : active== 0}" @click="change(0)"></li>
      <li :class="{active : active== 1}" @click="change(1)"></li>
      <li :class="{active : active== 2}" @click="change(2)"></li>
      <li :class="{active : active== 3}" @click="change(3)"></li>
      <li :class="{active : active== 4}" @click="change(4)"></li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'moneyheader',
  data() {
    return {
      active: -1
    }
  },
  methods: {
    change(index) {
      // console.log(index)
      this.active = index;
      this.$emit('headchild', index);
    }
  },

  mounted() {

  }

}
</script>

<style lang='scss'>
@import '../style/usage/core/reset';

#moneyheader {
  height: .5rem;
  width: 100%; //  overflow-y: scroll;
  background: #0f9cd1;
  #head {
    @include flexbox();
    width: 100%;
    height: .5rem;
    background: #00a9ca;
    li {
      width: 20%;
      @include align-items(center);
      @include justify-content(center);
      &:nth-child(1) {
        background: url('../imgs/kwz_ymkj_p.png') no-repeat center center;
        background-size: 100%;
      }
      &:nth-child(2) {
        background: url('../imgs/kwz_cglz_p.png') no-repeat center center;
        background-size: 100%;
      }
      &:nth-child(3) {
        background: url('../imgs/kwz_mrbk_p.png') no-repeat center center;
        background-size: 100%;
      }
      &:nth-child(4) {
        background: url('../imgs/kwz_shjd_p.png') no-repeat center center;
        background-size: 100%;
      }
      &:nth-child(5) {
        background: url('../imgs/kwz_ysbj_p.png') no-repeat center center;
        background-size: 100%;
      }
      &:nth-child(1).active {
        background: url('../imgs/kwz_ymkj_u.png') no-repeat center center;
        background-size: 100%;
      }
      &:nth-child(2).active {
        background: url('../imgs/kwz_cglz_u.png') no-repeat center center;
        background-size: 100%;
      }
      &:nth-child(3).active {
        background: url('../imgs/kwz_mrbk_u.png') no-repeat center center;
        background-size: 100%;
      }
      &:nth-child(4).active {
        background: url('../imgs/kwz_shjd_u.png') no-repeat center center;
        background-size: 100%;
      }
      &:nth-child(5).active {
        background: url('../imgs/kwz_ysbj_u.png') no-repeat center center;
        background-size: 100%;
      }
    }
  }
}
</style>
