import axios from 'axios';
import Vue from 'vue';

export default{
  var axi=function axi(obj){
    axios({
      url:obj.url,
      method:obj.method,
      headers:{
        ContentType:obj.type
      },
      data:obj.data
    })
    .then(responseData=>{
      return res;
    })
  }
}
