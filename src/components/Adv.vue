<template>
  <div id="adv">
    <img :src="url" />
    <!--<p v-bind:style="{'background-image':'url('+pic+')'}"></p>-->
    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from './Footer'
export default {
  name: 'index',
  data: function () {
    return {
      url: ''
    }
  },
  components: {
    'my-footer': Footer
  },
  mounted() {
    //  axios.get('https://www.baidu.com/img/bd_logo1.png')
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    this.url = 'http://adminimg.wshwifi.cn/Public/Upload/Admin1/App/201706/59451beadda9a.jpg';
    setTimeout(function () {
      // console.log(this)
      this.$router.push('/main');
    }.bind(this), 1500);
  }
}
</script>

<style lang='scss' scoped>
//  @import '../style/usage/core/reset';
#adv {
  width: 100%;
  height: 100%; // @include flexbox();
  // @include align-items(center);
  // @include justify-content(center);
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
