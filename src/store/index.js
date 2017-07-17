import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cityname: '',
    claid:'',
    claname:'',
    homeadv: '',
    keyword:""
  },
  mutations: {
    increment(state, payload) {
        state.cityname = payload;
    },
    changeid(state,payload){
      state.claid=payload.classid;
      state.claname=payload.classname;
      // console.log(state.claid)
    },
    getkeyworld(state,payload){
      state.keyword=payload;
    }
  }
})

export default store