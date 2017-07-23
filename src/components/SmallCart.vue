<template>
  <div id="smallcart">
    <div id="head">
      <img id="space" src="../imgs/w_back_page.png" @click="back"></img>
      <p>购物车</p>
    </div>
    <ul id="center">
      <li v-for="(v,i) in result" :key="i">
        <img src="../imgs/w_icon_select_sex_unselect.png" id="sel"></img>
        <img :src="v.picurl"></img>
        <div id="right">
          <p>{{v.goodsname}}</p>
          <span>
            <b>{{v.ylmjindou}}</b>金豆</span>
          <div id="other">
  
            <b>
              <img src="../imgs/shopping_cart_product_num_reduce.png"></img>
              <i>{{v.goodsnum}}</i>
              <img src="../imgs/shopping_cart_product_num_add.png"></img>
            </b>
            <p>
              <img src="../imgs/m_icon_cart_del.png"></img>
              <span>删除</span>
            </p>
          </div>
  
        </div>
      </li>
    </ul>
    <div id="bottom"></div>
  </div>
</template>
<script>
import Vue from 'vue'
import ax from '../util/Axios';
import { Loadmore } from 'mint-ui';
import { Lazyload } from 'mint-ui';
import { Toast } from 'mint-ui';
Vue.use(Lazyload);
import 'mint-ui/lib/style.css'
Vue.component(Loadmore.name, Loadmore);
export default {
  name: 'smallcart',
  data() {
    return {
      result: ""
    }
  },
  methods: {
    back: function () {
      this.$destroy();
      this.$router.go(-1);
    }
  },
  mounted() {
    //数据请求
    let that = this;
    ax.post({
      url: "/api/App/JdShop/",
      body: "appid=81423&clienttype=2&sign=eecb0a256f906426ed7b7b186b7e2a52&action=getJdCart&userid=1008010&uuid=fd14e57682a18d2af70116bdefbb0224&",
      cb: function (response) {
        console.log(response)
        that.result = response.data.data.goolist;
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../style/usage/core/reset';

#smallcart {
  width: 100%;
  height: 100%;
  @include flexbox();
  @include flex-direction(column);
  #head {
    width: 100%;
    height: .4rem;
    background: #fff;
    @include flexbox();
    @include flex-direction();
    @include align-items(center);
    @include justify-content(center);
    @include border(0 0 1px 0, #dcdcdc);

    img {
      width: .2rem;
      height: .2rem;
    }
    p {
      @include flex();
      font-size: .14rem;
      text-align: center;
      padding-right: .2rem;
    }
  }
  #center {
    width: 100%;

    height: 100%; //  @include flex();
    // @include flexbox();
    // // // background: red;             
    // margin-bottom: .5rem;
    // @include flex-direction(column);
    overflow-y: scroll;
    li {
      width: 100%;
      margin-top: .1rem;
      background: #fff; // height: .8rem;
      @include flexbox();
      padding: .12rem .02rem;
      @include align-items(center);
      #sel {
        width: .22rem;
        height: .22rem;
      }
      >img {
        width: .7rem;
        height: .7rem;
        margin-left: .1rem;
        @include border-radius(.04rem);
      }
      #right {
        height: 100%; //   height: .6rem;
        @include flexbox();
        margin-left: .1rem;
        @include flex-direction(column); //   @include align-items(center);
        >p {
          width: 100%;
          font-size: .12rem;
          @include ellipsis(null, 1);
        }
        img {
          width: .16rem;
          height: .16rem;
          border: none;
        }
        >span {
          width: 100%;
          font-size: .12rem;
          color: #666;
          b {
            color: #fc8e1d;
            font-size: .18rem;
            margin-right: .04rem;
          }
        }
        #other {
          @include flexbox();
          width: 100%;
          >b {
            height: 100%;
            width: 50%;
            i {
              font-weight: normal;
              margin: 0 .1rem;
              padding: .02rem .1rem;
              background: #f7f7f7;
              color: #333;
              font-size: .12rem;
            }
          }
          >p {
            @include flex(); //   margin-left: 20px;
            height: 100%;

            @include flexbox();
            @include align-items(center);
            @include justify-content(flex-end);
            text-align: right;
            font-size: .12rem;
            color: #666;
            @include justify-content(flex-end);
            span {
              margin-left: .04rem;
            }
          }
        }
      }
    }
  }
  #bottom {
    width: 100%;
    height: .5rem;
    background: red;
  }
}
</style>

