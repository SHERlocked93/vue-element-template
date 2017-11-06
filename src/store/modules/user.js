import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken, getName, setName, removeName } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: getName()
    
  },
  
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    }
  },
  
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // 登陆成功后token和name放在session里刷新页面仍然可以拿到，放在state里组件间共享
          const respdata = response
          setToken(respdata.token)
          setName(respdata.data.userName)
          commit('SET_TOKEN', respdata.token)
          commit('SET_NAME', respdata.data.userName)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          removeToken()
          removeName()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        removeToken()
        removeName()
        resolve()
      })
    }
  }
}

export default user
