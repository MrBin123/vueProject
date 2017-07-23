<template>
  <div id="article">
    <my-header @headchild="fromchild"></my-header>
    <my-load v-show="isshow"></my-load>
    <div id="outer">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :autoFill="false" @bottom-status-change="handleTopChange">
  
        <ul id="shop">
          <li v-for="(v,i) in result" :key="i" @click="toDetail(v)">
            <img v-lazy="v.picurl"></img>
            <div>
              <p>{{v.title}}</p>
              <span>{{v.webdes}}</span>
              <b>
                <span>
                  <img src="../imgs/kwzlist_time.png"></img>{{v.createdate.split(" ")[0]}}</span>
                <span>
                  <img src="../imgs/kwzlist_zan.png"></img>{{v.goodnum}}</span>
                <span>
                  <img src="../imgs/kwzlist_dian.png"></img>{{v.hits}}</span>
              </b>
            </div>
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">加载更多...</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
          <span v-show="topStatus === 'drop'">释放更新</span>
        </div>
      </mt-loadmore>
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
Vue.use(Lazyload);
import 'mint-ui/lib/style.css'
Vue.component(Loadmore.name, Loadmore);
import MoneyHeader from './MoneyHeader'
export default {
  name: 'article',
  data: function () {
    return {
      result: "",
      topStatus: "",
      pageindex: 1,
      isshow: false,
      key: -1

    }
  },
  methods: {
    fromchild: function (index) {
      // console.log('来自头部子类'+index)
      let body = "";
      this.pageindex = 1;
      switch (index) {
        case 0:
          //幽默空间
          this.key = 0;
          body = "pageindex=1&pid=16&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
        case 1:
          //成功励志
          this.key = 1;
          body = "pageindex=1&pid=12&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
        case 2:
          //名人百科
          this.key = 2;
          body = "pageindex=1&pid=13&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
        case 3:
          //社会焦点
          this.key = 3;
          body = "pageindex=1&pid=15&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
        case 4:
          //养生保健
          this.key = 4;
          body = "pageindex=1&pid=14&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
      }
      let that = this;
      this.isshow = !this.isshow;
      ax.post({
        url: "/api/index.php/App/Read/",
        body: body,
        cb: function (response) {
          // console.log(response)
          if (response.data.data.list != "") {
            that.result = response.data.data.list;
            // console.log(response.data.data.list)
          } else {
            Toast({
              message: '我是有底线的!',
              position: 'bottom',
              duration: 1000
            });
          }
          that.isshow = !that.isshow;
        }
      })
    },
    loadBottom() {
      let that = this;
      let body = "";
      this.isshow = !this.isshow;
      this.pageindex++;
      switch (this.key) {
        case -1:
          //默认
          body = "pageindex=" + this.pageindex + "&pid=&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
        case 0:
          //幽默空间
          body = "pageindex=" + this.pageindex + "&pid=16&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
        case 1:
          //成功励志
          body = "pageindex=" + this.pageindex + "&pid=12&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
        case 2:
          //名人百科
          body = "pageindex=" + this.pageindex + "&pid=13&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
        case 3:
          //社会焦点
          body = "pageindex=" + this.pageindex + "&pid=15&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
        case 4:
          //养生保健
          body = "pageindex=" + this.pageindex + "&pid=14&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&";
          break;
      }
      ax.post({
        url: "/api/index.php/App/Read/",
        body: body,
        cb: function (response) {
          // console.log(response)
          if (response.data.data.list != "") {
            that.result = that.result.concat(response.data.data.list);
            // console.log(response.data.data.list)
          } else {
            Toast({
              message: '我是有底线的!',
              position: 'bottom',
              duration: 1000
            });
          }
          that.$refs.loadmore.onBottomLoaded();
          that.isshow = !that.isshow;
        }
      })
    },
    toDetail(v) {
      // console.log(v);
      this.$router.push({ name: 'articleshow', params: { listid: v.listid } });
    },
    handleTopChange: function (status) {
      this.topStatus = status;
    }
  },
  components: {
    'my-header': MoneyHeader,
    'my-load': load
  },
  mounted() {
    let that = this;
    this.isshow = !this.isshow;
    ax.post({
      url: "/api/index.php/App/Read/",
      body: "pageindex=1&pid=&sign=7decf44b30708b75635f23d2893d1022&action=readList&keyword=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&clienttype=2&type=&pagesize=10&userid=1008010&",
      cb: function (response) {
        // console.log(response)
        if (response.data.data.list != "") {
          that.result = response.data.data.list;
          // console.log(response.data.data.list)
        } else {
          Toast({
            message: '我是有底线的!',
            position: 'bottom',
            duration: 1000
          });
        }
        that.isshow = !that.isshow;
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import '../style/usage/core/reset';

#article {
  width: 100%;
  height: 100%;
  @include flexbox();
  @include flex-direction(column);
  overflow-y: scroll;
  #outer {
    width: 100%;
    height: 100%; // @include flex();
    overflow-y: scroll;
    #shop {
      @include flex();
      width: 100%;
      @include flexbox();
      @include flex-flow(row wrap); // @include justify-content(center);
      padding: .02rem;
      overflow: hidden;
      li {
        @include flexbox();
        padding: .1rem;
        width: 100%;
        background: #fff;
        @include align-items(center);
        @include border(0 0 1px 0, #cbcbcb);
        img {
          width: 100px;
          height: 80px; // height: 1.5rem;
        }
        img[lazy=loading] {
          width: 100px;
          height: 80px;
          margin: auto;
        }
        div {
          @include flex();
          @include flexbox();
          margin-left: .1rem;
          @include flex-direction(column);
          p {
            width: 100%;
            height: 20px;
            line-height: 20px;
            color: #3c3c3c;
            font-size: 14px;
            margin: .02rem 0;
            font-weight: 500;
            @include ellipsis(null, 1);
          }
          >span {
            width: 100%;
            @include ellipsis(null, 1);
            color: #333;
            font-size: 12px;
          }
          b {
            margin-top: .1rem;
            width: 100%;
            @include flexbox();
            width: 100%; // font-weight: ;
            font-size: 12px;

            span {
              // @include flex();
              color: #aaa;
              font-weight: 500;
              height: 100%;
              &:nth-child(1) {
                width: 50%;
                text-align: left;
                font-size: 12px;
                img {

                  width: 12px;
                  height: 12px; // background: url('../imgs/kwzlist_time.png');
                  // background-size: 100%;
                  border: none;
                  margin-bottom: 4px;
                  margin-right: 4px;
                }
              }
              &:nth-child(2) {
                width: 20%;
                text-align: center;
                img {

                  width: 12px;
                  height: 12px; // background: url('../imgs/kwzlist_time.png');
                  // background-size: 100%;
                  border: none;
                  margin-bottom: 4px;
                  margin-right: 4px;
                }
              }
              &:nth-child(3) {
                width: 30%;
                img {

                  width: 12px;
                  height: 12px; // background: url('../imgs/kwzlist_time.png');
                  // background-size: 100%;
                  border: none;
                  margin-bottom: 4px;
                  margin-right: 2px;
                }
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
}
</style>
