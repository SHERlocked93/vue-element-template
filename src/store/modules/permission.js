/* eslint-disable */
import { constantRouterMap } from '@/router/index'

// todo 合并权限树

const permission = {
  state: {
    routers: constantRouterMap
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    }
  },
  actions: {
    GenerateRoutes({ commit }, { data }) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', constantRouterMap)
        // commit('SET_ROUTERS', routerConcat(data, constantRouterMap))
        routerConcat(data, constantRouterMap)
        resolve()
      })
    }
  }
}

function routerConcat(data, constantData) {
  if (data instanceof Array) {
    data.forEach((currValue, index, array) => {
      let sameItem = constantData.filter(item => item.path === currValue.path)
      objConcat(currValue,sameItem)
    })
  } else alert("authTree not array")
}


function objConcat(obj, tar) {
  if (obj instanceof Object) {
    for (let property in obj) {
      if (tar.hasOwnProperty(property)) {
        tar[property] = obj[property]
      }
    }
  }
}

export default permission
