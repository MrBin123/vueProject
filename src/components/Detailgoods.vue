<template>
  <div class="pic-list">
      <iframe :src="src" scrolling="no" frameborder=no></iframe>
  </div>
</template>

<script>
import Vue from 'vue'

// console.log(this.listId);

export default {
  name:'Detailgoods',
  data(){
    return {
      src:"http://appapi.wshwifi.cn/index.php/App/GetContent/getGoodsContent/goodsid/"+this.listId+".html"
    }
  },
  props:['listId']
}
</script>

<style lang="scss" scoped>
  .pic-list{
    width:100%;
    iframe{
      width:100%;border:none;height:5800px;
    }
  }
</style>


