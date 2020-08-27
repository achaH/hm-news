import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import Hmheader from './components/HmHeader.vue'
import Hmlogo from './components/HmLogo.vue'
import axios from 'axios'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000/'

Vue.component('hm-header', Hmheader)
Vue.component('hm-logo', Hmlogo)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
