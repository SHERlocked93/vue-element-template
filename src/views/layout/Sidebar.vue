<!--suppress HtmlUnknownTarget -->
<template>
  <el-menu mode="vertical"
           :default-active="$route.path"
           background-color='#545c64'
           text-color='#bfcbd9'
           active-text-color='#20a0ff'>
    <div class='menu-logo'>
      <img src='~assets/logo.png'/>
    </div>
    <sidebar-item :routes="permission_routers"/>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  
  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'permission_routers'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu {
    min-height: 100%;
    .menu-logo {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      left: -10px;
      & img {
        height: 40px;
      }
    }
  }
</style>
