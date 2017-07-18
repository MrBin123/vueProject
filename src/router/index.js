import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Adv from '@/components/Adv'
import Main from '@/components/Main'
import Home from '@/components/Home'
import Postage from '@/components/Postage'
import Cart from '@/components/Cart'
import Money from '@/components/Money'
import Mine from '@/components/Mine'
import Location from '@/components/Location'

import Detail from '@/components/Detail'

import Homeadv from '@/components/Homeadv'
import Search from '@/components/Search'

import SearchResult from '@/components/SearchResult'
import OfflineResult from '@/components/OfflineResult'
import HomeMore from '@/components/HomeMore'
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
      path: '/adv',
      name: 'adv',
      component: Adv
   
    },
    {
      path:'/search',
      name:'search',
      component: Search
    },
    {
      path:'/searchresult',
      name:'searchresult',
      component: SearchResult
    },
    {
      path:'/location',
      name:'location',
      component: Location
    },
    {
      path:'/homeadv',
      name:'homeadv',
      component: Homeadv
    },
      {
      path:'/homemore/:pid',
      name:'homemore',
      component: HomeMore
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:Detail
    },
     {
      path:'/offline',
      name:'offline',
      component:OfflineResult
    },
     {
      path: '/main',
      name: 'main',
      component: Main,
      redirect :'/main/home',
      children:[
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'postage',
          name: 'postage',
          component: Postage
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart
        },
        {
          path: 'money',
          name: 'money',
          component: Money
        },
        {
          path: 'mine',
          name: 'mine',
          component: Mine
        }
      ]
    }
  ]
})
