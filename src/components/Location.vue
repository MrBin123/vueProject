<template>
  <div class="location">
      <div class="loc-header">
        <mt-header>
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back"></mt-button>
            </router-link>
        </mt-header>
        <mt-search v-model="value" 
            cancel-text="取消" 
            placeholder="请输入您所在的城市">
        </mt-search>
      </div>
      <div class="loc-city">
          <h5>定位城市</h5>
          <p>北京市</p>
      </div>
      <h5>热门城市</h5>
      <ul class="loc-hot-city"> 
          <li v-for="(ci ,i) in city" :key="i" @click="setlocation(ci.cityname)">{{ci.cityname}}</li>
      </ul>
      <div class="detail-city">
          <mt-index-list>
            <mt-index-section index="A">
                <mt-cell title="阿拉善盟"></mt-cell>
                <mt-cell title="鞍山市"></mt-cell>
                <mt-cell title="安庆市"></mt-cell>
            </mt-index-section>
            <mt-index-section index="B">
                <mt-cell title="北京市"></mt-cell>
                <mt-cell title="保定市"></mt-cell>
            </mt-index-section>
            <mt-index-section index="B">
                <mt-cell title="北京市"></mt-cell>
                <mt-cell title="保定市"></mt-cell>
                <mt-cell title="包头市"></mt-cell>
            </mt-index-section><mt-index-section index="C">
                <mt-cell title="承德市"></mt-cell>
                <mt-cell title="沧州市"></mt-cell>
                <mt-cell title="长治市"></mt-cell>
            </mt-index-section><mt-index-section index="D">
                <mt-cell title="大同市"></mt-cell>
                <mt-cell title="大连市"></mt-cell>
            </mt-index-section>
            <mt-index-section index="E">
                <mt-cell title="鄂尔多斯市"></mt-cell>
                <mt-cell title="鄂州市"></mt-cell>
            </mt-index-section>
        </mt-index-list>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { Header } from 'mint-ui';
import { Search } from 'mint-ui';
import { IndexList, IndexSection } from 'mint-ui';

Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Search.name, Search);
Vue.component(Header.name, Header);


export default {
  name : 'Location',
  data(){
      return {
        value:'',
        title:'',
        city:[]
      }  
  },
  methods:{
    setlocation:function(cityname){
        this.$store.commit('increment' , cityname);
        this.$router.push({name:'home'});
    },
    back: function () {
        // console.log("点击")
        this.$router.go(-1);
    }
  },
  mounted(){
      axios({
      url:'/appapi/index.php/App/BaseApp/',
      method:'post',
      headers:{
        ContentType:'application/x-www-urlencoded;charset=UTF-8'
      },
      data:'appid=81423&clienttype=2&sign=96b89cdd9e6ed9011bb8d6de1be9e9a5&action=getHotCity&uuid=fd14e57682a18d2af70116bdefbb0224&'
    })
    .then(responseData=>{ 
      this.city=responseData.data.data;
      console.log(this.city)
    }) 
  }
  
}
</script>

<style lang='scss'>
    @import '../style/usage/core/reset';

    .location{
        @include flex();
        @include flexbox();
        @include flex-direction(column);
        width:100%;
        .loc-header{
            @include flexbox();
            @include align-items(center);
            width:100%;
            height:.4rem;
            background: #eee;
            border-bottom: 1px solid #ccc;
            padding-left: .1rem;
            .mint-header{
                width:.7rem;
                background: none;
                .mint-button-icon{
                    color:#888;
                }
            }
            .mint-search{
                height:.3rem;
                width:2.5rem;
                border-radius: 15px;
                .mint-searchbar{
                    height:100%;
                    .mint-searchbar-inner{
                        padding-left: 10px;
                    }
                }
            }    
        };
        h5{
            height:.3rem;width:100%;color:#999;padding-left:.1rem;line-height:.3rem;
        };
        .loc-city{
            width:100%;
            @include flexbox();
            @include flex-wrap(wrap);
            p{
                height:.4rem;background: #fff;line-height: .4rem;width:100%;
                padding-left:.2rem;border-top:1px solid #ddd;border-bottom:1px solid #ddd;
            }           
        };
        .loc-hot-city{
            width:100%;padding-left: .1rem;border-bottom:1px solid #ddd;
            li{
                height:.4rem;background: #fff;line-height: .4rem;width:1rem;
                text-align: center;float:left;margin: 0 10px 10px;
            }
        };
        .detail-city{
            .mint-cell-title{
                font-size: 14px;
            }
        };

    }
</style>
