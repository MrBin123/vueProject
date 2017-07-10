import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/Index'
// import index from '/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
   
    },
     {
      path: '/home',
      name: 'home',
      component: Hello
   
    }
  ]
})
