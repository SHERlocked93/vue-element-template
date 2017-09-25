import Home from '../components/Home.vue'
import News from '../components/News.vue'
import Render from '../components/Render.vue'
import Vuextest from '../components/Vuextest.vue'
import Vuextest2 from '../components/Vuextest2.vue'

export default {
  routes: [
    { path: '/home', component: Home },
    { path: '/news', component: News },
    { path: '/render', component: Render },
    { path: '/vuextest', component: Vuextest },
    { path: '/vuextest2', component: Vuextest2 }
  ]
}
