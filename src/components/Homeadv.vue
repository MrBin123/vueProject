<template>
  <div id="adv">
    <iframe :src="geturl"></iframe>
  </div>
 
</template>

<script>
import Footer from './Footer'
export default {
  name: 'hone-adv',
  data(){
    return {
      url: ""
    }
  },
  computed: {
    geturl(){
      // console.log(this.$store.homeadv)
      this.url=this.$store.homeadv;
      return this.$store.homeadv
    }
  }
}
</script>

<style lang='scss' scoped>

#adv {
  width : 100%;
  height:100%;
  overflow: hidden;
  iframe{
    width: 100%;
    height: 100%;
  }
}
</style>
