<template>
  <div id="searchall">
    <div id="head">
      <img id="space" src="../imgs/w_back_page.png" @click="back"></img>
      <div id="search" >
        <img src="../imgs/lib_story_img_search_bt.png"></img>
        <input type="text" placeholder="请输入你想要的" v-model="value"/>
      </div>
      <p id="start" @click="start(value)">搜索</p>
    </div>
    <div id="hotsearch">
       <p>热搜</p>
       <ul>
         <li v-for="(v,i) in result" :key="i" @click="getkey(v.keyword)">{{v.keyword}}</li>
       </ul>
    </div>
    <div id="historysearch">
       <p>历史搜索</p>
       <ul>
         <li v-for="(v,i) in hisresult" :key="i" @click="go(v.keyword)">{{v.keyword}}</li>
       </ul>
       <button @click="clear">清空历史搜索</button>
    </div>
  </div>
 
</template>

<script>
import ax from '../util/Axios';
export default {
  name: 'search',
  data(){
    return {
      result: "",
      value:"",
      hisresult:[]
    }
  },
  methods:{
    go: function (keyword) {
      //  this.$store.keyword=keyword;
          this.$store.commit("getkeyworld",keyword)
       this.$router.push('/searchresult');
    },
    clear: function () {
      this.hisresult=[];
    },
    getkey: function (keyword) {
      // console.log(keyword)
        this.hisresult.push({
         keyword: keyword
      })
      //  this.$store.keyword=keyword;
      this.$store.commit("getkeyworld",keyword)
       this.$router.push('/searchresult');
       console.log(this.$store)
    },
    back:function () {
      this.$router.go(-1);
    },
    start: function (msg) {
      // console.log(msg)
      this.hisresult.push({
         keyword: msg
      })
      // this.$store.keyword=msg;
          this.$store.commit("getkeyworld",msg)
      this.$router.push('/searchresult');
    }
  },
  mounted(){
    let that = this;
      ax.post({
            url:"/api/index.php/App/ShopSearch/",
            body: "appid=81423&clienttype=2&sign=210a2219540c96f93a4671859982bb6c&action=getHotKeywords&uuid=fd14e57682a18d2af70116bdefbb0224&",
            cb : function (response) {
              console.log("response-------"+response)
              that.result = response.data.data;
            }
          })
  }

}

</script>

<style lang='scss' scoped>
 @import '../style/usage/core/reset';
#searchall {
  width : 100%;
  height:100%;
  background: #efefef;
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

        #hotsearch{
          width: 100%;
          background: #fff;
          @include flexbox();
          @include flex-direction(column);
          padding: .1rem .1rem;
          p{
             padding: 0 .08rem;
          }
          ul{
            width: 100%;
            @include flexbox();
            @include flex-flow(row wrap);
            li{
              padding: .02rem .08rem;
              margin: .04rem;
              background: #efefef;
              font-size: 12px;
              color: #666;
              @include border-radius(.1rem);
            }
          }
        }
          #historysearch{
          width: 100%;
          background: #fff;
          @include flexbox();
          @include flex-direction(column);
          padding: .1rem .1rem;
          p{
             padding: 0 .08rem;
          }
          ul{
            width: 100%;
            @include flexbox();
            @include flex-flow(row wrap);
            overflow-y: scroll;
            li{
              width: 100%;
              padding: .06rem .08rem;
              margin: .04rem;
             
              font-size: 12px;
              color: #666;
              @include border(0 0 1px 0,#dfdfdf);
            }
          }
          button{
            // width: 50%;
            margin: 0 20%;
            border: none;
            font-size: 12px;
            padding: .06rem 0;
          }
        }


}
</style>
