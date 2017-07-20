<template>
  <div id="shops">
       <my-load v-show="show"></my-load>
       <my-alert :check="check" :msg="msg" v-show="alertshow"></my-alert>
    <div id="top">
        <div id="head">
            <img id="space" src="../imgs/w_back_page.png" @click="back"></img>
            <div id="search" >
                <img src="../imgs/lib_story_img_search_bt.png" ></img>
                <input type="text" placeholder="搜索店内商品" v-model="value"/>
            </div>
            <p id="start" @click="start(value)">搜索</p>
        </div>
        <div id="headother">
            <img :src="result.logo"></img>
            <div id="center">
                <p>{{result.name}}</p>
                <img :src="result.levelimg"></img>
            </div>
            <button>进入官网</button>
        </div>
          <ul id="nav">
            <li>
                <span>{{result.goodsnum}}</span>
                <p>全部</p>
            </li>
         
            <li>
                <span>{{result.sellgoodsnum}}</span>
                <p>已售</p>
            </li>
             
            <li>
                <span>{{result.newgoodsnum}}</span>
                <p>新上</p>
            </li>
             
            <li>
                <span>{{result.collnum}}</span>
                <p>收藏</p>
            </li>
        </ul>
    </div>
       <div id="other">
           <mt-loadmore  :bottom-method="loadBottom" ref="loadmore" :autoFill="false" @bottom-status-change="handleTopChange" :bottom-all-loaded="allLoaded">     
                <ul id="gs">
                        <li v-for="(v,i) in goods" :key="i">
                            <img v-lazy="v.picurl"><img>
                                <p>{{v.goodsname}}</p>
                                <b>￥{{v.price}}</b>
                        </li>
                    </ul>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">加载更多...</span>
                    <span v-show="topStatus === 'loading'">Loading...</span>
                    <span v-show="topStatus === 'drop'">释放更新</span>
                </div>
            </mt-loadmore>
       </div>
        
        <div id="buttom">
           <p  :class="active" @click="collect"><b></b><span>收藏店铺</span></p>
           <p @click="detail"></p>
           <p></p>
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
Vue.component(Loadmore.name, Loadmore);
export default {
  name:"shops",
  data(){
      return {
          value: "",
          result:"",
          pageindex:1,
          goods:"",
          topStatus: "",
          show:false,
          keywords:"",
          allLoaded:false,
          active:"",
          check:"",
          msg:"",
          alertshow:false
      }
  },
  components:{
      'my-load':load,
      'my-alert':myalert
  },
  mounted(){
      let that = this;
      this.show = true;
       ax.post({
           url:"/api/index.php/App/Shop/",
           body: "getaddr=1&sign=ec0708501f61035a8c858c8e9d981b9b&action=getShopInfo&uuid=fd14e57682a18d2af70116bdefbb0224&shopid="+this.$route.params.shopid+"&appid=81423&clienttype=2&getcontnet=1&userid=1008010&",
           cb : function (response) {
                that.result = response.data.data;
                if (that.result.isshopcollect=="1") {
                    //判断是否收藏
                    that.active="active"
                }
                that.show = false;
            }
        })
        //商品加载
        ax.post({
           url:"/api/index.php/App/ShopGoods/",
           body: "maxprice=&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid="+this.$route.params.shopid+"&appid=81423&isbaoyou=&pageindex=1&minprice=&listorder=&clienttype=2&classid=&pagesize=10&keywords=&",
           cb : function (response) {
                // console.log(response)
                // console.log(response.data.data)
                that.goods = response.data.data;
                that.show = false;
            }
        })

  },
  methods:{
      detail(id){
          //详情调转
          this.$router.push({name:"merchant",params:{id:parseInt(this.$route.params.shopid)}})
      },
      collect(){
          //收藏
          let that = this;
        //   this.active="active";
          console.log(123)
           this.show = true;
           let body="";
            if (that.active=="active") {
                //取消收藏
                this.active="";
                body="shopid="+this.$route.params.shopid+"&appid=81423&clienttype=2&sign=9d0cbb5ac19f48a031193d24cfb13a52&action=delShopCollect&userid=1008010&uuid=fd14e57682a18d2af70116bdefbb0224&";
            }else{
                //添加收藏
                this.active="active";
                body="shopid="+this.$route.params.shopid+"&appid=81423&clienttype=2&sign=b6ed702543bcd23142bd4993baa02193&action=addShopCollect&userid=1008010&uuid=fd14e57682a18d2af70116bdefbb0224&";
            }
            ax.post({
           url:"/api/index.php/App/UserCollect/",
           body: body,
           cb : function (response) {
                that.alertshow=true;
                that.msg=response.data.msg;
                setTimeout(function() {
                    that.alertshow=false;
                }, 1000);
                that.show = false;
            }
        })
      },
      back: function () {
          this.$destroy();
          this.$router.go(-1);
      },
      start: function (value) {
        //   console.log(value)
      
          this.pageindex=1;
          let that = this;
          this.keywords=value;
             this.show = true;
            ax.post({
           url:"/api/index.php/App/ShopGoods/",
           body: "maxprice=&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=103358&appid=81423&isbaoyou=&pageindex=1&minprice=&listorder=&clienttype=2&classid=&pagesize=10&keywords="+value,
           cb : function (response) {
                // console.log(response)
                // console.log(response.data.data)
                that.goods = response.data.data;
                that.show = false;
                that.allLoaded = true;
            }
        })
      },
      handleTopChange(status) {
        // console.log(status)
        this.topStatus = status;
      },
      loadBottom(){
          let that = this;
          this.pageindex++;
          this.show = true;
         ax.post({
           url:"/api/index.php/App/ShopGoods/",
           body: "maxprice=&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid="+this.$route.params.shopid+"&appid=81423&isbaoyou=&pageindex="+this.pageindex+"&minprice=&listorder=&clienttype=2&classid=&pagesize=10&keywords=&",
           cb : function (response) {
                // console.log(response)
                 if (response.data.data != "") {
                        that.goods = that.goods.concat(response.data.data);
                        // console.log(that.result)
                    }else{
                        Toast({
                        message: '我是有底线的!',
                        position: 'bottom',
                        duration: 1000
                        });
                    }
                    that.show = false;
            }
        })
      }
  }
}
</script>
<style lang="scss" scoped>
    @import '../style/usage/core/reset';
    #shops {
        width : 100%;
        height:100%;
        background: #efefef;
        @include flexbox();
        @include flex-direction(column);
        #top{
            width: 100%;

                #head{
                width: 100%;
                height: .4rem;
                @include flexbox();
                @include flex-direction();
                @include align-items(center);
                @include justify-content(center);
                #space{
                    // @include flex(1);
                    width: 16px;
                    height: 20px;
                    margin: 0 .1rem;
                }
                #start{
                    margin: 0 .1rem;
                    color: #666;
                }
                #more{
                    height: 100%;
                    @include flex(1);
                    @include flexbox();
                    @include align-items(center);
                    margin-left: .1rem;
                    img{
                    width: .3rem;
                    height: .3rem;
                    }
                }
                #search{
                    height: .26rem;
                    @include flex(5);
                    @include flexbox();
                    @include flex-direction();
                    @include align-items(center);
                    @include justify-content(center);
                    background: #fcfcfc;
                    @include border-radius(10px);
                    color: #b1b1b1;
                    input{
                    border: none;
                    }
                img{
                    width: .2rem;
                    height: .2rem;
                    margin-right: .1rem;
                
                }
                }
                }
          #headother{
            width:100%;
            background: url('../imgs/w_spsjdp.jpg');
            
            @include flexbox();
            @include align-items(center);
            padding: .2rem .1rem;
            >img{
                width: .5rem;
                height: .5rem;
            }
            #center{
               margin: 0 .1rem;    
               @include flex();
               p{
                   color: #fff;
                   @include ellipsis(null,1);
               }
               img{
                   height: .2rem;
                   margin-top: .04rem;
               }
            }
            button{
                border: none;
                color: #333;
                background: #fff;
                font-size: .12rem;
                padding: .04rem .1rem;
                @include border-radius(.06rem);
            }
          }
        #nav{
            @include flexbox();
            background: #fff;
            padding: .06rem 0;
                li{
                @include flex();
                text-align: center;
                height: .3rem;
                font-size: .12rem;
                &:nth-child(1){
                    @include border(0 1px 0 0);
                        color: #ff2023;
                }
                &:nth-child(2){
                    @include border(0 1px 0 0);
                }
                &:nth-child(3){
                    @include border(0 1px 0 0);
                }
                }
            }
       
        }
        
            #other{
                width: 100%;
                overflow-y: scroll;
                height: 100%;
                // 
                #gs{
                    width: 100%;   
                    @include flexbox();   
                        @include flex-flow(row wrap);
                        li{
                            @include flexbox();
                            @include flex-direction(column);
                            width: 48%;
                            margin: 1%;
                            background: #fff;
                            img{
                            width: 100%;
                            //    height: 100%;
                            // width: 50%;
                            // height: 50%;
                            }
                            p{
                                @include ellipsis(null,1);
                                @include border(0 0 1px 0,#dcdcdc);
                                color: #333;
                                 padding: .04rem ;
                                font-size: .12rem;
                            }
                            b{
                                color: #c82a1e;
                                font-weight: 600;
                                padding: .04rem;
                            }
                    }
                }
            }
         
          #buttom{
                width: 100%;
                background: #fff;
                height:.6rem;
               @include flexbox();
                p{
                    @include flexbox();
                    @include flex();
                    height: 100%;
                    @include align-items(center);
                    @include justify-content(center);
                    @include flex-direction(column);
                   
                    &:nth-child(1){
                        margin-top: .02rem;
                        &.active{
                             span{color: red;}
                            b{
                                background: url('../imgs/storecollection_yes.png') no-repeat center center;
                                background-size: 100%;
                            }
                        }
                      b{
                        width: .2rem;
                        height: .2rem;
                        background: url('../imgs/storecollection_no.png') no-repeat center center;
                        background-size: 100%;
                      
                      }
                     
                    span{
                        font-size: .12rem;
                        color: #727272;
                        margin-top: .02rem;
                        transform: scale(0.8);
                    }
                        @include border(0 1px 0 0,#dcdcdc);
                    }
                     &:nth-child(2){
                        @include border(0 1px 0 0,#dcdcdc);
                        background: url('../imgs/w_shop_des.png') no-repeat center center;
                        background-size: 40%;
                    }
                    &:nth-child(3){
                        @include border(0 1px 0 0,#dcdcdc);
                        background: url('../imgs/w_shop_ljzhf.png') no-repeat center center;
                        background-size: 40%;
                    }
                   
                }
                
            }
           
           
    }
</style>

