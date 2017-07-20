<template>
  <div id="home">
    <img id="gotop"  src="../imgs/btn_go_top.png" @click="gotop" v-show="top"></img>
    <my-loading v-show="show"></my-loading>
    <!-----------------------头部------------------------>
    <my-header></my-header>
    <!-----------------------可滚动区域------------------------>
    <div class="scro" id="scro">
      <!-------------轮播-------------->
      <mt-swipe :show-indicators="true">
        <mt-swipe-item><img :src="indexad.picurl">
        </mt-swipe-item>
      </mt-swipe>
      <!-------------商品分类-------------->
      <ul class="classify">
        <li v-for="(v,i) in claurl" :key="i" @click="setclass(v,i)">
          <img :src="v.picurl"/>
          <h4>{{v.classname}}</h4>
        </li>
      </ul>
      <!-------------广告-------------->
      <div class="homeads">
        <img class="xxx" :src="homead.leftadpic" @click="setadvs(homead.leftadurl,0)"></img>
        <img class="xx" :src="homead.rightad1pic" @click="setadvs(homead.rightad1url,1)"></img>
        <img class="x" :src="homead.rightad2pic" @click="setadvs(homead.rightad2url,2)"></img>
        <img class="x" :src="homead.rightad3pic" @click="setadvs(homead.rightad3url,3)"></img>
      </div>
      <!-------------加盟企业-------------->
      <div class="company">
        <div class="comtitle">
          <img src="../imgs/img_icon_location.png"/>
          <h3>附近商家</h3>
          <i>更多></i>
        </div>
        <ul class="nearcompany">
          <li v-for="(com,i) in nearcompany" :key="i" @click="gotomerchant(com.id)">
            <img :src="com.picurl">
            <h5>{{com.shopname}}</h5>
            <div class="pos1">
              <img class="pospic" src="../imgs/w_gold_address_icon.png">
              <span>{{com.distance}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-------------热卖商品-------------->
      <div class="hotgoods">
        <div class="maintitle">
          <i>
            <p>热卖商品</p>
          </i>
        </div>
        <mt-loadmore :bottom-method="loadBottom"  ref="loadmore">
        <ul class="goods">
          <li v-for="(goo,i) in goods" :key="i" @click="getlistid(goo.listid)">
            <img :src="goo.picurl">
            <p>{{goo.goodsname}}</p>
            <div class="price">
              <i><img src="../imgs/w_qianfu.png">{{goo.price}}</i><em>已售{{goo.sellnum}}</em>
            </div>
          </li>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">刷新</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
          </div>
        </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
import ani from '../util/Loading.vue'
import axios from 'axios';
import Vue from 'vue';
import { Swipe, SwipeItem } from 'mint-ui';
import Header from './Header'
import { Loadmore } from 'mint-ui';
import jquery from '../util/jquery.min.js'
Vue.component(Loadmore.name, Loadmore);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  name: 'Home',
  components:{
    'my-header':Header,
    'my-loading':ani
  },
  data(){
    return {
      claurl:[],
      homead:{},
      indexad:{},
      nearcompany:[],
      goods:[],
      topStatus:'',
      index:1,
      show:true,
      top: false
    }
  },
  methods:{
    gotop: function () {
      //jquer实现滚动效果
      $('.scro').animate({ scrollTop: 0 }, 1000);
    },
    setadvs(data,index){
       if (index == 1) {
        //  window.location.href=data;
        // console.log(data)
        this.$store.homeadv=data;
        this.$router.push('/homeadv');
        }else{
         console.log(data)
         console.log(data.split(":"))
         let arr = data.split(":");
         this.$store.commit('changeid',{
           classid: arr[1],
           classname: arr[2]
         })
        this.$router.push('/main/postage');
       }
    },
    loadBottom() {
      this.index += 1;
      axios({
        url:'/appapi/index.php/App/ShopGoods/',
        method:'post',
        headers:{
          ContentType:'application/x-www-urlencoded;charset=UTF-8'
        },
        data:'pageindex='+this.index+ '&sign=9fd4947143dcd05fc525df7cd7ec0a05&action=getHotGoods&pagesize=10&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&clienttype=2&'
      })
      .then(responseData=>{
        this.goods=this.goods.concat(responseData.data.data)
      })
      this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    setclass(cla,index){
      // console.log(cla,index)  
      if (index == 6) {
        // console.log("线下实体店")
        this.$router.push('/offline');
      }else if (index == 7) {
          // console.log("更多")
          this.$router.push({name:'homemore',params:{pid:cla.classid}}); 
      }else{
        this.$router.push('/main/postage');
        this.$store.commit('changeid',cla)
      }
     
    },
    getlistid(listid){
      this.$router.push({name:'detail',params:{listid}})
    },
    setgoods(goods){
      this.$store.commit('getgoods',goods);
      this.$router.push('/detail')

    },
    gotomerchant(id){
      this.$router.push({name:'merchant',params:{id}})
    }
  },

  mounted(){
    let that = this;
    $('.scro').scroll(function (e) {
      //  console.log($(this).scrollTop())
      if ($(this).scrollTop() == 0) {
        that.top = false;
      }
      if ($(this).scrollTop()>100) {
         that.top = true;
      }
    })
    axios({
      url:'/appapi/index.php/App/ShopIndex/',
      method:'post',
      headers:{
        ContentType:'application/x-www-urlencoded;charset=UTF-8'
      },
      data:'sign=038664a97bfb66e82e01e62f0ce478ed&action=getHomeInfo&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&clienttype=2'
    })
    .then(responseData=>{
      this.claurl=responseData.data.data.goodsclass;
      this.homead=responseData.data.data.homeads;
      this.indexad=responseData.data.data.indexad[0];
      //  this.show=false;
    })
    axios({
      url:'/appapi/index.php/App/ShopGoods/',
      method:'post',
      headers:{
        ContentType:'application/x-www-urlencoded;charset=UTF-8'
      },
      data:'sign=bcee83aefaa4779c1a53cbd3aedd2f56&pagesize=10&clienttype=2&pageindex=1&action=getHomeNearbyShop&appid=81427&lng=116.251537&uuid=d2912dc6692e1654b6bb93b8a7be8c33&lat=40.116696&cityid=&'
    })
    .then(responseData=>{
      this.nearcompany=responseData.data.data;
      // console.log(this.nearcompany);
      this.show=false;      
    })
    axios({
      url:'/appapi/index.php/App/ShopGoods/',
      method:'post',
      headers:{
        ContentType:'application/x-www-urlencoded;charset=UTF-8'
      },
      data:'pageindex=1&sign=9fd4947143dcd05fc525df7cd7ec0a05&action=getHotGoods&pagesize=10&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&clienttype=2&'
    })
    .then(responseData=>{ 
      this.goods=responseData.data.data;
      // console.log(this.goods);
      //  this.show=false;
    })

  }
}
</script>

<style lang='scss'>
  @import '../style/usage/core/reset.scss';
  #home{
      @include flex-direction(column);
      @include flex();
      @include flexbox();
      width:100%;
      #gotop{
        position: absolute;
        width: 36px;
        height: 36px;
        z-index: 999;
        right: .1rem;
        bottom: .6rem;
      }
      .scro{
        overflow:scroll;
        @include flex-direction(column);
        @include flex();
        width:100%;
        .mint-swipe{
          width:100%;
          height:1.5rem;
          .mint-swipe-indicators{
            width:200px;
            height:30px;
            .mint-swipe-indicator.is-active{
              background:#000
            }
          }
          img{
            width:100%;
            height:1.5rem;
          }
        };
        .classify{
          width:100%;
          // height:2.5rem;
          padding:10px 0;
          border-bottom:1px solid #ddd;
          @include flexbox();
          @include flex-flow(row wrap);
          li{
            width:25%;
            @include align-items(center);
            text-align: center;
            img{
              // width:100%;
              // height:.55rem;
              width: .4rem;
              height: .4rem;
            }
            h4{
              margin-top:6px;
              width:100%;
              color:#555;
              font-size:12px;
            }
          }
        };
        .homeads{
          width:100%;
          height:2.5rem;
          background:#eee;
          padding: 10px 0;
          .xxx{
            float:left;
            width:50%;
            height:100%;
          }
          .xx{
            float:left;
            width:50%;
            height:50%;
          }
          .x{
            float:left;
            width:25%;
            height:50%;
          }
        };
        .company{
          .comtitle{
            @include flexbox();
            @include align-items(center);
            width:100%; height:30px;padding:0 15px;
            img{
              width:10px;height:13px;
            }
            h3{
              margin-left:10px;color:#f00;
            }
            i{
              @include flex();
              text-align: right;
               color:#666;
            }
          }
          .nearcompany{
            width:100%;
            height:292px;
            padding-bottom: 5px;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #eee;
            overflow: hidden;
            li{
              width:32%;
              float:left;
              padding-left:4%;
              margin-top:5px;
              img{
                height:1rem;width:100%;
              }
              h5{
                width:100%;height:20px;text-align: center;font-size: 12px;
                overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
              }
              .pos1{
                float:right;
                padding-right: 5px;
                .pospic{
                  width:10px;height:10px;
                }
              }
            }
          }
        };
        .hotgoods{
          width:100%;
          .maintitle{
            height: 15px;line-height: 30px;
            i{
              display: block;margin:0 auto;height:50%;width:1rem;
              border-top:1px solid #ccc;margin-top:15px;position: relative;
              p{
                position: absolute;top:-15px;left:18px;background: #fff;padding:0 5px;
              }
            }
          }
          .goods{
            width:100%;
            @include flexbox();
            @include flex-wrap(wrap);
            li{
              width:45%;
              border:1px solid #eee;
              margin-left: 3%;
              margin-top:5px;
              img{width:100%;height:1.5rem;}
              p{width:100%;border-bottom: 1px solid #eee;overflow:hidden;
                white-space:nowrap;text-overflow:ellipsis;height: 30px;line-height: 30px}
              .price{
                width:100%;height:20px;
                i{
                  float: left;
                  margin-left: 5px;
                  img{
                    width:10px;height:12px;margin-right: 3px;
                  }
                }
                em{float: right;color:#999;font-size: 12px;margin-right: 3px;}
              }
            }
          }
        }
      }
  }
</style>
