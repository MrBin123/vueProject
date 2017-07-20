<template>
    <div id="moneyfooter">
        <ul>
          <router-link to="/main/home" tag="li"  active-class="active" ><p /></router-link>
          <router-link to="/money/2/article" tag="li"  active-class="active" ><p /></router-link>
          <router-link to="/money/3/gold" tag="li"  active-class="active"><p /></router-link>
          <router-link to="/main/mine" tag="li"   active-class="active" ><p/></router-link>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'moneyfooter'

}
</script>

<style lang='scss'>
 @import '../style/usage/core/reset';
 #moneyfooter{
   height: .44rem;
   width: 100%;
   @include border(1px 0 0 0,#e3e3e3,solid);
   background: #fff;
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
        background-size: 50%;
      }
       &:nth-child(2){
        background: url('../imgs/main_bottom_tab_look_focus.png') no-repeat center center;
        background-size: 50%;
      }
       &:nth-child(3){
        background: url('../imgs/main_bottom_tab_dou_focus.png') no-repeat center center;
        background-size: 50%;
      }
       &:nth-child(4){
        background: url('../imgs/main_bottom_tab_mine_blue_focus.png') no-repeat center center;
        background-size: 50%;
      }
      &:nth-child(1).active{
        background: url('../imgs/main_bottom_tab_home_blue_normal.png') no-repeat center center;
        background-size: 50%;
      }
      &:nth-child(2).active{
        background: url('../imgs/main_bottom_tab_look_normal.png') no-repeat center center;
        background-size: 50%;
      }
      &:nth-child(3).active{
        background: url('../imgs/main_bottom_tab_dou_normal.png') no-repeat center center;
        background-size: 50%;
      }
      &:nth-child(4).active{
        background: url('../imgs/main_bottom_tab_mine_blue_normal.png') no-repeat center center;
        background-size: 50%;
      }
     }
    
   }
  
 }

</style>
