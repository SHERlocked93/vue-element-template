<template>
  <div>
    权限配置2  -> {{$attrs}}
    <button v-show='authDelete'>delete</button>
    <button v-show='authAdd'>add</button>
  
    
    
    
  </div>
</template>

<script type='text/javascript'>
  export default {
    props: {
      authDelete: {
        type: Boolean,
        default: true
      },
      authAdd: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
