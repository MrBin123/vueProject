<template>
    <div id="footer">
        <ul>
          <router-link to="/main/home" tag="li"  active-class="active" @click.native="onChange(0)"><img :src="home"/></router-link>
          <router-link to="/main/postage" tag="li"  active-class="active" @click.native="onChange(1)"><img :src="postage"/></router-link>
          <router-link to="/main/cart" tag="li"  active-class="active" @click.native="onChange(2)"><img :src="cart"/></router-link>
          <router-link to="/main/money" tag="li"  active-class="active"  @click.native="onChange(3)"><img :src="money"/></router-link>
          <router-link to="/main/mine" tag="li"   active-class="active"  @click.native="onChange(4)"><img :src="mine"/></router-link>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'footer',
  data() {
   return { 
     home: require("../imgs/w_home_red.png"),
     postage: require('../imgs/main_bottom_tab_category_focus.png'),
     cart: require("../imgs/main_bottom_tab_cart_focus.png"),
     money: require("../imgs/main_bottom_tab_faxian_focus.png"),
     mine: require("../imgs/main_bottom_tab_personal_focus.png")
   }
  },
  computed:{
    change(){
      console.log("zhixing")
      this.onChange(parseInt(this.$store.state.selectid));
      return this.$store.state.selectid;
    }
  },
  methods: {
    onChange: function(index){
        switch (index) {
          case 0:
              this.home = require("../imgs/w_home_red.png");
              this.postage = require("../imgs/main_bottom_tab_category_focus.png");
              this.cart = require("../imgs/main_bottom_tab_cart_focus.png");
              this.money = require("../imgs/main_bottom_tab_faxian_focus.png");
              this.mine = require("../imgs/main_bottom_tab_mine_blue_focus.png");
            break;
          case 1:
              this.home = require("../imgs/w_home_gray.png");
              this.postage = require("../imgs/main_bottom_tab_category_normal.png");
              this.cart = require("../imgs/main_bottom_tab_cart_focus.png");
              this.money = require("../imgs/main_bottom_tab_faxian_focus.png");
              this.mine = require("../imgs/main_bottom_tab_mine_blue_focus.png");
            break;
          case 2:
              this.home = require("../imgs/w_home_gray.png");
              this.postage = require("../imgs/main_bottom_tab_category_focus.png");
              this.cart = require("../imgs/main_bottom_tab_cart_normal.png");
              this.money = require("../imgs/main_bottom_tab_faxian_focus.png");
              this.mine = require("../imgs/main_bottom_tab_mine_blue_focus.png");
            break;
          case 3:
              this.home = require("../imgs/w_home_gray.png");
              this.postage = require("../imgs/main_bottom_tab_category_focus.png");
              this.cart = require("../imgs/main_bottom_tab_cart_focus.png");
              this.money = require("../imgs/main_bottom_tab_faxian_normal.png");
              this.mine = require("../imgs/main_bottom_tab_mine_blue_focus.png");
            break;
          case 4:
              this.home = require("../imgs/w_home_gray.png");
              this.postage = require("../imgs/main_bottom_tab_category_focus.png");
              this.cart = require("../imgs/main_bottom_tab_cart_focus.png");
              this.money = require("../imgs/main_bottom_tab_faxian_focus.png");
              this.mine = require("../imgs/main_bottom_tab_personal_normal.png");
            break;
        
        }
    }
  }
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
       img{
         width: .42rem;
         height: .32rem;
       }


     }
   }
  
 }

</style>
