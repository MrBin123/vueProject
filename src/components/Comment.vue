<template>
  <div class="comments">
      
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  name:'Comment',
  data(){

  },
  mounted(){
     axios({
         url:'/appapi/index.php/App/ShopGoods/',
         data:'sign=1d93a7906269fd0195f6f03afcc34b34&pagesize=10&shopid=&goodsid=2873&clienttype=2&pageindex=1&action=getGoodsComments&appid=81427&uuid=d2912dc6692e1654b6bb93b8a7be8c33&',
         method:'post'
     }).then(responseData=>{
        this.commentscode=responseData.data.data

        console.log(this.commentscode)
      })
  }
}
</script>

<style>
    .comments{
        width:100%;
    }

</style>


