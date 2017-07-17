<template>
    <div id="footer">
        <ul>
          <router-link to="/main/home" tag="li"  active-class="active" ><p /></router-link>
          <router-link to="/main/postage" tag="li"  active-class="active" ><p /></router-link>
          <router-link to="/main/cart" tag="li"  active-class="active"><p /></router-link>
          <router-link to="/main/money" tag="li"  active-class="active" ><p /></router-link>
          <router-link to="/main/mine" tag="li"   active-class="active" ><p/></router-link>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'footer'

}
</script>

<style lang='scss'>
 @import '../style/usage/core/reset';
 #footer{
   height: .44rem;
   width: 100%;
   @include border(1px 0 0 0,#e3e3e3,solid);
   ul{
     width: 100%;
     height: 100%;
     @include flexbox();
     @include align-items(center);
     li{
     @include flexbox();
     @include align-items(center);
     @include justify-content(center);
     @include flex();
     height: 100%;
       p{
         width: 100%;
         height: 100%;
       }
      
      &:nth-child(1){
        background: url('../imgs/w_home_gray.png') no-repeat center center;
        background-size: 60%;
      }
       &:nth-child(2){
        background: url('../imgs/main_bottom_tab_category_focus.png') no-repeat center center;
        background-size: 60%;
      }
       &:nth-child(3){
        background: url('../imgs/main_bottom_tab_cart_focus.png') no-repeat center center;
        background-size: 60%;
      }
       &:nth-child(4){
        background: url('../imgs/main_bottom_tab_faxian_focus.png') no-repeat center center;
        background-size: 60%;
      }
       &:nth-child(5){
        background: url('../imgs/main_bottom_tab_personal_focus.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(1).active{
        background: url('../imgs/w_home_red.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(2).active{
        background: url('../imgs/main_bottom_tab_category_normal.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(3).active{
        background: url('../imgs/main_bottom_tab_cart_normal.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(4).active{
        background: url('../imgs/main_bottom_tab_faxian_normal.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(5).active{
        background: url('../imgs/main_bottom_tab_personal_normal.png') no-repeat center center;
        background-size: 60%;
      }
     }
    
   }
  
 }

</style>
