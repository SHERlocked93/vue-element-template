import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: !+Cookies.get('sidebarStatus')
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar = !state.sidebar
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
