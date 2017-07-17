<template>
  <div id="offineresult">
    <div id="head" >
      <img id="space" src="../imgs/w_back_page.png" @click="back"></img>
      <div id="search" @click="toSearch">
        <img src="../imgs/lib_story_img_search_bt.png"></img>
        <input type="text" placeholder="请输入你想搜索的内容" disabled />
      </div>
      <p id="start"></p>
    </div>    
      <div id="outer">
        <mt-loadmore  :bottom-method="loadBottom" ref="loadmore" :autoFill="false" @bottom-status-change="handleTopChange">     

          <ul id="shop">
              <li v-for="(v,i) in result" :key="i" @click="toDetail(v)">
                 <img v-lazy="v.logo"></img>
                <div>
                  <p>{{v.name}}</p>
                  <span>{{v.desc}}</span>
                  <b><span>距离&nbsp;&nbsp;{{v.distance}}</span><span>已售:&nbsp;&nbsp;{{v.sellgoodsnum}}</span></b>
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
  name: 'offine-result',
  data(){
    return {
      result: "",
      topStatus:"",
      pageindex:1,
    }
  },
  methods:{
    toSearch: function () {
      this.$router.push('/search');
    },
    toDetail: function (v) {
      //  this.$router.push({name:"detail",params:{listid}});
      console.log("跳向商家详情shopid="+v.shopid)

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
            url:"/api/index.php/App/Shop/",
            body: "sign=1e0abe640152435f5a35812dd466e140&action=getShopList&cityid=110100&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&lng=116.251568&pageindex="+this.pageindex+"&isfuwu=1&rebateorder=&areaid=&clienttype=2&classid=&lat=40.116694&type=def&pagesize=10&keywords=&",
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
               that.$refs.loadmore.onBottomLoaded();    
          }
        })



    }
  },
  mounted(){
    let that = this;
     ax.post({
        url:"/api/index.php/App/Shop/",
        body: "sign=1e0abe640152435f5a35812dd466e140&action=getShopList&cityid=110100&uuid=fd14e57682a18d2af70116bdefbb0224&appid=81423&lng=116.251568&pageindex=1&isfuwu=1&rebateorder=&areaid=&clienttype=2&classid=&lat=40.116694&type=def&pagesize=10&keywords=&",
        cb : function (response) {
                // console.log(response)
                if (response.data.data != "") {
                  that.result = response.data.data;
                  console.log(response.data.data)
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
 
}
</script>

<style lang='scss' scoped>
 @import '../style/usage/core/reset';
#offineresult {
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
                padding: .1rem;
                width: 100%;
                background:#fff;
                @include align-items(center);
                @include border(0 0 1px 0,#cbcbcb);
                img{
                  width: 80px;
                  height: 80px;
                  // height: 1.5rem;
                }
                img[lazy=loading] {
                  width: 80px;
                  height: 80px;
                  margin: auto;
                }
                div{
                  @include flex();
                  @include flexbox();
                  margin-left: .1rem;
                  @include flex-direction(column);
                  p{
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    color: #3c3c3c;
                    font-size: 14px;
                    margin: .02rem 0;
                  }
                  span{
                    width: 100%;
                    @include ellipsis(null,2);
                    color: #333;
                    font-size: 12px;
                   
                  }
                  b{
                    margin-top: .1rem;
                    width: 100%;
                    @include flexbox();
                    width: 100%;
                    // font-weight: ;
                    font-size: 12px;
                    span{
                      @include flex();
                      color: #aaa;
                      font-weight: 500;
                      height: 100%;
                     &:nth-child(1){
                        width: 50%;
                        text-align: left;
                      }
                    &:nth-child(2){
                      width: 50%;
                      text-align: right;
                    }
                    }
                  
                    
                  }

                }
          
            }     
          }
  
      }
   




}
</style>
