<template>
  <header class="home-header">
    <div class="pos">
      <img src="../imgs/w_gold_address_icon.png">
      <span>北京市</span>
    </div>
    <div class="hunt">
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
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/app';


  .home-header{
    @include flexbox();
    height:.4rem;
    padding:.08rem 20px 0 20px;
    width: 100%;
    background:#f00;
    .pos{
      width:.8rem;
      color:#bbb;
      height:100%;
      img{
        height:60%;
        width:.2rem;
      }
      span{
        font-size:14px;
      }
    };
    .hunt{
      width:2rem;
      .mint-search{
        height:100%;
      }
    };
    .qrcode{
      margin-left:.35rem;
      .qr{
        width:.24rem;
        height:.24rem;
      }
    }
  }
</style>
