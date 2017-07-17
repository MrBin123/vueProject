<template>
  <div id="postage">
    <my-load v-show="show"></my-load>
    <my-postage v-show="showAll" :postagesall="postages"  @fromPostageAll="getData" @classid="getClassID"></my-postage>
      <!-- <my-postage-country></my-postage-country>   -->
    <div id="head">
      <p id="space"></p>
      <div id="search">
        <img src="../imgs/lib_story_img_search_bt.png"></img>
        <p>搜索商品/店铺</p>
      </div>
      <p id="more">
        <img src="../imgs/w_more.png"></img>
      </p>
    </div>

    <ul id='nav'>
       <li @click="change(0)" :class="index" v-if="claid"><p>{{claid}}</p><b></b></li>
       <li @click="change(0)" :class="index" v-else><p> {{selectAll}}</p><b></b></li>
       <li @click="change(1)" :class="index"><p>全国</p><b></b></li>
       <li @click="change(2)" :class="index"><p>销量</p><b></b></img></li>
       <li @click="change(3)" :class="index"><p>价格</p><b></b></li>
       <li @click="change(4)" :class="index"><p>积分</p><b></b></li>
    </ul>

       <div id="outer">

        <mt-loadmore  :bottom-method="loadBottom" ref="loadmore" :autoFill="false" @bottom-status-change="handleTopChange">     

          <ul id="shop">
              <li v-for="(v,i) in result" :key="i">
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
import load from '../util/Loading';
import postageAll from './PostageAll';
import postageCountry from './PostageCountry';
import ax from '../util/Axios';
import { Loadmore } from 'mint-ui';
import { Lazyload } from 'mint-ui';
import { Toast } from 'mint-ui';
Vue.use(Lazyload);
import 'mint-ui/lib/style.css'
Vue.component(Loadmore.name, Loadmore);
export default {
  name: 'postage',
  data() {
   return {
      show : false,
      index :"",
      result : [],
      allLoaded: false,
      topStatus: "",
      showAll: false,
      postages: "",
      contents: "",
      selectAll: "全部",
      pageindex: 1,
      checked:{} //选择的类别
     }
  },
  methods:{
    getClassID: function (obj) {
       this.$store.commit('changeid',"");
       this.change(0);
       this.selectAll=obj.name;
       this.showAll = false;
       this.show = true
       let that = this;
          ax.post({
            url:"/api/index.php/App/ShopGoods/",
            body: "maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex=1&minprice=9.9&listorder=&clienttype=2&classid="+obj.classid+"&pagesize=10&keywords=&",
            cb : function (response) {
              // console.log("getClassID-------"+response.data.data)
              that.result = response.data.data;
              that.show = false;
              that.pageindex=1;
              that.checked={
                selectid: "0",
                classid:obj.classid
              };
            }
          })
    },
    getData:function (data) {
      // console.log(data);
      //全部分类
      this.$store.commit('changeid',"");
      if (data == "1") {
        this.selectAll="全部";
         this.showAll = !this.showAll;
          if (this.index === "active1") {
              this.index = "";
          }
          this.show = true
          this.pageindex =1;
          this.checked={};
          let that = this;
          ax.post({
            url:"/api/index.php/App/ShopGoods/",
            body: "maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex=1&minprice=9.9&listorder=&clienttype=2&classid=&pagesize=10&keywords=&",
            cb : function (response) {
              that.result = response.data.data;
              that.show = false;
            }
          })
      }
    },
    change: function (index) {
        let that = this;
        let body ="";
      switch (index) {
        case 0:
        //全部
          if (this.index === "active1") {
              this.index = "";
          }else{
            this.index="active1";
            
          }
           this.showAll = !this.showAll;
          break;
        case 1:
        //全国
          if (this.index === "active2") {
              this.index = "";
          }else{
            this.index="active2";
          }
          break;
        case 2:
        //销量
          this.showAll = false;
          this.pageindex=1;
          this.checked={
             selectid: "2",
             listorder:""
          };
          // let that = this;
          that.show = true;
          body ="";
          if (this.index === "active3") {
            this.index = "active31";
             this.checked.listorder= "sellnumOrderAsc";
            body="maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex=1&minprice=9.9&listorder=sellnumOrderAsc&clienttype=2&classid=&pagesize=10&keywords=&";
           
          }else{
            this.index="active3";
             this.checked.listorder= "sellnumOrderDesc";
            body="maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex=1&minprice=9.9&listorder=sellnumOrderDesc&clienttype=2&classid=&pagesize=10&keywords=&";
          }
            ax.post({
              url:"/api/index.php/App/ShopGoods/",
              body: body,
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
                that.show = false;
              }
            })
          break;
        case 3:
        //价格
      
          this.showAll = false;
          this.pageindex=1;
          this.checked={
             selectid: "3",
             listorder:""
          };
          that.show = true;
          body ="";
          if (this.index === "active4") {
              this.index = "active41";
              this.checked.listorder= "priceOrderAsc";
              body="maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex=1&minprice=9.9&listorder=priceOrderAsc&clienttype=2&classid=&pagesize=10&keywords=&";
          }else{
              this.index="active4";
              this.checked.listorder= "priceOrderDesc";
              body="maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex=1&minprice=9.9&listorder=priceOrderDesc&clienttype=2&classid=&pagesize=10&keywords=&";
              
          }
           ax.post({
              url:"/api/index.php/App/ShopGoods/",
              body: body,
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
                that.show = false;
              }
            })
          break;
        case 4:
        //积分
        
          this.showAll = false;
          this.pageindex=1;
          this.checked={
             selectid: "4",
             listorder:""
          };
          that.show = true;
          body ="";
           if (this.index === "active5") {
              this.index = "active51";
              this.checked.listorder= "rebateOrderAsc";
              body="maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex=1&minprice=9.9&listorder=rebateOrderAsc&clienttype=2&classid=&pagesize=10&keywords=&";
          }else{
            this.index="active5";
            this.checked.listorder= "rebateOrderDesc";
            body="maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex=1&minprice=9.9&listorder=rebateOrderDesc&clienttype=2&classid=&pagesize=10&keywords=&";
          }
          ax.post({
              url:"/api/index.php/App/ShopGoods/",
              body: body,
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
                that.show = false;
              }
            })
          break;
      }

    },
      handleTopChange(status) {
        // console.log(status)
        this.topStatus = status;
      },
    loadBottom: function() {
      // console.log("1232133")
      let that = this;
      that.show = true;
      let body="";
      this.pageindex++;
      if (this.checked.selectid==undefined) {
         //默认加载更多
        body = "maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex="+this.pageindex+"&minprice=9.9&listorder=&clienttype=2&classid=&pagesize=10&keywords=&";
      }else if(this.checked.selectid == "0"){
        //全部分类加载更多
        body = "maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex="+this.pageindex+"&minprice=9.9&listorder=&clienttype=2&classid="+this.checked.classid+"&pagesize=10&keywords=&";
      }else if (this.checked.selectid == "2") {
        //销量排序
         body="maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex="+this.pageindex+"&minprice=9.9&listorder="+this.checked.listorder+"&clienttype=2&classid=&pagesize=10&keywords=&";
      }else if (this.checked.selectid == "3") {
        //价格排序
         body="maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex="+this.pageindex+"&minprice=9.9&listorder="+this.checked.listorder+"&clienttype=2&classid=&pagesize=10&keywords=&";
      }else if (this.checked.selectid == "4") {
        //积分排序
         body="maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex="+this.pageindex+"&minprice=9.9&listorder="+this.checked.listorder+"&clienttype=2&classid=&pagesize=10&keywords=&";
      }
      // let body = "maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex="+this.pageindex+"&minprice=9.9&listorder=&clienttype=2&classid=&pagesize=10&keywords=&";
  // body: "maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex=1&minprice=9.9&listorder=&clienttype=2&classid="+obj.classid+"&pagesize=10&keywords=&",
     
      ax.post({
        url:"/api/index.php/App/ShopGoods/",
        body: body,
        cb : function (response) {
          // console.log(response)
          if (response.data.data != "") {
            that.result = that.result.concat(response.data.data);
             
          }else{
            Toast({
              message: '我是有底线的!',
              position: 'bottom',
              duration: 1000
            });
          }
          that.show = false;
         that.$refs.loadmore.onBottomLoaded();
        }
      })
     //

    }

  },
  mounted() {
    this.show = true
    let that = this;
    ax.post({
      url:"/api/index.php/App/ShopGoods/",
      body: "maxprice=9.9&sign=b053070ba615b4143a26ca04f94d96a7&action=getGoodsList&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&shopid=&appid=81423&isbaoyou=1&pageindex=1&minprice=9.9&listorder=&clienttype=2&classid=&pagesize=10&keywords=&",
      cb : function (response) {
        // console.log("2133"+response.data.data);
        // console.log(this)
        if (response.data.data != "") {
           that.result = response.data.data;
        }else{
          Toast({
              message: '加载失败!',
              position: 'bottom',
              duration: 1000
            });
        }
        that.show = false;
      }
    })
    //分类接口
     ax.post({
      url:"/api/index.php/App/Shop/",
      body: "maxprice=9.9&pid=0&sign=12f6810d0feb7d845849daf8140e6e58&isfixed=&action=getGoodsClass&cityid=&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&getgoodsnum=1&isbaoyou=1&minprice=9.9&depth=1&areaid=&clienttype=2&keywords=&",
      cb : function (response) {
        // console.log(response.data.data);
        that.postages = response.data.data;
        // console.log(this)
        // that.result = response.data.data;
        // console.log("---------------"+this.result)
        // that.show = false;
        // this.allLoaded = true;
        //  that.$refs.loadmore.onBottomLoaded("#shop");

        
      }
    })
  },
  components: {
    'my-load': load,
    'my-postage':postageAll,
    'my-postage-country':postageCountry
  },
  computed:{
    claid(){
      console.log("----------"+this.$store.state.claid)
      return this.$store.state.claid;
    }
  }

}
</script>

<style lang='scss' scoped>
  @import '../style/app.scss';
  #postage{
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #efefef;
      @include flexbox();
      @include flex-direction(column);
      #outer{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
      }
        #head{
          width: 100%;
          height: .4rem;
          @include flexbox();
          @include flex-direction();
          @include align-items(center);
          @include justify-content(center);
          #space{
            @include flex(1);

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
          img{
            width: .2rem;
            height: .2rem;
            margin-right: .1rem;
           
          }
          }
        }
        #nav{
          width: 100%;
          height: .5rem;
          @include flexbox();
          li{
            @include flexbox();
            @include flex();
            @include justify-content(center);
            @include align-items(center);
            background: $base-color;
            color: #3a3a3a;
            b{
              margin-bottom: .04rem;
            }
            &:nth-child(1) b{
              width: .1rem;
              height: .1rem;
              margin-left: .04rem;
              background: url('../imgs/w_productlist_dowm_jt1.png') center center no-repeat;
            }
             &:nth-child(2) b{
              width: .1rem;
              height: .1rem;
              margin-left: .04rem;
              background: url('../imgs/w_productlist_dowm_jt1.png') center center no-repeat;
            }
             &:nth-child(3) b{
              width: .1rem;
              height: .12rem;
              margin-left: .04rem;
               background: url('../imgs/w_productlist_zdjt.png') center center no-repeat;
               background-size: 100% 100%;
            }
             &:nth-child(4) b{
              width: .1rem;
              height: .12rem;
              margin-left: .04rem;
               background: url('../imgs/w_productlist_zdjt.png') center center no-repeat;
               background-size: 100% 100%;
            }
             &:nth-child(5) b{
              width: .1rem;
              height: .12rem;
              margin-left: .04rem;
               background: url('../imgs/w_productlist_zdjt.png') center center no-repeat;
               background-size: 100% 100%;
            }
          &:nth-child(1).active1{
            color: #ff0200;
              b{
               background: url('../imgs/w_productlist_up_jt1.png') center center no-repeat;
            }
          }
           &:nth-child(2).active2{
            color: #ff0200;
               b{
                  background: url('../imgs/w_productlist_up_jt1.png') center center no-repeat;
                }
          }
           &:nth-child(3).active3{
               b{
                  background: url('../imgs/w_productlist_dowm_jt_sth.png') center center no-repeat;
                  background-size: 100% 70%;
                }
          }
          &:nth-child(4).active4{
               b{
                  background: url('../imgs/w_productlist_dowm_jt_sth.png') center center no-repeat;
                  background-size: 100% 70%;
                }
          }
          &:nth-child(5).active5{
               b{
                  background: url('../imgs/w_productlist_dowm_jt_sth.png') center center no-repeat;
                  background-size: 100% 70%;
                }
          }
           &:nth-child(3).active31{
               b{
                  background: url('../imgs/w_productlist_up2_jt_sth.png') center center no-repeat;
                  background-size: 100% 70%;
                }
          }
          &:nth-child(4).active41{
               b{
                  background: url('../imgs/w_productlist_up2_jt_sth.png') center center no-repeat;
                  background-size: 100% 70%;
                }
          }
          &:nth-child(5).active51{
               b{
                  background: url('../imgs/w_productlist_up2_jt_sth.png') center center no-repeat;
                  background-size: 100% 70%;
                }
          }

          }
        }
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
            width: 48%;
            // height: 280px;
            @include flex-direction(column);
            @include align-items(center);
            @include justify-content(center);
            background: $base-color;
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
</style>
