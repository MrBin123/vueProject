<template>
  <div id="searchresult">
    <div id="head" @click="back">
      <img id="space" src="../imgs/ic_chakanline_back.png"></img>
      <div id="search" >
        <img src="../imgs/lib_story_img_search_bt.png"></img>
        <input type="text" :placeholder="getkey"/>
      </div>
      <p id="start"></p>
    </div>    
       <div id="outer">
        <mt-loadmore  :bottom-method="loadBottom" ref="loadmore" :autoFill="false" @bottom-status-change="handleTopChange">     

          <ul id="shop">
              <li v-for="(v,i) in result" :key="i" @click="toDetail(v.listid)">
                <div>
                  <img v-lazy="v.picurl"></img>
                  <b>{{v.goodsname}}</b>
                  <p><span>￥{{v.price}}</span><span>已售{{v.sellnum}}</span></p>
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
  import ax from '../util/Axios';
  import { Loadmore } from 'mint-ui';
  import { Lazyload } from 'mint-ui';
  Vue.use(Lazyload);
  import { Toast } from 'mint-ui';
  import 'mint-ui/lib/style.css'
  Vue.component(Loadmore.name, Loadmore);
export default {
  name: 'search-result',
  data(){
    return {
      result: "",
      topStatus:"",
      pageindex:1,
    }
  },
  methods:{
    toDetail: function (listid) {
       this.$router.push({name:"detail",params:{listid}});
    },
    back: function () {
      this.$router.go(-1);
    },
    handleTopChange:function(status){
     this.topStatus = status;
    },
    loadBottom: function () {
        let that = this;
        this.pageindex++;
        console.log(this.$store.state.keyword)
        ax.post({
            url:"/api/index.php/App/ShopGoods/",
            body: "maxprice=&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=&pageindex="+this.pageindex+"&minprice=&listorder=&clienttype=2&classid=&pagesize=10&keywords="+that.$store.state.keyword,
            cb : function (response) {
                    console.log(response)
                    if (response.data.data != "") {
                      that.result = that.result.concat(response.data.data);
                    }else{
                      Toast({
                        message: '我是有底线的!',
                        position: 'bottom',
                        duration: 1000
              });
             }
                  
          }
        })



    }
  },
  computed:{
    getkey(){
      //  console.log(this.$store)
      //  this.result=this.$store.keyword;
         let that = this;
     ax.post({
        url:"/api/index.php/App/ShopGoods/",
        body: "maxprice=&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=&pageindex=1&minprice=&listorder=&clienttype=2&classid=&pagesize=10&keywords="+this.$store.state.keyword,
        cb : function (response) {
                // console.log(response)
                if (response.data.data != "") {
                  that.result = response.data.data;
                }else{
                  Toast({
                    message: '我是有底线的!',
                    position: 'bottom',
                    duration: 1000
                  });
                }
                // that.$refs.loadmore.onBottomLoaded();
       }
    })
        return this.$store.state.keyword;
    }
    
  },
  mounted(){
    // let that = this;
    //  ax.post({
    //     url:"/api/index.php/App/ShopGoods/",
    //     body: "maxprice=&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=&pageindex=1&minprice=&listorder=&clienttype=2&classid=&pagesize=10&keywords="+this.$store.state.keyword,
    //     cb : function (response) {
    //             // console.log(response)
    //             if (response.data.data != "") {
    //               that.result = response.data.data;
    //             }else{
    //               Toast({
    //                 message: '我是有底线的!',
    //                 position: 'bottom',
    //                 duration: 1000
    //               });
    //             }
    //             that.$refs.loadmore.onBottomLoaded();
    //    }
    // })
  }
 
}
</script>

<style lang='scss' scoped>
 @import '../style/usage/core/reset';
#searchresult {
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
        overflow-y: scroll;
       
          #shop{
          @include flex();
          width: 100%;
          @include flexbox();
          @include flex-flow(row wrap);
          // @include justify-content(center);
          padding: .02rem;
          overflow: hidden;
          li{
            @include flexbox();
            margin: .02rem;
            width: 48.6%;
            // height: 280px;
            @include flex-direction(column);
            @include align-items(center);
            @include justify-content(center);
            background:#fff;
            img{
              width: 100%;
              // height: 1.5rem;
            }
            image[lazy=loading] {
                width: 100%;
              margin: auto;
            }
          b{
            width: 100%;
            height: .38rem;
            color: #343434;
            @include ellipsis(null,2   );
            overflow: hidden;
            font-size: .12rem;
            text-align: left;
             font-weight: 200;
          }
            p{
              @include flexbox();
              width: 100%;
              height: .3rem;
              padding:  .04rem;
              color: #666;
                 span{
                    @include border(.02rem 0 0 0 ,#dedede);
                    width: 100%;
                    padding: .04rem;
                    color: #646464;
                    &:nth-child(1){
                      width: 50%;
                      height: 100%;
                      color: #ce1211;
                    }
                    &:nth-child(2){
                      width: 50%;
                      height: 100%;
                      color: #9e9e9e;
                      text-align: right;
                    }
                  }
              }
            }     
            }
  
      }
   




}
</style>
