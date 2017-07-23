<template>
  <div class="pic-list">
    <iframe :src="src" scrolling="no" id="iframe" frameborder=no></iframe>
    <div class="foryou">
      <div class="lastitle">
        <p :class="{active: active==1}" @click="you(1)">为你推荐</p>
        <p :class="{active: active==2}" @click="bang(2)">排行榜</p>
      </div>
      <ul class="tjforyou" v-if="exist">
        <li v-for="(m,i) in tuijian" :key="i" @click="getid(m.id)">
          <img :src="m.imgurl" />
          <p class="txt">{{m.goodsname}}</p>
          <p class="price">
            <span>￥</span>{{m.price}}</p>
        </li>
      </ul>
      <ul class="ranklist" v-if="unexist">
        <li v-for="(m,i) in phb" :key="i" @click="getid(m.id)">
          <img :src="m.imgurl" />
          <p class="txt">{{m.goodsname}}</p>
          <p class="price">
            <span>￥</span>{{m.price}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'Detailgoods',
  data() {
    return {
      src: "http://appapi.wshwifi.cn/index.php/App/GetContent/getGoodsContent/goodsid/" + this.listid + ".html",
      active: 1,
      tuijian: [],
      phb: [],
      exist: true,
      unexist: false
    }
  },
  props: ['listid'],
  methods: {
    you(sign) {
      this.active = sign;
      this.exist = true;
      this.unexist = false;
    },
    bang(sign) {
      this.active = sign;
      this.exist = false;
      this.unexist = true;
    },
    getid(listid) {

      this.$router.replace({ name: 'detail', params: { listid } });
      this.$forceUpdate();
    }
  },
  // watch:{
  //   "$route": "fetchDate"
  // },
  mounted() {
    // console.log(this.listid);
    axios({
      url: '/appapi/index.php/App/ShopGoods/',
      method: 'post',
      headers: {
        ContentType: 'application/x-www-urlencoded;charset=UTF-8'
      },
      data: 'sign=6ad25e4ed0a490c13a546ee61ffd3dd3&action=GetTjforyou&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&type=3&goodsid=' + this.listid + '&clienttype=2&'
    }).then(responseData => {
      this.tuijian = responseData.data.data.tjforyou;
      this.phb = responseData.data.data.phb;
      // console.log(this.tuijian);
      // console.log(this.phb);
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../style/usage/core/reset.scss';

.pic-list {
  width: 100%;
  #iframe {
    width: 100%;
    border: none;
    height: 6000px;
  }
  .foryou {
    width: 100%;
    padding: 0 10px;
    .lastitle {
      @include flexbox();
      width: 100%;
      border-bottom: 1px solid #eee;
      p {
        @include flex();
        text-align: center;
        height: .4rem;
        line-height: .4rem;
        &:nth-child(1).active {
          border-bottom: 2px solid #f00;
        }
        &:nth-child(2).active {
          border-bottom: 2px solid #f00;
        }
      }
    }
  }
  ;
  .tjforyou {
    @include flex-flow(row wrap);
    @include flex-direction();
    @include flexbox();
    width: 100%;
    li {
      width: 30%;
      margin: 0 1.6%;
      margin-top: 10px;
      img {
        width: 100%;
        height: .9rem;
        border: 1px solid #eee;
      }
      p {
        margin-top: 5px;
      }
      .txt {
        font-size: 10px;
        height: .4rem;
        overflow: hidden;
        white-space: pre-wrap;
        text-overflow: ellipsis;
        line-height: .2rem;
      }
      .price {
        color: #f00;
        font-size: 14px;
      }
    }
  }
  ;
  .ranklist {
    @include flex-flow(row wrap);
    @include flex-direction();
    @include flexbox();
    width: 100%;
    li {
      width: 30%;
      margin: 0 1.6%;
      margin-top: 10px;
      img {
        width: 100%;
        height: .9rem;
        border: 1px solid #eee;
      }
      p {
        margin-top: 5px;
      }
      .txt {
        font-size: 10px;
        height: .4rem;
        overflow: hidden;
        white-space: pre-wrap;
        text-overflow: ellipsis;
        line-height: .2rem;
      }
      .price {
        color: #f00;
        font-size: 14px;
      }
    }
  }
}
</style>


