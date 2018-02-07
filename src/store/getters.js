const getters = {
  // 用户信息
  uid: state => state.user.uid,
  photo: state => state.user.photo,
  token: state => state.user.token,
  mobile: state => state.user.mobile,
  username: state => state.user.username,
  realname: state => state.user.realname,
  
  // 权限信息
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,
  permission_web: state => state.permission.webPermission,
  permission_hmi: state => state.permission.hmiPermission,
  permission_app: state => state.permission.appPermission,
  
  // 应用信息
  sidebar: state => state.app.sidebar
}
export default getters
