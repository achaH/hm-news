import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import MyFollow from '../views/user/myFollow.vue'
import MyComment from '../views/user/myComment.vue'
import MyStar from '../views/user/myStar.vue'
import Index from '../views/news/index.vue'
// import { VanPopupMixin } from 'vant/types/mixins/popup'

Vue.use(VueRouter)

const routes = [
  // 路由独享的守卫beforeEnter()
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/userEdit', component: UserEdit, name: 'userEdit' },
  { path: '/follow', component: MyFollow, name: 'follow' },
  { path: '/comment', component: MyComment, name: 'comment' },
  { path: '/star', component: MyStar, name: 'star' },
  { path: '/', component: Index, name: 'index' }
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
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'user' || token) {
    next()
  } else {
    router.push('/login')
  }
})

export default router
