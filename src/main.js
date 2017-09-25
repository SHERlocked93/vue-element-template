import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routerConfig from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Axios)
Vue.use(ElementUI)

const router = new VueRouter(routerConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
