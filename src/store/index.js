import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cityname: ''
  },
  mutations: {
    increment(state, payload) {
        state.cityname = payload;
        console.log(state.cityname)
    }
  },
//   actions: {
//     addRating(context, payload) {
//     }
//   }
})

export default store