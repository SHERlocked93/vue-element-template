<template>
  <el-breadcrumb class="app-levelbar" separator="/" v-if='currentRoute.path!=="/homepage"'>
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <!--二级页面或者无跳转的页面-->
      <router-link v-if='item.redirect==="noredirect"||index===levelList.length-1' to="" class="app-no-redirect">{{item.name}}</router-link>
      <router-link v-else :to="item.redirect||item.path" class='app-can-redirect'>{{item.name}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: 'Levelbar',
    created() {
      this.getBreadcrumb()
    },
    data() {
      return {
        levelList: null
      }
    },
    computed: {
      currentRoute() {
        return this.levelList && this.levelList.slice(-1)[0]
      }
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        
        if (first && (first.name !== '首页' || first.path !== '')) {
          matched = [{ name: '首页', path: '/' }].concat(matched)
        }
        this.levelList = matched
        
        // this.levelList = this.$route.matched.filter(item => item.name)
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-levelbar {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .app-no-redirect {
      color: #97a8be;
      cursor: text;
    }
    .app-can-redirect {
      color: #1395df;
      &:hover {
        color: #47b1ed;
      }
    }
  }
</style>
