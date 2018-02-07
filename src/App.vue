<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  export default {
    name: 'app',
    mounted() {
      Vue.config.errorHandler = (err, vm, info) => {
        this.$notify.error({
          title: '捕获全局ERROR',
          dangerouslyUseHTMLString: true,
          duration: 6000,
          message: `<strong>${err}</strong><p>${info}</p>`
        })
      }
    }
  }
</script>

<style>
</style>
