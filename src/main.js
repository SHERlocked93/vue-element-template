import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import iView from 'iview'

import '@/styles/resetTotal.css'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-default/index.css'
import '@/permission'
import '@/icons'
import './assets/icon/iconfont.css'
import './styles/index.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iView)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
