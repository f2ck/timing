import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/Home' },
  {
    path: '/Films',
    component: () =>
      import(/* webpackChunkName:'Films' */ '@/views/Films'),
    children: [
      {
        path: '/Film/hot',
        component: () =>
          import(/* webpackChunkName:'hot' */ '@/views/MovieState/hot')
      },
      {
        path: '/Film/coming',
        component: () =>
          import(/* webpackChunkName:'coming' */ '@/views/MovieState/coming')
      },
      {
        path: '/Films',
        redirect: '/Film/hot'
      }
    ]
  },
  {
    path: '/theater/id/cinema',
    component: () => import(/* webpackChunkName:'BuyTicket' */ '@/views/Cinema'),
   
  },
 
  {
    path: '/Center',
    component: () => import(/* webpackChunkName:'Center' */ '@/views/Center')
  },
  {
    path: '/FindNews',
    redirect: '/FindNews/news',
    component: () => import(/* webpackChunkName:'FindNews' */ '@/views/FindNews'),
    children: [
      {
        path: '/FindNews/news',
        component: () => import(/* webpackChunkName:'news' */ '@/views/FindNews/news')
      },
      {
        path: '/FindNews/trailer',
        component: () => import(/* webpackChunkName:'trailer' */ '@/views/FindNews/trailer')
      },
      {
        path: '/FindNews/topList',
        component: () => import(/* webpackChunkName:'news' */ '@/views/FindNews/topList')
      },
      {
        path: '/FindNews/viewingGuide',
        component: () => import(/* webpackChunkName:'news' */ '@/views/FindNews/viewingGuide')
      }
    ]

  },
  {
    path: '/Home',
    component: () => import(/* webpackChunkName:'Home' */ '@/views/Home')
  },
  {
    path: '/ShopMarket',
    component: () => import(/* webpackChunkName:'ShopMarket' */ '@/views/ShopMarket')
  },
  {
    path: '/ShopSearch',
    component: () => import(/* webpackChunkName:'shopSearcj' */ '@/views/ShopSearch')
  },
  {
    path: '/ShopListShow',
    component: () => import(/* webpackChunkName:'ShopListShow' */ '@/views/ShopListShow')
  },
  {
    path: '/detail',
    component: () => import(/* webpackChunkName:'detail' */ '@/views/detail')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () =>
      import(/* webpackChunkName:'Search' */ '@/views/Search')
  },
  {
    path: '/Citylist',
    name: 'Citylist',
    component: () =>
      import(/* webpackChunkName:'Citylist' */ '@/views/Citylist')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes

})

export default router
