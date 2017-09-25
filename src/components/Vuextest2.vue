<template>
  <div>
    <p>{{msg}}</p>
    
    <button @click="calli">increment</button>
    <button @click="calld">decrement</button>
    <input title="1" :value="val">
  </div>
</template>

<script>
  import store from '../vuex'
  
  export default {
    store,
    data() { return { msg: 'vuextest2' } },
    computed: {
      val() { return this.$store.state.count }
    },
    methods: {
      calli() { this.$store.commit('increment') },
      calld() { this.$store.commit('decrement') }
    }
  }
</script>

<style>

</style>
