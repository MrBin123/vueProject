<template>
  <div id="searchall">
    <div id="head">
      <img id="space" src="../imgs/ic_chakanline_back.png"></img>
      <div id="search" >
        <img src="../imgs/lib_story_img_search_bt.png"></img>
        <input type="text" value="请输入你想要的"/>
      </div>
      <p id="start">搜索</p>
    </div>
    <div id="hotsearch">
       <p>热搜</p>
       <ul>
         <li v-for="(v,i) in 10" :key="i">手机</li>
       </ul>
    </div>
  </div>
 
</template>

<script>

export default {
  name: 'search',
  
  
 
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



}
</style>
