<template>
  <div class="detail">
    <img id="gotop" src="../imgs/w_shoutudi_back.png" @click="back"></img>
    <my-loading v-show="xian"></my-loading>
    <mt-swipe :show-indicators="true">
      <mt-swipe-item v-for="(pic,i) in slidepic" :key="i">
        <img :src="pic.picurl">
      </mt-swipe-item>
    </mt-swipe>
    <div class="introduce">
      <h4 class="introduce">{{gooddetail.goodsname}}</h4>
      <p>
        <span>￥</span>{{gooddetail.price}}元</p>
      <i>
        <em>{{gooddetail.exprhtml}}</em>
        <strong>
          <span>剩余:</span>{{gooddetail.kucun}}</strong>
      </i>
    </div>
    <div class="standard">
      <p>选择颜色、规格</p>
      <h6>></h6>
    </div>
    <div class="shop">
      <div class="s-left">
        <p>
          <span>服务商：</span>{{goodslevel.shopname}}</p>
        <p>
          <span>等
            <a>你</a>级：</span>
          <img :src="goodslevel.shoplevelimg">
        </p>
        <p>
          <span>地
            <a>你</a>址：</span>
          <b>{{goodslevel.shopfulladdr}}</b>
        </p>
      </div>
      <div class="s-right">
        <a>进入店家</a>
        <a>联系商家</a>
      </div>
    </div>
    <div class="detail-main">
      <p class="empty"></p>
      <div class="shift">
        <p class="concrete">
          <a :class="{active: active == 1}" @click="shift(1)">商品详情</a>
        </p>
        <p class="comment">
          <a :class="{active: active == 2}" @click="unshift(2)">晒单(
            <span>{{this.gooddetail.shaidan}}</span>)</a>
        </p>
      </div>
      <div class="detail-component">
        <detailgoods :listid="listid" v-show="show"></detailgoods>
        <user-comments :listid="listid" v-show="run"></user-comments>
      </div>
    </div>
  
  </div>
</template>

<script>
import ani from '../util/Loading.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Detailgoods from './Detailgoods'
import Comment from './Comment'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);

export default {
  name: 'Detail',
  components: {
    'detailgoods': Detailgoods,
    'user-comments': Comment,
    'my-loading': ani
  },
  data() {
    return {
      gooddetail: {},
      slidepic: [],
      goodslevel: {},
      show: true,
      run: false,
      xian: true,
      active: 1
    }
  },
  methods: {
    shift(sign) {
      this.active = sign;
      // console.log(this.active);
      this.show = true;
      this.run = false;
    },
    unshift(sign) {
      this.active = sign;
      // console.log(this.active);
      this.show = false;
      this.run = true;
    },
    back() {
      this.$destroy();
      this.$router.go(-1);
    }
  },
  computed: {
    listid() {
      // console.log(this.$route.params.listid)
      return this.$route.params.listid;
    }
  },
  mounted() {
    axios({
      url: '/appapi/index.php/App/ShopGoods/',
      method: 'post',
      headers: {
        ContentType: 'application/x-www-urlencoded;charset=UTF-8'
      },
      data: 'userid=1009780&id=' + this.listid + '&sign=3aa27c4cbd6dc4b8c137c0fd04817e62&action=getGoodsDetail&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&'
    }).then(responseData => {
      this.gooddetail = responseData.data.data;
      this.slidepic = this.gooddetail.slidepicurls;
      this.goodslevel = this.gooddetail.shopinfo;
      this.xian = false;
      // console.log(this.gooddetail);
      // console.log(this.goodslevel);
    })
  },
}
</script>

<style lang="scss" scoped>
@import '../style/usage/core/reset.scss';

.detail {
  // @include flexbox();
  // @include flex();
  // @include flex-direction(column);
  width: 100%;
  background: #fff;
  height: 100%;
  overflow: scroll;
  #gotop {
    position: absolute;
    width: 36px;
    height: 36px;
    z-index: 999;
    left: .1rem;
    top: .1rem;
    opacity: 0.5
  }
  .mint-swipe {
    width: 100%;
    height: 3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  ;
  .introduce {
    h4 {
      width: 100%;
      padding: 5px 10px;
      font-size: 14px;
      color: #555;
    }
    p {
      width: 100%;
      height: .3rem;
      padding: 5px 10px;
      float: left;
      color: #f00;
    }
    i {
      width: 100%;
      height: .3rem;
      line-height: .3rem;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 0 10px;
      display: block;
      clear: both;
      color: #888;
      em {
        float: left;
      }
      strong {
        float: right;
        font-weight: normal;
        span {
          margin-right: 3px;
        }
      }
    }
  }
  ;
  .standard {
    clear: both;
    width: 100%;
    height: .3rem;
    line-height: .3rem;
    padding: 0 .1rem;
    color: #555;
    border-bottom: 1px solid #eee;
    p {
      float: left;
    }
    h6 {
      float: right;
    }
  }
  ;
  .shop {
    @include flexbox();
    width: 100%;
    padding-bottom: 5px;
    margin-top: 5px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .s-left {
      padding: 0 10px;
      @include flex(3);
      p {
        font-size: 12px;
        line-height: .2rem;
        @include flexbox();
        span {
          margin-right: 10px;
          color: #555;
          a {
            background: #fff;
            color: #fff;
          }
        }
        b {
          margin: 0;
          font-weight: normal;
        }
        img {
          width: .8rem;
          height: .15rem;
        }
      }
    }
    .s-right {
      @include flex(1);
      @include flexbox();
      @include flex-direction(column);
      padding-top: .1rem;
      padding-left: .2rem;
      a {
        color: #555;
        display: block;
        height: .26rem;
        line-height: .26rem;
        text-align: center;
        border: 1px solid #ddd;
        font-size: 12px;
        width: .6rem;
        margin-top: 5px;
      }
    }
  }
  ;
  .detail-main {
    width: 100%;
    .empty {
      width: 100%;
      height: .05rem;
      background: #eee;
    }
    .shift {
      @include flexbox();
      width: 100%;
      height: .4rem;
      line-height: .4rem;
      p {
        @include flex();
        padding: 5px 0;
        a {
          display: block;
          width: 100%;
          height: .3rem;
          ;
          text-align: center;
          line-height: .3rem;
          border-right: 1px solid #eee;
          color: #000;
          &:nth-child(1).active {
            color: #f00;
          }
          &:nth-child(2).active {
            color: #f00;
          }
        }
      }
    }
    .detail-component {
      width: 100%;
    }
  }
}
</style>


