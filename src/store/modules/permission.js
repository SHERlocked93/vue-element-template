import { asyncRouterMap, constantRouterMap } from '@/router/index'
import { filterAsyncRouter } from 'utils/auth'
import * as Roles from 'api/user/role'

const webMenuTree = { type: 'WEB' }
const hmiMenuTree = { type: 'HMI' }
const appMenuTree = { type: 'APP' }

const permission = {
  state: {
    routers: constantRouterMap,         // 当前路由
    addRouters: [],                     // 后来增加的路由数组
    webPermission: [],                  // web权限数组
    hmiPermission: [],                  // hmi权限数组
    appPermission: []                   // app权限数组
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers.concat([{ path: '*', redirect: '/404', hidden: true }])
      state.routers = constantRouterMap.concat(routers)
    },
    SET_WEB: (state, perm) => {
      if (!state.webPermission.length) {  // 如果为空
        formateMenuTree(perm)
        state.webPermission.push(...perm)
      } else throw new Error('WEB 权限树非空，请确认是否添加新树')
    },
    SET_HMI: (state, perm) => {
      if (!state.hmiPermission.length) {
        formateMenuTree(perm)
        state.hmiPermission.push(...perm)
      } else throw new Error('HMI 权限树非空，请确认是否添加新树')
    },
    SET_APP: (state, perm) => {
      if (!state.appPermission.length) {
        formateMenuTree(perm)
        state.appPermission.push(...perm)
      } else throw new Error('APP 权限树非空，请确认是否添加新树')
    }
  },
  actions: {
    /**
     * 生成本地路由表
     * @param commit
     * @param data
     * @constructor
     */
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, data)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    
    /**
     * 获取 WEB 权限树
     * @param commit
     * @param state
     * @constructor
     */
    GetWebBaseMenuTree({ commit, state }) {
      return new Promise((resolve, reject) => {
        state.webPermission.length
          ? resolve(state.webPermission)
          : Roles.menuTreeList(webMenuTree, 'WEB').then(res => {
            commit('SET_WEB', res.data)
            resolve(res)
          }).catch(err => reject(err))
      })
    },
    
    /**
     * 获取 HMI 权限树
     * @param commit
     * @param state
     * @param data
     * @constructor
     */
    GetHmiBaseMenuTree({ commit, state }) {
      return new Promise((resolve, reject) => {
        state.hmiPermission.length
          ? resolve(state.hmiPermission)
          : Roles.menuTreeList(hmiMenuTree, 'HMI').then(res => {
            commit('SET_HMI', res.data)
            resolve(res)
          }).catch(err => reject(err))
      })
    },
    
    /**
     * 获取 APP 权限树
     * @param commit
     * @param state
     * @param data
     * @constructor
     */
    GetAppBaseMenuTree({ commit, state }) {
      return new Promise((resolve, reject) => {
        state.appPermission.length
          ? resolve(state.appPermission)
          : Roles.menuTreeList(appMenuTree, 'APP').then(res => {
            commit('SET_APP', res.data)
            resolve(res)
          }).catch(err => reject(err))
      })
    }
  }
}

/**
 * 每个子节点添加上disabled属性以便在tree中控制
 * @param perm 权限data
 */
function formateMenuTree(perm) {
  [...perm].forEach(T => {
    T.disabled = true
    if (T.children) {
      T.children.forEach(T2 => {
        T2.disabled = true
        T2.pnode = T.id
      })
    }
  })
}

export default permission
