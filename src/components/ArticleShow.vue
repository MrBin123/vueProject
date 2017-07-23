<template>
  <div id="art">
    <my-load v-show="isshow"></my-load>
    <my-alert v-show="ischeck" :check="check" :msg="msg"></my-alert>
    <header>
      <img id="space" src="../imgs/w_back_page.png" @click="back"></img>
      <p>万商惠阅读中心</p>
    </header>
    <div id="other">
      <div id="top">
        <h1>{{result.title}}</h1>
        <p>
          <span>{{result.createdate}}</span>
          <i>{{result.classname}}</i>
        </p>
      </div>
      <iframe :src="result.contenturl" srcolling="no" frameborder='0' id="iframe"></iframe>
      <p id="category">
        <span>阅读&nbsp;{{result.hits}}</span>
        <span>已发送&nbsp;{{result.sharenum}}</span>
        <span @click="zan">
          <b :class="active"></b>赞&nbsp;{{result.goodnum}}</span>
      </p>
      <div id="cals">
        <b id="move"></b>
        <ul id="cal">
          <li @click="select(0)">
            <img src="../imgs/vp_kwz_tjwz.png"></img>
            <span>推荐文章</span>
          </li>
          <li @click="select(1)">
            <img src="../imgs/vp_kwz_zxph.png"></img>
            <span>最新排行</span>
          </li>
          <li @click="select(2)">
            <img src="../imgs/vp_kwz_ydph.png"></img>
            <span>阅读排行</span>
          </li>
          <li @click="select(3)">
            <img src="../imgs/kwz_search.png"></img>
          </li>
        </ul>
      </div>
      <ul id="calshow">
        <li v-for="(v,i) in res" :key="i">
          <p>{{ i + 1 }}</p>
          <span>{{v.title}}</span>
        </li>
      </ul>
  
    </div>
  
  </div>
</template>
<script>
import Vue from 'vue'
import load from '../util/Loading';
import ax from '../util/Axios';
import jquery from '../util/jquery.min.js'
import alert from '../util/Alert'
import { Toast } from 'mint-ui';
export default {
  name: 'articleshow',
  data() {
    return {
      isshow: false,
      result: "",
      listid: this.$route.params.listid,
      ischeck: false,
      check: "",
      msg: "",
      active: "",
      res: ""

    }
  },
  components: {
    'my-load': load,
    'my-alert': alert
  },
  methods: {
    back: function () {
      this.$destroy()
      this.$router.go(-1);
    },
    select: function (index) {
      // console.log(index)
      let body = "";
      switch (index) {
        case 0:
          body = "appid=81423&getnum=10&clienttype=2&sign=31a01e2ab3d3c686de09a2fc74563824&gettype=recommonlist&action=readGroup&uuid=fd14e57682a18d2af70116bdefbb0224&";
          break;
        case 1:
          body = "appid=81423&getnum=10&clienttype=2&sign=31a01e2ab3d3c686de09a2fc74563824&gettype=newlist&action=readGroup&uuid=fd14e57682a18d2af70116bdefbb0224&";
          break;
        case 2:
          body = "appid=81423&getnum=10&clienttype=2&sign=31a01e2ab3d3c686de09a2fc74563824&gettype=toplist&action=readGroup&uuid=fd14e57682a18d2af70116bdefbb0224&";
          break;
        case 3:
          this.$router.push('/search');
          break;

      }
      let that = this;
      this.isshow = !this.isshow;
      ax.post({
        url: "/api/index.php/App/Read/",
        body: body,
        cb: function (response) {
          if (response.data.data != " ") {
            that.res = response.data.data;
          } else {
            Toast({
              message: '我是有底线的!',
              position: 'bottom',
              duration: 1000
            });
          }
          // console.log(response.data.data)

          that.isshow = !that.isshow;

        }
      })

    },
    zan: function () {
      //点赞
      let that = this;
      this.active = "active"
      this.isshow = !this.isshow;
      ax.post({
        url: "/api/index.php/App/Read/",
        body: "appid=81423&clienttype=2&sign=3fbe0c6acea478629bdf1779d7d13dc6&id=" + this.listid + "&action=addGoodNum&userid=1008010&uuid=fd14e57682a18d2af70116bdefbb0224&",
        cb: function (response) {
          let res = response.data;
          // console.log(response.data)
          that.ischeck = !that.ischeck;
          if (res.code == "0") {
            that.check = "check";
            that.msg = res.msg;
          } else {
            that.result.goodnum++;
            that.check = "";
            that.msg = res.msg;
          }
          that.isshow = !that.isshow;
          setTimeout(function () {
            that.ischeck = !that.ischeck;
          }, 1000);
        }
      })

    }
  },
  mounted() {
    this.select(0);
    let iframe = document.getElementById("iframe");
    if (iframe.attachEvent) {
      iframe.attachEvent("onload", function () {
        console.log("Local iframe is now loaded.");
        // console.log(document.getElementById("iframe").contentWindow.document)
        //  $('#iframe').height($('#iframe').contents().find("#content").height())
        // $("#iframe").contents().find("#divId").height()

      });
    } else {
      iframe.onload = function () {
        console.log("Local iframe is now loaded.");
      };
    }

    $('#cals ul li').each(function (index, value) {
      //    console.log(index,value);
      $(value).on('click', function () {
        switch (index) {
          case 0:
            $('#move').animate({ left: '9%' }, 500);
            break;
          case 1:
            $('#move').animate({ left: '37%' }, 500);
            break;
          case 2:
            $('#move').animate({ left: '65%' }, 500);
            break;
        }

      })
    })

    let that = this;
    this.isshow = !this.isshow;
    ax.post({
      url: "/api/index.php/App/Read/",
      body: "appid=81423&clienttype=2&sign=532811dfe05cfd6c229041911c162b2c&id=" + this.listid + "&action=readDetail&userid=1008010&uuid=fd14e57682a18d2af70116bdefbb0224&",
      cb: function (response) {
        // console.log(response)
        if (response.data.data != "") {
          that.result = response.data.data;
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
<style lang="scss" scoped>
@import '../style/usage/core/reset';

#art {
  width: 100%;
  height: 100%;
  @include flexbox();
  @include flex-direction(column);
  background: #fff;

  header {
    padding: 0 .04rem;
    width: 100%;
    height: 1.4rem;
    @include flexbox();
    @include align-items(center);
    @include border(0 0 1px 0, #dfdfdf);
    img {
      width: .2rem;
      height: .2rem;
    }
    p {
      @include flex();
      text-align: center;
      color: #333;
    }
  }
  #other {
    width: 100%; //   height: 3000px;
    overflow-y: scroll; //   @include flexbox();
    @include flex-direction(column);
    #top {
      width: 100%;
      padding: 0 .04rem;
      h1 {
        font-size: 18px;
        font-weight: 600;
        line-height: .4rem;
      }
      span {
        color: #969696;
      }
      i {
        color: #9ab7c9;
        margin-left: .1rem;
      }
    }
    #iframe {
      width: 100%;
      height: 1200px; //   overflow: hidden;
      //  @include flex();
      //  overflow-x: hidden;
    }
    #category {
      width: 100%;
      height: .5rem;
      padding: 0 .04rem;
      @include flexbox();
      @include border(0 0 1px 0);
      @include align-items(center);
      span {
        @include flex();
        width: 33%;
        text-align: center;
        color: #a4a4a4;
        font-size: 12px;
        font-weight: 600;
        &:nth-child(3) {
          @include flexbox();
          @include align-items(center);
          @include justify-content(center);
          b {
            width: 14px;
            height: 14px;
            background: url('../imgs/kwz_zan_un.png') no-repeat center center;
            background-size: 100%;
            margin-right: .04rem;
            &.active {
              background: url('../imgs/kwz_zan.png') no-repeat center center;
              background-size: 100%;
            }
          }
        }
      }
    }
    #cals {
      @include flexbox();
      width: 100%;
      height: .4rem;

      margin-top: .02rem;
      position: relative;
      #cal {
        width: 100%;
        height: .4rem;
        @include flexbox();
        li {
          color: #fff;
          height: .4rem;
          text-align: center;
          line-height: .4rem;
          img {
            width: .2rem;
            height: .2rem;
          }
          &:nth-child(1) {
            width: 28%;
            background: #49cfea;
          }
          &:nth-child(2) {
            width: 28%;
            background: #40c49c;
          }
          &:nth-child(3) {
            width: 28%;
            background: #f5af4d;
          }
          &:nth-child(4) {
            @include flex();
            background: #6697dc;
          }
        }
      }
      b {
        width: 10%;
        height: 8px;
        position: absolute;
        background: url('../imgs/vp_kwz_down_sj.png') no-repeat center center;
        bottom: 0;
        left: 9%;
      }
    }
    #calshow {
      width: 100%; //   @include flexbox();
      @include flex-direction(column); //   overflow-y: scroll;
      //   margin-top: .2rem;
      height: 100%; // margin-top: .4rem;
      li {
        width: 100%;
        height: .4rem;
        line-height: .4rem;
        padding: 0 .06rem;
        @include flexbox();
        p {
          width: .2rem;
          height: .2rem;
          margin-top: .1rem;
          background: url('../imgs/w_goldbean_4.png') no-repeat center center;
          background-size: 100%;
          text-align: center;
          line-height: .2rem;
          color: #fff;
          font-weight: bold;
          @include border-radius(.04rem);
        }
        &:nth-child(1) {
          p {
            background: url('../imgs/w_goldbean_1.png') no-repeat center center;
          }
        }
        &:nth-child(2) {
          p {
            background: url('../imgs/w_goldbean_2.png') no-repeat center center;
          }
        }
        &:nth-child(3) {
          p {
            background: url('../imgs/w_goldbean_3.png') no-repeat center center;
          }
        }
        span {
          @include flex();
          margin-left: .1rem;
          height: .4rem;
          line-height: .4rem;
          color: #666;
          @include ellipsis(null,
          1);
        }
      }
    }
  }
}
</style>


