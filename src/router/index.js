import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
// import { VanPopupMixin } from 'vant/types/mixins/popup'

Vue.use(VueRouter)

const routes = [
  // 路由独享的守卫beforeEnter()
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' }
]

const router = new VueRouter({
  routes
})

// 解决重复跳转到当前路由的异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 全局路由导航守卫
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  if (to.name !== 'user' || token) {
    next()
  } else {
    router.push('/login')
  }
})

export default router
