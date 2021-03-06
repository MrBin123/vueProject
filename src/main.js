// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'mint-ui/lib/style.css'
import './style/app.scss'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import MintUI from 'mint-ui'
import store from './store/index'

Vue.use(MintUI)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false

// const router = new VueRouter({
//   mode: 'history',
//   routers: routers
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
