import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Order from '@/views/order/index.vue'
import Pay from '@/views/pay/index.vue'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'
import ProductDetail from '@/views/productDetail/index.vue'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/layout'
}, {
  path: '/login',
  component: Login
}, {
  path: '/layout',
  component: Layout,
  redirect: '/home',
  children: [{
    path: '/home',
    component: Home
  }, {
    path: '/category',
    component: Category
  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/user',
    component: User
  }]
}, {
  path: '/order',
  component: Order
}, {
  path: '/pay',
  component: Pay
}, {
  path: '/search',
  component: Search
}, {
  path: '/searchList',
  component: SearchList
}, {
  path: '/productDetail/:id',
  component: ProductDetail
}]

const router = new VueRouter({
  routes
})

const authUrls = ['/pay', '/order']

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
  } else {
    if (store.getters.token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
