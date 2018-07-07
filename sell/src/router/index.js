import Vue from 'vue'
import Router from 'vue-router'
import seller from '@/components/seller/seller'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  // mode: 'history',
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },{
      path: '/seller',
      name: 'seller',
      component: seller
    },{//重定向
      path: '/',
      redirect: '/goods'
    }
  ]
})
