<template>
  <div class="detail">
      <mt-swipe :show-indicators="true">
        <mt-swipe-item v-for="(pic,i) in slidepic" :key="i"><img :src="pic.picurl"></mt-swipe-item>
      </mt-swipe>
      <div class="introduce">
        <h4 class="introduce">{{gooddetail.goodsname}}</h4>
        <p><span>￥</span>{{gooddetail.price}}元</p>
        <i><em>{{gooddetail.exprhtml}}</em><strong><span>剩余:</span>{{gooddetail.kucun}}</strong></i>
      </div>
      <div class="standard">
        <p>选择颜色、规格</p><h6>></h6>
      </div>
      <div clas="shop">
        <div class="s-left">
          <p><span>服务商：</span>{{gooddetail.shopinfo.shopname}}</p>
          <p><span>等级：</span><img :src="gooddetail.shopinfo.shoplevelimg"></p>
          <p><span>地址：</span>{{gooddetail.shopinfo.shopfulladdr}}</p>
        </div>
        <div class="s-right"></div>
      </div>
      
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);

export default {
  name:'Detail',
  data(){
      return {
        gooddetail:{},
        slidepic:[],
        listid:this.$route.params.listid
      }
  },
  computed:{
    id(){
        return this.$store.state.goodsid;
    }
  },
  mounted(){
      axios({
          url:'/appapi/index.php/App/ShopGoods/',
          method:'post',
          headers:{
          ContentType:'application/x-www-urlencoded;charset=UTF-8'
        },
        data:'userid=1009780&id='+this.listid+'&sign=3aa27c4cbd6dc4b8c137c0fd04817e62&action=getGoodsDetail&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&'
      }).then(responseData=>{
        this.gooddetail=responseData.data.data;
        this.slidepic=this.gooddetail.slidepicurls;
        console.log(this.gooddetail);
      })
  },
}
</script>

<style lang="scss" scoped>
  @import '../style/usage/core/reset.scss';

  .detail{
    @include flexbox();
    @include flex();
    @include flex-direction(column);
    width:100%;background:#fff;
    .mint-swipe{
      width:100%;height:3rem;
      img{width:100%;height:100%;}
    };
    .introduce{
      h4{
        width:100%;padding:5px 10px;font-size:14px;color:#555;
      }
      p{
        width:100%;height:.3rem;padding:5px 10px;float:left;color:#f00;
      }
      i{width:100%;height:.3rem;line-height: .3rem;border-top:1px solid #eee;
        border-bottom:1px solid #eee;padding:0 10px;display:block;clear:both;color:#888;
        em{float: left;}
        strong{float: right;font-weight:normal;
          span{margin-right:3px;}
        }
      }
    };
    .standard{
      width:100%;height:.3rem;line-height: .3rem;padding:0 10px;color:#555;border-bottom:1px solid #eee;
      p{float: left;}
      h6{float: right;}
    };
    .shop{
      @include flexbox();
      width:100%;height:.6rem;
      .s-left{padding:0 10px;
        p{
          height:.2rem;line-height: .2rem;font-size:14px;
          span{margin-right:3px;}
          img{
            width:.5rem;height:.2rem;
            }
        }
      }
           
    }
     
  }

</style>


