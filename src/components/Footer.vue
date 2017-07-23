<template>
  <div id="footer">
    <div id="sel" v-show="isshow">
      <p @click="wenzhang">看文章</p>
      <p @click="douzi">捡金豆</p>
    </div>
    <ul>
      <router-link to="/main/home" tag="li" active-class="active" @click.native="hide">
        <p/>
      </router-link>
      <router-link to="/main/postage" tag="li" active-class="active" @click.native="hide">
        <p/>
      </router-link>
      <router-link to="/main/cart" tag="li" active-class="active" @click.native="hide">
        <p/>
      </router-link>
      <li @click="check">
        <p/>
      </li>
      <router-link to="/main/mine" tag="li" active-class="active" @click.native="hide">
        <p/>
      </router-link>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'footer',
  data() {
    return {
      isshow: false
    }
  },
  methods: {
    hide() {
      this.isshow = false;
    },
    check() {
      // console.log(1)
      this.isshow = !this.isshow;
    },
    wenzhang() {
      this.isshow = false;
      // console.log(123)
      this.$router.push('/money/2/article')
    },
    douzi() {
      this.isshow = false;
      // console.log(1234)
      this.$router.push('/money/3/gold')
    }
  },

  mounted() {

  }

}
</script>

<style lang='scss'>
@import '../style/usage/core/reset';

#footer {
  height: .44rem;
  width: 100%;
  @include border(1px 0 0 0, #e3e3e3, solid);
  #sel {
    //  background: #0ff;
    width: 20%;
    height: .8rem;
    position: absolute;
    background: url('../imgs/w_popup_bg_money.png') no-repeat center center;
    background-size: 100%;
    bottom: .44rem;
    left: 60%;

    p {
      width: 100%;

      text-align: center;
      line-height: .4rem;
      color: #666;
      &:nth-child(1) {
        @include border(0 0 1px 0,
        #333);
        height: 50%;
      }
      &:nth-child(2) {
        line-height: .3rem;
      }
    }
  }
  ul {
    width: 100%;
    height: 100%;
    @include flexbox();
    @include align-items(center);
    li {
      @include flexbox();
      @include align-items(center);
      @include justify-content(center);
      @include flex();
      height: 100%;
      p {
        width: 100%;
        height: 100%;
      }

      &:nth-child(1) {
        background: url('../imgs/w_home_gray.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(2) {
        background: url('../imgs/main_bottom_tab_category_focus.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(3) {
        background: url('../imgs/main_bottom_tab_cart_focus.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(4) {
        background: url('../imgs/main_bottom_tab_faxian_focus.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(5) {
        background: url('../imgs/main_bottom_tab_personal_focus.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(1).active {
        background: url('../imgs/w_home_red.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(2).active {
        background: url('../imgs/main_bottom_tab_category_normal.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(3).active {
        background: url('../imgs/main_bottom_tab_cart_normal.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(4).active {
        background: url('../imgs/main_bottom_tab_faxian_normal.png') no-repeat center center;
        background-size: 60%;
      }
      &:nth-child(5).active {
        background: url('../imgs/main_bottom_tab_personal_normal.png') no-repeat center center;
        background-size: 60%;
      }
    }
  }
}
</style>
