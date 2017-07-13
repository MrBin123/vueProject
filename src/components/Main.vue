<template>
    <div id="main">
        <router-view ></router-view>
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
    @import '../style/usage/core/reset';
    @import '../style/app.scss';
    #main{
        width: 100%;
        height: 100%;
        background: $base-color;
        @include flexbox();
        @include flex-direction(column);
      
    }

</style>
