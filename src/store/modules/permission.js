import { asyncRouterMap, constantRouterMap } from '@/router/index'

/**
 * 根据 route 的 path 从permission中递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 需要权限控制的模块
 * @param permission 权限配置
 */
function filterAsyncRouter(asyncRouterMap, permission) {
  return asyncRouterMap.filter((route, index, array) => {
    const routePermission = permission.filter((perm) => route.path === perm.path)[0]
    if (routePermission.show) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, routePermission.children)
      }
      if (routePermission.props) {
        route.props = routePermission.props
      }
      return true
    } else return false
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers.concat(
        [{ path: '*', redirect: '/404', hidden: true }]
      )
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, data)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
