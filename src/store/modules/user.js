import * as Logins from '@/api/login'
import * as Roles from '@/api/user/role'
import * as Local from '@/utils/stock'

const user = {
  state: {
    uid: Local.getUid(),
    token: Local.getToken(),                             // 用户token
    username: Local.getUsername(),                       // 用户名
    photo: Local.getPhoto(),                             // 用户头像链接
    realname: Local.getRealname(),                       // 用户中文名
    mobile: Local.getMobile()                            // 用户手机号
  },
  
  mutations: {
    SET_TOKEN: (state, token) => {
      Local.setToken(token)
      state.token = token
    },
    SET_NAME: (state, username) => {
      Local.setUsername(username)
      state.username = username
    },
    SET_UID: (state, uid) => {
      Local.setUid(uid)
      state.uid = uid
    },
    SET_PHOTO: (state, photo) => {
      Local.setPhoto(photo)
      state.photo = photo
    },
    SET_REALNAME: (state, realname) => {
      Local.setRealname(realname)
      state.realname = realname
    },
    SET_MOBILE: (state, mobile) => {
      Local.setMobile(mobile)
      state.mobile = mobile
    }
  },
  
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.userName
      return new Promise((resolve, reject) => {
        Logins.login(username, userInfo.password, 'WEB').then(response => {
          // 登陆成功后token和name放在cookie里刷新页面仍然可以拿到，放在state里组件间共享
          const respdata = response
          commit('SET_TOKEN', respdata.token)
          commit('SET_NAME', respdata.data.userName)
          commit('SET_UID', respdata.data.id)
          commit('SET_PHOTO', respdata.data.photo)
          commit('SET_REALNAME', respdata.data.realName)
          commit('SET_MOBILE', respdata.data.mobile)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // 获取用户权限数组
    GetUserAuthArray({ commit, state }) {
      return new Promise((resolve, reject) => {
        Roles.getUserAuthArray(state.uid)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    
    // 修改用户信息
    EditUserInfo({ commit }, userInfo) {
      commit('SET_REALNAME', userInfo.realName)
      commit('SET_MOBILE', userInfo.mobile)
    },
    
    // 修改用户头像
    ChangePhoto({ commit }, photoUrl) {
      commit('SET_PHOTO', photoUrl)
    },
    
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        Logins.logout(state.token).then(resp => {
          if (resp.token) {
            commit('SET_TOKEN', '')
            commit('SET_NAME', '')
            commit('SET_UID', '')
            commit('SET_PHOTO', '')
            commit('SET_REALNAME', '')
            commit('SET_MOBILE', '')
            Local.removeAll()
          }
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
        commit('SET_UID', '')
        commit('SET_PHOTO', '')
        commit('SET_REALNAME', '')
        commit('SET_MOBILE', '')
        Local.removeAll()
        resolve()
      })
    }
  }
}

export default user
