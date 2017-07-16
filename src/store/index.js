import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cityname: '',
    claid:'',
    selectid:0,
  },
  mutations: {
    increment(state, payload) {
        state.cityname = payload;
    },
    changeid(state,payload){
      state.claid=payload;
      console.log(state.claid)
    },
    changeselect(state,payload){
      state.selectid=payload;
      console.log(typeof payload)
      console.log(state.selectid)
    }
  }
})

export default store