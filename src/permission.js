import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') { // 如果已经有Token了再访问login就跳转
      next({ path: '/' })
    } else {
      store.dispatch('GetInfo').then(res => { // 拉取用户信息
        store.dispatch('GetAuthTree').then(res => { // 拉取用户权限
          store.dispatch('GenerateRoutes', res).then(res => {
            next()
          })
        })
      })
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

router.afterEach(() => {
  NProgress.done()
})
