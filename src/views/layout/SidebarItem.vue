<template>
  <div>
    <template v-for="item in routes">
      
      <!--无下拉菜单-->
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path === '/' ?item.path+item.children[0].path:item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path === '/' ? item.path+item.children[0].path : item.path+'/'+item.children[0].path">
          <i v-if='item.icon' :class="item.icon"></i>
          <span class='subtitle'>{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>
      
      <!--有下拉菜单-->
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <i v-if='item.icon' :class="item.icon"></i>
          <span class='subtitle'>{{item.name}}</span>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'/>
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <span class='subtitle sub-subtitle'>{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    
    
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .subtitle {
    font-size: 16px;
    margin-left: 4px;
  }
  
  .sub-subtitle {
    margin-left: 20px;
  }
  
  .hide-sidebar .menu-indent {
    display: block;
    text-indent: 10px;
  }
</style>

