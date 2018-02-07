import router from './router'
import store from './store'
import NProgress from 'nprogress'             // Progress 进度条
import { getToken } from 'utils/stock'      // 验权
import { filterAuth } from 'utils/auth'        // 权限过滤
import 'nprogress/nprogress.css'              // Progress 进度条样式

const whiteList = ['/login']                  // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {                                             // 如果已经有 Token
    if (to.path === '/login') {                                 // 还要访问登陆页面
      next({ path: '/' })                                       // 就去Homepage
    } else {                                                    // 如果没有 Token
      if (store.getters.addRouters.length === 0 && to.path !== '/noauth') {   // 初始化时
        store.dispatch('GetWebBaseMenuTree')
          .then(({ data: baseAuth }) => {                                     // 拉取user_info
            store.dispatch('GetUserAuthArray').then(({ data: authIdArray }) => {
              !authIdArray.length
                ? next('/noauth')
                : store.dispatch('GenerateRoutes', filterAuth(baseAuth, authIdArray))
                .then(() => {                                         // 生成可访问的路由表
                  router.addRoutes(store.getters.addRouters)          // 动态添加可访问路由表
                  next(to)                                            // hack方法 确保addRoutes已完成
                }).catch(err => console.error(`路由生成出错！\n${err}`))
            })
          })
          .catch(err => {                                              // 没获取权限则强制登出
            store.dispatch('FedLogOut').then(() => {
              next({ path: '/login' })
            })
            console.error(err, '无权限自动退出 in src/permission.js')
          })
      } else next()
    }
  } else {                                          // 没有 Token 的话
    whiteList.includes(to.path)                     // 如果不在不重定向白名单里就去登陆页面
      ? next()
      : next('/login')
  }
})

router.afterEach(() => {
  NProgress.done()
})
