const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  authTree: state => state.user.authTree,
  permission_routers: state => state.permission.routers
}
export default getters
