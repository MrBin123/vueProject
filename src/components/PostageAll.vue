<template>
  <div id="postage-alls">
    <div id="postage-all">
      <div id="postage-all-top">
        <ul id="classify">
          <li @click="toParent">全部分类</li>
          <li v-for="(v,i) in postagesall" :key="i" @click="goodslist(v.id,i)" :class="{active: i == index}">
            <p>{{v.name}}</p>
            <mt-badge size="small" type="error">{{v.goodsnum}}</mt-badge>
          </li>
  
        </ul>
        <ul id="content">
          <li v-for="(v,i) in contents" :key="i" @click="refresh(v.id,v.name)">
            <p>{{v.name}}</p>
            <span>{{v.goodsnum}}</span>
          </li>
  
        </ul>
      </div>
      <div id="postage-all-bottom">
        <img src="../imgs/dialog_bottom.png"></img>
      </div>
      <div id="space"></div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Badge } from 'mint-ui';
import ax from '../util/Axios';
Vue.component(Badge.name, Badge);
export default {
  name: 'postage-all',
  data() {
    return {
      contents: "",
      index: -1
    }
  },
  props: ['postagesall'],
  methods: {
    goodslist: function (pid, i) {
      // console.log(i)
      this.index = i;
      let that = this;
      ax.post({
        url: "/api/index.php/App/Shop/",
        body: "maxprice=9.9&pid=" + pid + "&sign=12f6810d0feb7d845849daf8140e6e58&isfixed=1&action=getGoodsClass&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&getgoodsnum=1&isbaoyou=1&minprice=9.9&depth=2&areaid=&clienttype=2&keywords=&",
        cb: function (response) {
          that.contents = response.data.data;

        }
      })
    },
    toParent: function () {
      this.$emit('fromPostageAll', "1");
    },
    refresh: function (classid, name) {
      //  console.log(classid,name.substr(0,2))
      this.$emit('classid', {
        classid: classid,
        name: name.substr(0, 2)
      });

    }

  }

}
</script>
<style lang="scss" scoped>
@import '../style/app.scss';

#postage-alls {
  width: 100%;
  height: 82%;
  position: absolute;
  z-index: 1000;
  margin-top: .72rem;
  overflow: hidden;

  #postage-all {
    width: 100%;
    height: 70%;
    background: #fff; //  @include flexbox();
    #postage-all-top {
      width: 100%;
      height: 94%;
      #classify {
        // @include flexbox();
        float: left;
        width: 50%;
        height: 100%;
        overflow-y: scroll;
        li {
          height: .4rem;
          width: 100%;
          padding: .1rem;
          @include border(0 0 1px 0, #dbdbdb); // @include justify-content(center);
          @include align-items(center);
          &.active {
            background: #efefef;
            p {
              color: #e03937;
            }
          }
          p {
            color: #646464;
            float: left;
          }
          .mint-badge {
            float: right;
            padding: 1px 6px;
          }
        }
      }
      #content {
        float: right;
        width: 50%;
        height: 100%;
        background: #efefef;
        overflow-y: scroll;
        li {
          height: .4rem;
          width: 100%;
          padding: .1rem;
          @include border(0 0 1px 0, #dbdbdb);
          @include align-items(center);
          color: #646464;
          p {
            float: left;
          }
          span {
            float: right;
          }
        }
      }
    }
    #postage-all-bottom {
      width: 100%;
      height: 6%;
      text-align: center;

      img {
        width: 16%; // margin-top: 40%;
        height: 50%; // margin-top: 10%;
      } // background: url('../imgs/dialog_bottom.png') no-repeat center center;
    }
  }
  #space {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.6;
  }
}
</style>

