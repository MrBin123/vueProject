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
import Gold from '@/components/GetGold'
import Article from '@/components/Article'
import ArticleShow from '@/components/ArticleShow'
import GoodsContent from '@/components/GoodsContent'
// import index from '/index'
import Detailgoods from '@/components/Detailgoods'
import Comment from '@/components/Comment'
import Merchant from '@/components/Merchant'

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
      path:'/merchant/:id',
      name:'merchant',
      component: Merchant
    },
    {
      path:'/detail/:listid',
      name:'detail',
      component:Detail,
      children:[
        {
          path:'detailgoods',
          name:'detailgoods',
          component:Detailgoods
        },
        {
          path:'comment',
          name:'comment',
          component:Comment
        }
      ]
    },
     {
      path:'/offline',
      name:'offline',
      component:OfflineResult
    },
     {
      path:'/articleshow/:listid',
      name:'articleshow',
      component:ArticleShow
     },
     {
      path:'/shop/:shopid',
      name:'shop',
      component:GoodsContent
     },
    {
       path: '/money/:id',
       name: 'money',
       component: Money,
       redirect:"/money/:id/article",
       children:[
         {
          path: 'article',
          name: 'article',
          component: Article
        
          },
          {
            path: 'gold',
            name: 'gold',
            component: Gold
          }
      ]
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
          path: 'mine',
          name: 'mine',
          component: Mine
        }
      ]
    }
  ]
})
