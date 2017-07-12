<template>
  <div id="postage">
    <my-load v-show="show"></my-load>
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
       <li><p>全部</p><b></b></li>
       <li><p>全国</p><b></b></li>
       <li><p>销量</p><img src="../imgs/w_productlist_zdjt.png"></img></li>
       <li><p>价格</p><img src="../imgs/w_productlist_zdjt.png"></img></li>
       <li><p>积分</p><img src="../imgs/w_productlist_zdjt.png"></img></li>
    </ul>
   
  </div>
</template>

<script>
import load from '../util/Loading';
export default {
  name: 'postage',
  data() {
   return {
      show : true
     }
  },
  mounted() {
    // this.show = true
  },
  components: {
    'my-load': load
  }

}
</script>

<style lang='scss' scoped>
  @import '../style/app.scss';
  #postage{
      width: 100%;
      height: 100%;
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
            @include flex(1);

          }
          #more{
            height: 100%;
            @include flex(1);
            @include flexbox();
            @include align-items(center);
            @include justify-content(center);
            img{
              width: .3rem;
              height: .3rem;
             
            }
            
          }
          #search{
            height: .3rem;
            @include flex(5);
            @include flexbox();
            @include flex-direction();
            @include align-items(center);
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
          height: .4rem;
          @include flexbox();
          li{
            @include flexbox();
            @include flex();
            @include justify-content(center);
            @include align-items(center);
            background: $base-color;
            color: #3a3a3a;
            &:nth-child(1) b{
              width: .1rem;
              height: .08rem;
              margin-left: .04rem;
              background: url('../imgs/w_productlist_dowm_jt1.png') center center no-repeat;
            }
             &:nth-child(2) b{
              width: .1rem;
              height: .08rem;
              margin-left: .04rem;
              background: url('../imgs/w_productlist_dowm_jt1.png') center center no-repeat;
            }
             &:nth-child(3) img{
              width: .1rem;
              height: .12rem;
              margin-left: .04rem;
            }
             &:nth-child(4) img{
              width: .1rem;
              height: .12rem;
              margin-left: .04rem;
            }
             &:nth-child(5) img{
              width: .1rem;
              height: .12rem;
              margin-left: .04rem;
            }
          }
        }
    }


  

</style>
