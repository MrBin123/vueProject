<template>
    <div id="main">

      <keep-alive>
       <router-view></router-view>
    </keep-alive>
        
       
        <my-footer></my-footer>
    </div>
</template>

<script>
import Footer from './Footer'

export default {

   name: 'main',
   components: {
    'my-footer':Footer
   }
}
</script>

<style lang="scss" scoped>

    @import '../style/app.scss';
    #main{
        width: 100%;
        height: 100%;
        background: $base-color;
        @include flexbox();
        @include flex-direction(column);

    }

</style>
