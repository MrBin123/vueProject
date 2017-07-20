<template>
  <div id="gold">
      <img :src="url" id="adv" v-show="advshow"></img>
      <p id="head">{{result.title}}</p>
      <div id="scroll">
        <div id="top">
           <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(v,i) in result.propic" :key="i"><img v-lazy="v"></img></mt-swipe-item>
          </mt-swipe>
        </div>
        <div id="name">
           <p><span>广告名称：</span>{{result.title}}</p>
           <p><span>广&nbsp;告&nbsp;语：</span>{{result.proword}}</p>
        </div>
        <div id="content">
          <span>内容介绍</span>
          <p>{{result.desc}}</p>
        </div>
        <div id="info">
          <p id="look">
            <img :src="result.logo"></img>
            <span>{{result.sname}}</span>
            <a @click="gotolook(result.shopid)">立即去看看</a>
          </p>
          <div id="level">
             <div id="left">
               <span>商家等级</span>
               <img v-lazy="result.levelimg"><img>
             </div>
             <div id="right">
               <img src="../imgs/jjd_ying.png"></img>
               <img src="../imgs/jjd_ren.png"></img>
               <img src="../imgs/jjd_shi.png"></img>
             </div>
          </div>
          <div id="address">
            <span>商家地址</span>
            <p>{{result.address}}</p>
          </div>
          <div id="tel">
            <div id="left">
              <span>联系电话</span>
              <p>{{result.tel}}</p>
            </div>
            <div id="right">
              <img src="../imgs/jjd_tel.png"></img>
            </div>
          </div>
        </div>
        <div id="goods">
          <p id="top"><b>商家兑换商品</b><span>更多</span><img src="../imgs/w_page_clear.png"></img></p>
          <ul>
            <li v-for="(v,i) in cont" :key="i">
              <img :src="v.picurl" id="leftcon"><img>
              <div id="rightcon">
                  <p>{{v.goodsname}}</p>
                  <b><span>原价：{{v.price}}</span><i>剩余：{{v.goodsnum}}件</i></b>
                  <i><span>{{v.ylmjindou}}金豆</span><b>立即兑换</b></i>
              </div>
            </li>
          </ul>
         </div>
        <div id="sub">
          <button>捡金豆</button>
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
Vue.use(Lazyload);
import 'mint-ui/lib/style.css'
Vue.component(Loadmore.name, Loadmore);
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: 'gold',
  data : function () {
     return {
        url:"",
        advshow:true,
        result:"",
        cont:""
      }
  },
  components: {
  
  },
  methods:{
    gotolook: function (shopid) {
      //立即去看看功能
      console.log(shopid)
      this.$router.push({name:"shop",params:{shopid}});
    }
  },
  mounted() {
     //加载广告
        let that = this;
        let id=0;
          ax.post({
            url:"/api/index.php/App/UserPromotion/",
            body: "appid=81423&clienttype=2&sign=15334149a899b15f63658fb8148516c9&action=getIndexInfo&cityid=110100&userid=1008010&uuid=fd14e57682a18d2af70116bdefbb0224&",
            cb : function (response) {
              // console.log(response)
                that.url = response.data.data.picurl;
                id = response.data.data.id;
                setTimeout(function() {
                  that.advshow=false;
                }, 1000);
                //请求数据
                ax.post({
                  url:"/api/index.php/App/UserPromotion/",
                  body: "appid=81423&clienttype=2&sign=ac31a01eeb37f90f47eb75a144c2a4d5&id="+id+"&action=getDetail&userid=1008010&uuid=fd14e57682a18d2af70116bdefbb0224&",
                  cb : function (response) {
                    // console.log(response.data.data.info)
                    // console.log(response.data.data.info.propic)
                    that.result = response.data.data.info;
                  }
                })
            }
          })
          //加载商品数据
                ax.post({
                  url:"/api/index.php/App/UserPromotion/",
                  body: "appid=81423&getnum=1&clienttype=2&sign=92c750e2ff2d178d1391d60fd67aaae1&action=getCash&userid=1008010&uuid=fd14e57682a18d2af70116bdefbb0224&",
                  cb : function (response) {
                    console.log(response)
                    // console.log(response.data.data.info.propic)
                    that.cont = response.data.data;
                  }
                })

  }  
}
</script>

<style lang='scss' scoped>
 @import '../style/usage/core/reset';
#gold {
  width : 100%;
  height:100%;
  @include flexbox();
  @include align-items(center);
  @include justify-content(center);
  @include flex-direction(column);
  background: #fff;
  #adv{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10002;
  }
  #head{
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    color: #616161;
    @include border(0 0 .01rem 0,#dcdcdc);
  }
  #scroll{
    @include flex();
    width: 100%;
    background: #efefef;
    // height: 400px;
    overflow-y: scroll;
    #top{
      width: 100%;
      height:1.5rem;
       img{
          width: 100%;
          // height: 300px;
        }
    }
    #name{
      width: 100%;
      background: #fff;
      font-size: .12rem;
      padding: 0 .1rem;
      p{
        width: 100%;
        height: .3rem;
        line-height: .3rem;
        color: #2b2b2b;
        span{
          color: #626262;
        }
      }
    }
    #content{
      width: 100%;
      padding: .04rem .1rem;
      background: #fff;
      margin-top: .1rem;
      font-size: .12rem;
      color: #2b2b2b;
      span{
        color: #626262;
        height: .3rem;
        line-height: .3rem;
        color: #626262;
      }
    }
    #info{
      width: 100%;
      margin-top: .1rem;
      font-size: .12rem;
      @include flexbox();
      @include flex-direction(column);
      
      background: #fff;
      padding: 0 .1rem;
      #look{
        width: 100%;
        padding: .04rem 0;
        @include flexbox();
        @include align-items(center);
        @include border(0 0 .01rem 0,#dcdcdc);
         img{
          width: .4rem;
          height: .4rem;
          @include border-radius(50%);
        }
        span{
          @include flex();
          color: #636363;
          text-align: center;
          @include ellipsis(null,1);
          padding: 0 .1rem;
        }
        a{
          width: .6rem;
          color: #fa070b;
        }
      }
      #level{
       width: 100%;
       padding: .1rem;
       @include flexbox();
        @include border(0 0 .01rem 0,#dcdcdc);
       #left{
         height: 100%;
         color: #626262;
         @include flex();
         @include flex-direction(column);
         img{
          //  width: 100%;
           height: .2rem;
         }
       }
        #right{   
         @include flex();
         @include flexbox();
         @include justify-content(flex-end);
         @include align-items(center);
         img{
           width: .3rem;
           height: .3rem;
           margin-left: .1rem;
         }
       }
      }
      #address{
        width: 100%;
        padding: 0 .1rem;
        @include border(0 0 .01rem 0,#dcdcdc);
        span{
           width: 100%;
           height: .3rem;
          line-height: .3rem;
          color: #626262;
        }
        p{
           width: 100%;
           height: .3rem;
          line-height: .3rem;
          color: #2b2b2b;
        }
      }
       #tel{
         @include flexbox();
        width: 100%;
        padding: 0 .1rem;
        @include border(0 0 .01rem 0,#dcdcdc);
        #left{
          @include flex();
          @include flexbox();
          @include flex-direction(column);
            span{
              width: 100%;
              height: .3rem;
              line-height: .3rem;
              color: #626262;
            }
            p{
              width: 100%;
              height: .3rem;
              line-height: .3rem;
              color: #2b2b2b;
            }
        }
        #right{
          @include flex();
          @include flexbox();
          @include align-items(center);
          @include justify-content(flex-end);
          img{
            width: .3rem;
            height: .3rem;
          }
        }
      }
    }
      #goods{
        padding: 0 .1rem;
        background: #fff;
        width: 100%;
        margin-top: .1rem;
        @include flexbox();
        @include flex-direction(column);
        #top{
          @include flexbox();
          width: 100%;
          height: .4rem;
          font-size: .12rem;
          color: #626262;
          @include align-items(center);
          @include border(0 0 .01rem 0,#dcdcdc);
          b{
            @include flex();
            font-weight: normal;
          }
          img{
            width: .12rem;
            height: .12rem;
            margin-left: .06rem;
          }
        }
        ul{
          width: 100%;
          padding-bottom: .06rem;
          @include flexbox();
          @include flex-direction(column);
          li{
            @include flexbox();
            width: 100%;
            #leftcon{
              width: .6rem;
              height: .6rem;
              border:0;
              margin-right: .1rem;
            }
            #rightcon{
              @include flex();
              @include flexbox();
              @include flex-direction(column);
              >p{
                width: 100%;
                font-size: .14rem;
                color: #333;
                @include ellipsis(null,1);
              }
              >b{
                width: 100%;
                font-weight: normal;
                 font-size: .12rem;
                span{
                  color: #333;
                  &:nth-child(1){
                    text-decoration:line-through; 
                    margin-right: .1rem;
                  }
                }
              }
              >i{
                @include flexbox();
                width: 100%;
                span{
                  width: 70%;
                  color: #e80c0c;
                }
                b{
                  @include flex();
                  background: #feb500;
                  height: 100%;
                  color: #fff;
                  font-weight: normal;
                  text-align: center;
                  font-size: .12rem;
                  padding: .02rem 0;
                  margin-bottom: .02rem;
                  @include border-radius(.1rem);
                }
              }

            }
          }
        }
      }
      #sub{
        width: 100%
        height.4rem;
        
        padding: .1rem 5%;
        button{
          width: 100%;
          color: #fff;
          background: red;
          height: .4rem;
          line-height: .4rem;
          text-align: center;
          border: none;
          @include border-radius(.2rem);
        }
      }
  }
  
}
</style>
