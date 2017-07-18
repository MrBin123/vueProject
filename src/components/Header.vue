<template>
  <header class="home-header">
    <router-link class="pos" to="/location">
      <img src="../imgs/w_gold_address_icon.png">
      <span>{{city? city:'北京市'}}</span>
    </router-link>
    <div class="hunt"  @click="jump">
      <mt-search v-model="value" cancel-text="取消" placeholder="请输入你想要的"></mt-search>
    </div>
    <div class="qrcode">
      <img class="qr" src="../imgs/w_icon_mine_menu_ewm.png">
    </div>
  </header>
</template>

<script>
  import Vue from 'vue'
  import { Search } from 'mint-ui';
  Vue.component(Search.name, Search);
  export default{
    name:'Header',
    data(){
      return {
      value: ''
      }
    },
    computed:{
      city(){
        return this.$store.state.cityname
      }
    },
    methods:{
      jump(){
        this.$router.push({name:'search'});
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/app';
  .home-header{
    @include flexbox();
    height:.4rem;
    // padding:.08rem 20px 0 20px;
    // @include justify-content(center);
    padding: .2rem 0;
    @include align-items(center);
    width: 100%;
    background:#f00;
    .pos{
      width:25%;
      color:#bbb;
      // height:100%;
      text-align: center;
      img{
        // height:60%;
        // width:.2rem;
        width: 20px;
        height: 20px;
      }
      span{
        font-size:14px;
      }
    };
    .hunt{
      // width:50%;
      @include flex();
      .mint-search{
        height:100%;
      }
    };
    .qrcode{
      // margin-left:.35rem;
      width:16%;
      text-align: center;
      .qr{
        width:.24rem;
        height:.24rem;
      }
    }
  }
</style>
