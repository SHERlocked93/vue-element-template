import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { userpermission } from './assets/mesjson'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') { // 如果已经有Token了再访问login就跳转
      next({ path: '/' })
    } else {
      if (store.getters.addRouters.length === 0) {
        store.dispatch('GenerateRoutes', userpermission).then(() => {
          console.log(store.getters.addRouters, '-------------- addRouters')
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next(to.path)                      // 重新导航一遍，确保已经addRoutes完毕
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else next()
    }
  } else {
    if (whiteList.includes(to.path)) { // 如果不重定向白名单里没有这个path
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => NProgress.done())

router.onError(err => console.log(`路由导航出错： ${err}`))
