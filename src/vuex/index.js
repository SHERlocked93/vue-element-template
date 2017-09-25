import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const moduleA = {
  state: { msg: 'msg in moduleA' }
}

const moduleBA = {
  state: { msg: 'msg in module BA' }
}

const moduleBB = {
  state: { msg: 'msg in module BB' }
}

const moduleB = {
  state: { msg: 'msg in moduleB' },
  modules: { ba: moduleBA, bb: moduleBB },
  actions: {
    incrementIfOdd({ state, commit, rootState }) {
      console.log(state)
      console.log(commit)
      console.log(rootState)
      console.log(rootState === state)
      console.log('this in modulB')
    }
  }
}

const store = new Vuex.Store({
  state: { count: 0, msg: 'msg in store' },
  modules: { a: moduleA, b: moduleB },
  mutations: {
    increment: d => d.count++,
    decrement: d => d.count--
  },
  actions: {
    incrementIfOdd({ state, commit, rootState }) {
      console.log(state)
      console.log(commit)
      console.log(rootState)
      console.log(rootState === state)
      console.log('this in store')
    }
  }
})

export default store
