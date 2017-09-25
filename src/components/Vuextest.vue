<template>
  <div>
    <p>{{msg}}</p>
    
    <p>
      <button @click="calli">increment</button>
      <button @click="calld">decrement</button>
      <input title="1" :value="val">
    </p>
    
    <p>
      <button @click="callii">increment</button>
      <button @click="calldd">decrement</button>
      <input title="1" :value="value">
    </p>
    
    <button @click="dispatch">dispatch</button>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import Vue from 'vue'
  import store from '../vuex'
  
  Vue.use(Vuex)
  
  const local_store = new Vuex.Store({
    state: { count: 0 },
    mutations: {
      increment: d => d.count++,
      decrement: d => d.count--
    }
  })
  
  export default {
    store,
    data() {
      return {
        msg: 'hello vuex'
      }
    },
    computed: {
      val: () => local_store.state.count,
      value() { return this.$store.state.count }
    },
    methods: {
      calli: () => local_store.commit('increment'),
      calld: () => local_store.commit('decrement'),
      callii() { return this.$store.commit('increment') },
      calldd() { return this.$store.commit('decrement') },
      dispatch() {
        return this.$store.dispatch('incrementIfOdd')
      }
    }
  }
</script>

<style>

</style>
