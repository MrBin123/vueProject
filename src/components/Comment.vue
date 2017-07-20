<template>
  <div class="comments">
        <mt-loadmore :bottom-method="loadBottom" :autoFill="false" @bottom-status-change="handleBottomChange" ref="loadmore">
        <ul class="commentbody">
          <li v-for="(bo,i) in commentscode" :key="i">
              <div class="users">
                <p class="user">
                    <img :src="bo.facepicurl"/><span>{{bo.nicheng}}</span>
                </p>
                <p class="time">{{bo.createdate}}</p>
              </div>
              <div class="evaluate">
                <p class="userlevel">
                    <img v-for="(v,i) in parseInt(bo.levels)" :key="i" src="../imgs/w_icon_comment_star_red.png"/>
                </p>
                <p class="say">{{bo.content}}</p>
                <p class="shaidan">
                    <img v-for="(m,i) in bo.shaidanpics.length" :key="i" :src="bo.shaidanpics"/>
                </p>
                <p class="kuanshi">{{bo.skuvalue}}</p>
              </div>
            </li>
            <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"></span>
            <span v-show="topStatus === 'loading'">Loading...</span>
          </div>
        </ul>
        </mt-loadmore>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Loadmore } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);

export default {
  name:'Comment',
  props:['listid'],
  data(){
    return{
        commentscode:[],
        pageindex:1,
        topStatus:'',
     }
  },
  methods:{
    loadBottom() {
        this.pageindex += 1;
        // console.log(this.pageindex)
        axios({
            url:'/appapi/index.php/App/ShopGoods/',
            method:'post',
            headers:{
                ContentType:'application/x-www-urlencoded;charset=UTF-8'
            },
            data:'sign=1d93a7906269fd0195f6f03afcc34b34&pagesize=10&shopid=&goodsid=2873&clienttype=2&pageindex='+this.pageindex+'&action=getGoodsComments&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&'
        }).then(responseData=>{
        this.commentscode=this.commentscode.concat(responseData.data.data);
        // console.log(responseData)
        })
        // this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
    },
    handleBottomChange(status) {
        this.topStatus = status;
      },
  },
  mounted(){
     axios({
         url:'/appapi/index.php/App/ShopGoods/',
         data:'sign=1d93a7906269fd0195f6f03afcc34b34&pagesize=10&shopid=&goodsid='+this.listid+'&clienttype=2&pageindex=1&action=getGoodsComments&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&',
         method:'post'
     }).then(responseData=>{
        this.commentscode=responseData.data.data
        // this.shaidan=this.commentscode.shaidanpics;
        // console.log(responseData)
        // console.log(this.shaidan) 
      })
    //   console.log(this.listid);
  },
}
</script>

<style lang="scss" scoped>
    .comments{
        width:100%;
        .commentbody{
            width:100%;height:100%;overflow-y:scroll;
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


