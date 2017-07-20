<template>
  <div class="merchant">
    <img id="gotop"  src="../imgs/w_shoutudi_back.png" @click="back"></img>
    <mt-loadmore :bottom-method="loadBottom"  @bottom-status-change="handleBottomChange" ref="loadmore">
    <!--=======================轮播图=======================-->
    <mt-swipe :show-indicators="true">
        <mt-swipe-item v-for="(v,i) in bannerlist" :key="i"><img :src="v"/></mt-swipe-item>
    </mt-swipe>
    <!--==============================================-->
    <div class="introduce">
        <h4>{{resdata.name}}</h4>
        <div class="navagation">
            <p class="parti"><span>已参与：</span>{{resdata.sellgoodsnum}}</p>
            <p class="loc"><img src="../imgs/location_marker.png"/>{{resdata.city}}</p>
            <p class="gps"><a>一键导航</a></p>
        </div>
        <div class="kuang">
            <div class="s-left">
                <p><span>编<a>你</a>号：</span>{{resdata.id}}</p>                
                <p><span>服务商：</span>{{resdata.name}}</p>
                <p><span>等<a>你</a>级：</span><img :src="resdata.levelimg"></p>
                <p><span>地<a>你</a>址：</span>{{resdata.fulladdr}}</p>
            </div>
            <div class="s-right">
                <a>进入店家</a>
                <a>联系商家</a>
            </div>
        </div>
        <div class="title">
            <p class="concrete"><a :class="{active: active == 1}"  @click="shift(1)">商品详情</a></p>
            <p class="comment"><a :class="{active: active == 2}" @click="unshift(2)">晒单(<span>{{resdata.shaidan}}</span>)</a></p>
        </div>
        <div class="service" v-if="show">
            <iframe :src="resdata.content"></iframe>
            <!--<img :src="shareinfo.imgurl"/>-->
        </div>
        <ul class="shaidan" v-if="unshow">
            <li v-for="(v,i) in comments" :key="i">
                <div class="users">
                    <p class="user">
                        <img :src="v.facepicurl"/><span>{{v.nicheng}}</span>
                    </p>
                    <p class="time">{{v.createdate}}</p>
                </div>
                <div class="evaluate">
                    <p class="userlevel">
                        <img v-for="(m,i) in parseInt(v.levels)" :key="i" src="../imgs/w_icon_comment_star_red.png"/>
                    </p>
                    <p class="say">{{v.content}}</p>
                    <p class="shaidan">
                        <img v-for="(n,i) in v.shaidanpics.length" :key="i" :src="v.shaidanpics"/>
                    </p>
                    <p class="kuanshi">{{v.skuvalue}}</p>
              </div>
            </li>
        </ul>
    </div>
    </mt-loadmore>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Loadmore } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore)

export default {
  name:'Merchant',
  data(){
    return{
        bannerlist:[],
        resdata:{},
        active:1,
        shareinfo:{},
        show:true,
        unshow:false,
        comments:[],
        pageindex:1,
        topstatus:''
    }
  },
  computed:{
    id(){
        return this.$route.params.id;
    }
  },
  mounted(){
    /*--------------------商家介绍（shopid）--------------------*/      
    axios({
        url:'/appapi/index.php/App/Shop/',
        method:'post',
        headers:{
            ContentType:'application/x-www-urlencoded;charset=UTF-8'
        },
        data:'sign=2b1314da526e38c16dfde853aa895748&shopid='+this.id+'&clienttype=2&userid=1009780&action=getShopInfo&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&getaddr=1&getcontnet=1&'
    }).then(responseData=>{
        this.resdata=responseData.data.data;
        this.shareinfo=this.resdata.shareinfo;
        // console.log(responseData.data.data);
        // console.log( this.shareinfo);
    }),
    /*--------------------商家轮播图（）--------------------*/
    axios({
        url:'/appapi/index.php/App/Shop/',
        method:'post',
        headers:{
            ContentType:'application/x-www-urlencoded;charset=UTF-8'
        },
        data:'sign=e022812710dc0551fa527df1dce9f22e&action=getShopOtherInfo&appid=81427&shopid='+this.id+'&uuid=d2912dc6692e1654b6bb93b8a7be8c33&clienttype=2&'
    }).then(responseData=>{
        this.bannerlist=responseData.data.data.bannerlist;
        // console.log(responseData.data.data);
    })
  },
  methods:{
      shift(sign){
        this.active=sign;
        this.show=true;
        this.unshow=false
      },
      unshift(sign){
        this.active=sign;
        this.show=false;
        this.unshow=true;
        /*---------------------初次请求评论数据（shopid）----------------------------*/
        axios({
            url:'/appapi/index.php/App/ShopGoods/',
            method:'post',
            header:{
                 ContentType:'application/x-www-urlencoded;charset=UTF-8'
            },
            data:'sign=1d93a7906269fd0195f6f03afcc34b34&pagesize=10&shopid='+this.id+'&goodsid=&clienttype=2&pageindex=1&action=getGoodsComments&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&'
        }).then(responseData=>{
            this.comments=responseData.data.data;
            // console.log(this.comments)
        })
      },
      loadBottom() {
        this.pageindex += 1;
        // console.log(this.pageindex);
        /*----------------------评论的上拉刷新（pageindex）-------------------------*/
        axios({
            url:'/appapi/index.php/App/ShopGoods/',
            method:'post',
            headers:{
                ContentType:'application/x-www-urlencoded;charset=UTF-8'
            },
            data:'sign=1d93a7906269fd0195f6f03afcc34b34&pagesize=10&shopid='+this.id+'&goodsid=&clienttype=2&pageindex='+this.pageindex+'&action=getGoodsComments&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&'
        }).then(responseData=>{
        if(responseData.data.data.length == 0){
            return this.comments
        }else{
            this.comments=this.comments.concat(responseData.data.data);
        }
        // console.log(this.comments)
        })
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
    },
    handleBottomChange(status) {
        this.topStatus = status;
      },
    back(){
      this.$destroy();
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/usage/core/reset.scss';

.merchant{
    // @include flex();@include flexbox();@include flex-direction(column);
    height:100%;width:100%;background:#fff;overflow-y:scroll;
    #gotop{
        position: absolute;
        width: 36px;
        height: 36px;
        z-index: 999;
        left: .1rem;
        top: .1rem;
        opacity:0.5
    }
    .mint-swipe{
        width:100%;height:4rem;
        .mint-swipe-items-wrap{
            width:100%;height:100%;
            img{width:100%;height:100%;}
        }
    };
    .introduce{
        width:100%;
        h4{
            border-bottom:1px solid #eee;margin:0 10px;
        }
        .navagation{
            @include flexbox();@include align-items(center);padding:0 10px;
            width:100%;height:.3rem;border-bottom: 1px solid #eee;font-size:10px;
            .parti{@include flex();color:#888;}
            .loc{
                color: #555;
                img{width:.1rem;height:.15rem;margin-right:5px;}
            }
            .gps{
                margin-left:10px;
                a{
                    @include flex();display:block;width:.6rem;height:.2rem;background:#3d3;color:#fff;border-radius:5px;text-align: center;
                    line-height: .2rem;float: right;
                }
            }
            
        }
    };
    .kuang{
        @include flexbox();
        width:100%;padding:0 10px;font-size:12px;
        .s-left{
            @include flex(3);
            p{
                height:.2rem;line-height:.2rem;
                span{
                    color: #888;
                    a{color:#fff;}
                }
                img{width:.8rem;height:.15rem;}
            }

        }
        .s-right{
            @include flex(1);@include flexbox();@include justify-content(center);
            @include flex-direction(column);
            a{display: block;width:.7rem;height:.3rem;text-align: center;border:1px solid #eee;
            line-height: .3rem;margin-top:5px;color:#888;}
        }
    };
    .title{
        @include flexbox();width:100%;height:.4rem;line-height:.4rem;border-bottom:1px solid #eee;
        margin-top:10px;padding:0 10px;
        p{
            @include flex();height:100%;padding:0 10px;text-align:center;padding:5px 0;
            a{
                display:block;color:#000;height:.3rem;
                &:nth-child(1).active{color:#f00;}
            }
        }
        .concrete{
            a{border-right:1px solid #eee;}
        }
    };
    .service{
        width:100%;padding:0 10px;
        iframe{
            border:none;width:100%;
        }
    };
    .shaidan{
            @include flex();
            width:100%;
            li{
                border-top:1px solid #eee;padding:10px;
                .users{
                    width:100%;
                    .user{
                        float: left;
                        img{width:.3rem;height:.3rem;border-radius:50%;}
                        span{margin-left:10px;font-size:12px;}
                    }
                    .time{float: right;font-size:10px;color:#888;line-height: .35rem;}
                }
                .evaluate{
                    clear:both;margin-top:5px;
                    p{width:100%;}
                    .userlevel{
                        img{width:.15rem;height:.15rem;margin-right:2px;}
                    }
                    .say{
                        font-size:12px;color:#555;margin-top:10px;
                    }
                    .shaidan{
                        img{width:.5rem;height:.5rem;}
                    }
                    .kuanshi{
                        font-size:10px;color:#888;margin-top:5px;
                    }
                }
            }
    }
}
</style>


