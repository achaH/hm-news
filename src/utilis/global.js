/* 处理全局注册组件 */
import Vue from 'vue'
import Hmheader from '../components/HmHeader.vue'
import Hmlogo from '../components/HmLogo.vue'
import HmNavItem from '../components/HmNavItem.vue'
import HmPost from '../components/HmPost.vue'

Vue.component('hm-header', Hmheader)
Vue.component('hm-logo', Hmlogo)
Vue.component('hm-navItem', HmNavItem)
Vue.component('hm-post', HmPost)
