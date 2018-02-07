<template>
  <div>
    <h1>没权限呐！</h1>
    <el-button @click='clearCookie'>清一下缓存~</el-button>
  </div>
</template>

<script type='text/javascript'>
  import Cookies from 'js-cookie'
  
  export default {
    name: 'NoAuth',
    data() {
      return {}
    },
    methods: {
      /**
       * 清空cookie
       */
      clearCookie() {
        const keys = document.cookie.match(/[^ =;]+(?==)/g)
        if (keys) {
          for (const i of keys) {
            Cookies.remove(i)
          }
        }
      }
      
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
