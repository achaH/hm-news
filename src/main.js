import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import Hmheader from './components/HmHeader.vue'
import Hmlogo from './components/HmLogo.vue'
import axios from 'axios'
import HmNavItem from './components/HmNavItem.vue'
import moment from 'moment'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
// 给axios配置拦截器
axios.interceptors.request.use(function(config) {
  // config指的是请求的配置信息
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(function(response) {
  // console.log(response.data)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 处理失效的token数据
    // 1. 跳转到登录页面
    router.push('/login')
    // 2. 清除失效的信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 3. 给提示  用户验证失败
    Toast.fail('登录信息失效')
  }
  return response
})

Vue.component('hm-header', Hmheader)
Vue.component('hm-logo', Hmlogo)
Vue.component('hm-navItem', HmNavItem)

Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})

Vue.use(Vant)

Vue.config.productionTip = false

window.vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
