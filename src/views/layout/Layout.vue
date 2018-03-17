<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar}">
    <div class="sidebar-wrapper">
      <sidebar class="sidebar-container"></sidebar>
    </div>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>


<script>
  import Navbar from './Navbar'
  import Sidebar from './Sidebar'
  import AppMain from './AppMain'
  
  export default {
    name: 'Layout',
    components: { Navbar, Sidebar, AppMain },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin.scss";
  
  /* 全屏容器，app下的 */
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    
    /* 侧边栏-隐藏 */
    &.hideSidebar {
      .sidebar-wrapper {
        transform: translate(-150px, 0);
        .sidebar-container {
          transform: translate(143px, 0);
        }
        &:hover {
          transform: translate(0, 0);
          .sidebar-container {
            transform: translate(0, 0);
          }
        }
      }
      .main-container {
        margin-left: 40px;
        .navbar {
          padding-left: 40px;
        }
      }
    }
    
    /* 侧边栏 */
    .sidebar-wrapper {
      width: 198px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      transition: all .28s ease;
      /* 侧边sidebar */
      .sidebar-container {
        transition: all .28s ease;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    
    .main-container {
      min-height: 100%;
      transition: all .32s ease-in-out;
      margin-left: 198px;
      .navbar {
        padding-left: 198px;
      }
    }
  }
</style>
