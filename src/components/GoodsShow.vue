<template>
  <div id="goodsshow">
    <div id="cart" @click="cart">
      <p>{{cargoodsnum}}</p>
    </div>
    <div id="head">
      <img id="space" src="../imgs/w_back_page.png" @click="back"></img>
      <p>商品详情</p>
    </div>
    <div id="scroll">
      <div id="pic">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(v,i) in result.headimg" :key="i">
            <img :src="v.picurl"></img>
          </mt-swipe-item>
        </mt-swipe>
        <p>{{result.goodsname}}</p>
      </div>
      <div id="money">
        <div id="left">
          <p>
            <span>{{result.ylmjindou}}</span>金豆&nbsp;&nbsp;
            <b>原价：{{result.price}}</b>
          </p>
          <p>剩余：{{result.goodsnumyu}}件</p>
        </div>
        <div id="right">
          <img src="../imgs/w_icon_liji_duihuan.png" @click="cart"></img>
        </div>
      </div>
      <div id="sp">
        <p id="id1">
          <img src="../imgs/w_icon_guest_msg_bg.9.png"></img>
          <span>商家信息</span>
          <p>
            <p id="id2">
              <img src="../imgs/w_gold_home_icon.png"></img>
              <b>商家名称：</b>
              <span>{{sellername}}</span>
            </p>
            <p id="id3">
              <img src="../imgs/w_gold_phone_icon.png"></img>
              <b>联系电话：</b>
              <span>{{mobile}}</span>
              <img src="../imgs/w_icon_yijian_call.png"></img>
            </p>
            <p id="id4">
              <img src="../imgs/w_gold_address_icon.png"></img>
              <b>商家地址：</b>
              <span>{{address}}</span>
            </p>
            <p id="id5">
              <img src="../imgs/w_gold_heart_icon.png"></img>
              <b>商家星级：</b>
              <img v-for="(v,i) in lever" :key="i" src="../imgs/w_icon_gift_shop_star_l.png"></img>
            </p>
            <button @click="goshop(result.shanghu.website)">进入商家官网</button>
      </div>
      <div id="bot">
        <p>
          <span :class="{active: index == 0}" @click="change(0)">商品详情</span>
          <span :class="{active: index == 1}" @click="change(1)">兑换须知</span>
        </p>
        <b id="line"></b>
        <iframe :src="url"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import load from '../util/Loading';
import ax from '../util/Axios';
import { Loadmore } from 'mint-ui';
import { Lazyload } from 'mint-ui';
import { Toast } from 'mint-ui';
import myalert from '../util/Alert'
Vue.use(Lazyload);
import 'mint-ui/lib/style.css'
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
export default {
  name: "goodsshow",
  data() {
    return {
      result: " ",
      index: 0,
      url: "",
      sellername: "",
      mobile: "",
      address: "",
      lever: 0,
      cargoodsnum: ""
    }
  },
  methods: {
    cart: function () {
      //   console.log(0)
      //跳转小购物车
      //商品自动加入购物车
      let that = this;
      ax.post({
        url: '/api/App/JdShop/',
        body: 'appid=81423&goodsid=' + this.$route.params.id + '&clienttype=2&sign=fa11dfb70cf6779692b818e346a10b31&action=addCart&userid=1008010&uuid=fd14e57682a18d2af70116bdefbb0224&',
        cb: function (response) {
          //啥事不用做
          // console.log(response.data.msg)
          that.$destroy();
          that.$router.push('/smallcart')
        }
      })

    },
    back: function () {
      this.$destroy();
      this.$router.replace('/money/3/gold');
    },
    change: function (params) {
      if (params == 0) {
        this.url = this.result.contenturl;
      } else {
        this.url = this.result.xuzhiurl;
      }
      this.index = params;
    },
    goshop: function (params) {
      //   console.log(params);
      let shopid = params.split(":")[1];
      //   console.log(shopid);
      this.$router.push({ name: 'shop', params: { shopid } })
    }
  },
  mounted() {
    //请求数据
    let that = this;
    ax.post({
      url: "/api/App/JdShop/",
      body: "appid=81423&clienttype=2&sign=41c98e4eb5ee49845adfc115b6c5a2ba&id=" + this.$route.params.id + "&action=getGoodsDetail&userid=1008010&uuid=fd14e57682a18d2af70116bdefbb0224&",
      cb: function (response) {
        // console.log(response)
        if (response.data.data != "") {
          // that.goods = that.goods.concat(response.data.data);
          // //
          that.result = response.data.data;
          that.url = that.result.contenturl;
          that.sellername = that.result.shanghu.sellername;
          that.mobile = that.result.shanghu.mobile;
          that.address = that.result.shanghu.address;
          that.lever = parseInt(that.result.shanghu.lever);
          that.cargoodsnum = that.result.cargoodsnum;
          //  console.log(that.result)
        } else {
          Toast({
            message: '我是有底线的!',
            position: 'bottom',
            duration: 1000
          });
        }
        // that.show = false;
      }
    })

  }
}
</script>
<style lang="scss" scoped>
@import '../style/usage/core/reset';

#goodsshow {
  width: 100%;
  height: 100%;
  @include flexbox();
  @include flex-direction(column);
  #cart {
    position: absolute;
    z-index: 1000;
    width: .5rem;
    height: .5rem;
    background: url('../imgs/w_icon_goldbean_cart.png') no-repeat center center;
    background-size: 100%;
    left: 4%;
    bottom: 4%;
    padding-top: .06rem;
    color: #c7ff3d;
    text-align: center;
  }
  #head {
    width: 100%;
    height: .4rem;
    background: #fff;
    @include flexbox();
    @include flex-direction();
    @include align-items(center);
    @include justify-content(center);
    @include border(0 0 1px 0,
    #dcdcdc);
    padding-right: .1rem;
    img {
      width: .2rem;
      height: .2rem;
      margin-left: .1rem;
    }
    p {
      @include flex();
      font-size: .14rem;
      text-align: center;
      padding-right: .2rem;
    }
  }
  #scroll {
    width: 100%;
    height: 100%; // background: red;
    overflow-y: scroll; // padding: 0 .1rem;?
    #pic {
      @include flexbox();
      @include flex-direction(column);
      width: 100%;
      text-align: center;
      height: 1.7rem;
      background: #fff;
      @include border(0 0 1px 0,
      #dcdcdc);
      img {
        width: 100%;
      }
      p {
        width: 100%;
        padding: 0 .1rem;
        height: .3rem;
        line-height: .3rem;
        color: #333;
        text-align: left;
        @include ellipsis(null,
        1);
      }
    }
    #money {
      width: 100%;
      @include flexbox();
      background: #fff;
      height: .6rem;
      padding: 0 .1rem;
      #left {
        height: 100%;
        @include flex();
        @include flexbox();
        @include align-items(center);
        @include flex-direction(column);
        p {
          width: 100%;
          text-align: left;
          &:nth-child(1) {
            color: #666;
            span {
              color: #feb500;
              font-size: .2rem;
            }
            b {
              font-weight: normal;
              text-decoration: line-through;
            }
          }
        }
      }
      #right {
        width: .6rem;
        height: 100%;
        text-align: center;
        line-height: .6rem;
        img {
          width: .5rem;
          height: .5rem;
          @include border-radius(.06rem);
        }
      }
    }
    #sp {
      width: 100%;
      @include flexbox();
      @include flex-direction(column);
      background: #fff;
      margin-top: .1rem;
      padding: .1rem .1rem;
      font-size: .12rem;
      button {
        border: none;
        background: red;
        color: #fff;
        height: .3rem;
        @include border-radius(.04rem);
        margin-top: .1rem;
      }

      p {
        width: 100%;
        img {
          height: .16rem;
        }
        b {
          margin: 0 .1rem;
          color: #aaa;
          font-weight: normal;
        }
      }
      #id2 {
        @include border(0 0 2px 0,
        #dcdcdc,
        dashed);
        height: .3rem;
        line-height: .3rem;
      }
      #id3 {
        @include border(0 0 2px 0,
        #dcdcdc,
        dashed);
        height: .3rem;
        line-height: .3rem;
        span {
          margin-right: .1rem;
        }
      }
      #id4 {
        @include border(0 0 2px 0,
        #dcdcdc,
        dashed);
        height: .3rem;
        line-height: .3rem;
      }
      #id5 {
        @include border(0 0 2px 0,
        #dcdcdc,
        dashed);
        height: .3rem;
        line-height: .3rem;
      }
    }
    #bot {
      width: 100%;
      @include flexbox();
      @include flex-direction(column); // height: 400px;
      background: #fff;
      margin-top: .1rem;
      padding: 0 .1rem;
      p {
        width: 100%;
        height: .4rem;
        @include flexbox();

        span {
          @include flex();
          line-height: .4rem;
          font-size: .12rem;
          color: #666;
          text-align: center;

          &:nth-child(1) {
            color: #666;
            @include border(0 0 .04rem 0,
            #dcdcdc);
            &.active {
              color: #00aaed;
              @include border(0 0 .04rem 0,
              #00aaed);
            }
          }
          &:nth-child(2) {
            color: #666;
            @include border(0 0 .04rem 0,
            #dcdcdc);
            &.active {
              color: #00aaed;
              @include border(0 0 .04rem 0,
              #00aaed);
            }
          }
        }
      }
      iframe {
        margin-top: .04rem;
        border: none;
        width: 100%;
        height: 800px;
      }
    }
  }
}
</style>
