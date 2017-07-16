<template>
    <div id="postage-country-all">
        <div id="postage-country">
            <ul id="citys">
                <li v-for="(v,i) in 12" :key="i" >包头市</li>
            </ul>
            <div id="changecity">
                <p><span>当前城市:</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>阿拉善盟</span><img src="../imgs/icon_go_right.png"></img><span>更换</span></p>
            </div>
        </div>
        <div id="postage-country-bottom"></div>
   </div>
</template>
<script>
export default {
  name: "postagecountry",
  data(){
      return {
          citys: ""
      }
  }
}
</script>
<style lang="scss" scoped>
  @import '../style/app.scss';
  #postage-country-all{
    position: absolute;
    width: 100%;
    height: 86%;
    z-index: 1000;
    margin-top: .68rem;
    // background: #000;
    // opacity: 0.6;
    overflow: hidden;
    #postage-country-bottom{
        width: 100%;
        height: 40%;
        background: #000;
        opacity: 0.6;
    }
     #postage-country{
      width: 100%;
       height: 60%;
       background: #fff;
    //  padding: 0 3%;
       #citys{
         width: 100%;
         height: 80%;
        //  overflow: hidden;
         li{
             width: 29%;
             margin: 2% 2.1%;
             text-align: center;
             float: left;
             background: #f2f2f2;
             color: #666;
             padding: 2% 1%;
             
         }
       }
       #changecity{
        width: 100%;
        padding: 1% 3%;
        // background: #0ff;
        height: 20%;
         color: #666;
        p{
            width: 100%;
            height: .4rem;
            background: #efefef;
            line-height: .4rem;
            @include border-radius(20px);
            padding: 0 .2rem;
            img{
                float: right;
                width: 12px;
                height: 14px;
                margin-top: .14rem;
            }
            span{
                &:nth-child(1){
                float: left;
                }
                &:nth-child(2){
                    float: left;
                    margin-left: .1rem;
                }
                 &:nth-child(4){
                    color: red;
                    float: right;
                    margin-right: .1rem;
                }
              
            }
           
        }
       }
   }
  }
  

</style>
