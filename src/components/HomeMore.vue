<template>
  <div id="moreresult">
    <my-loading v-show="load"></my-loading>
    <div id="head" >
      <img id="space" src="../imgs/w_back_page.png" @click="back"></img>
      <div id="search" @click="toSearch">
        <img src="../imgs/lib_story_img_search_bt.png"></img>
        <input type="text" placeholder="请输入你想搜索的内容" disabled />
      </div>
      <p id="start"></p>
    </div>    
      <div id="outer">
         <ul id="left">
           <li v-for="(v,i) in shops" :key="i" @click="check(v,i)" :class="{active: i== index}" >
              <img v-if="i==index" :src="v.icon1active"></img>
              <img v-else :src="v.icon1"></img>  
              <p>{{v.name}}</p>
           </li>
         </ul>
         <ul id="right">
            <li v-for="(v,i) in result" :key="i">
              <p>{{v.name}}</p>
              <b><span v-for="(item,index) in v.sons" :key="index" @click="goods(item)">{{item.name}}</span></b>
            </li>
         </ul>
       </div>
  </div>
 
</template>

<script>
  import Vue from 'vue'
  import ax from '../util/Axios';
  import load from '../util/Loading';
  import { Lazyload } from 'mint-ui';
  Vue.use(Lazyload);
  import { Toast } from 'mint-ui';
export default {
  name: 'more-result',
  data(){
    return {
      shops:"",
      result: "",
      topStatus:"",
      pageindex:1,
      index:0,
      load:true
    }
  },
  components:{
    "my-loading":load
  },
  methods:{
    goods: function (item) {
      console.log(item);
      this.$store.commit('changeid',{
        classid: item.id,
        classname :item.name
      })
       this.$router.push('/main/postage');
    },
    toSearch: function () {
      this.$router.push('/search');
    },
    back: function () {
      this.$router.go(-1);
    },
    check: function (v,i) {
      this.load = true;
      this.index = i;
      // console.log(v,i)
      let that = this;
      ax.post({
        url:"/api/index.php/App/Shop/",
        body: "maxprice=&pid="+v.id+"&sign=12f6810d0feb7d845849daf8140e6e58&isfixed=&action=getGoodsClass&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&getgoodsnum=&isbaoyou=&minprice=&depth=2&areaid=&clienttype=2&keywords=&",
        cb : function (response) {
                // console.log(response)
                if (response.data.data != "") {
                  that.result = response.data.data;
                  // console.log(response.data.data)
                }else{
                  Toast({
                    message: '我是有底线的!',
                    position: 'bottom',
                    duration: 1000
                  });
                }
            that.load = false;
       }
    })
    }

  },

  mounted(){
// console.log(this.$route.params.pid)
   this.load = true;
    let that = this;
     ax.post({
        url:"/api/index.php/App/Shop/",
        body: "maxprice=&pid="+this.$route.params.pid+"&sign=12f6810d0feb7d845849daf8140e6e58&isfixed=&action=getGoodsClass&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&getgoodsnum=&isbaoyou=&minprice=&depth=2&areaid=&clienttype=2&keywords=&",
        cb : function (response) {
                // console.log(response)
                if (response.data.data != "") {
                  that.shops = response.data.data; 
                  // console.log(response.data.data)
                   ax.post({
                      url:"/api/index.php/App/Shop/",
                      body: "maxprice=&pid="+that.shops[0].id+"&sign=12f6810d0feb7d845849daf8140e6e58&isfixed=&action=getGoodsClass&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&getgoodsnum=&isbaoyou=&minprice=&depth=2&areaid=&clienttype=2&keywords=&",
                      cb : function (response) {
                              // console.log(response)
                              if (response.data.data != "") {
                                that.result = response.data.data;
                                // console.log(response.data.data)
                              }else{
                                Toast({
                                  message: '我是有底线的!',
                                  position: 'bottom',
                                  duration: 1000
                                });
                              }
                     }
                  })
                }else{
                  Toast({
                    message: '我是有底线的!',
                    position: 'bottom',
                    duration: 1000
                  });
                }
            that.load = false;
       }
    })
  
  }
 
}
</script>

<style lang='scss' scoped>
 @import '../style/usage/core/reset';
#moreresult {
  width : 100%;
  height:100%;
  @include flexbox();
  @include flex-direction(column);

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
              background: #fff;
            }
            img{
              width: .2rem;
              height: .2rem;
              margin-right: .1rem;
            
            }
          }
        }
     
  #outer{
        width: 100%;
        height: 100%;

        @include flexbox();
        // background: red;
        overflow-y: scroll;
        #left{
          width: 25%;
          overflow-y: scroll;
          @include flexbox();
          @include flex-direction(column);
          background: #f1f2f4;
          // padding: .1rem 0;
          li{
            width: 100%;
            text-align: center;
            padding: .04rem .04rem;
            @include border(0 0 1px 0, #fff);
              img{
                width: .4rem;
                height: .4rem;
              }
              p{
                font-size: 12px;
                color: #333;
                height: .24rem;
                line-height: .24rem;
              }  
              &.active{
              p{color: #f60200;}
              background: #fff;
              }
           }
           
        }
        #right{
          width: 75%;
          height: 100%;
          background: #fff;
          overflow-y: scroll;
           padding: .1rem;
          li{
            @include flexbox();
            @include flex-direction(column);
            width: 100%;
            @include border(0 0 1px 0,#e5e5e5);  
            p{
              line-height: .3rem;
              width: 100%;
              color: #e8070f;
               font-size: 14px;
            }
            b{
              // width: 100%;
              // @include flexbox();
              font-weight: normal;
              line-height: .3rem;
              @include flex-wrap(row wrap);
                   
              span{
                // width: 33%;
                color: #666;
                font-size: 12px;
                margin-left:.1rem;
              }
            }
          }
        }
       }
   




}
</style>
