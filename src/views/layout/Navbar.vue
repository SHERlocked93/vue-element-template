/**
* 创建于 2018/2/6
* 作者: SHERlocked93
* 功能: 标题栏
*/


<!--suppress HtmlUnknownTarget, JSIgnoredPromiseFromCall -->
<template>
  <div class="navbar">
    <div class='navb-state'>
      <hamberger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar"></hamberger>
      
      <levelbar class='navb-expl'/>
    </div>
    
    <!--导航栏右侧信息区-->
    <div class="navbar-content">
      <!--消息-->
      <el-badge :value="12" :max='99'>
        <i class='el-icon-my-lingdang navb-message'></i>
      </el-badge>
      
      <!--用户名信息-->
      <el-dropdown class='navb-dropdown'>
        <div class="navb-dropdown-content">
          <img :src='photo' alt='' class='navb-dropdown-photo'>
          <span class='navb-username'>{{username}}</span>
          <i class="el-icon-caret-bottom navb-caret"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link class='inlineBlock' to="/sysconfig/userinfo">
            <el-dropdown-item>
              我的信息
            </el-dropdown-item>
          </router-link>
          <router-link class='inlineBlock' to="/sysconfig/modifypassword">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
      
      <!--注销用户-->
      <el-tooltip class="navb-quit" content="注销用户" placement="bottom-end">
        <a @click="logout"><i class="el-icon-my-quit"></i></a>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Levelbar from './Levelbar'
  import Hamberger from 'components/Hamburger'
  
  export default {
    name: 'Navbar',
    components: { Levelbar, Hamberger },
    computed: {
      ...mapGetters([
        'username',
        'photo',
        'sidebar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => location.reload())                // 为了重新实例化vue-router对象 避免bug
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    min-width: 600px;
    line-height: 50px;
    color: #000;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.10);
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    /* 导航栏左侧 */
    .navb-state {
      height: 50px;
      display: flex;
      align-items: center;
      margin-left: 15px;
      
      .hamburger-container {
        line-height: 50px;
        height: 50px;
        padding: 0 10px;
      }
      
      .navb-expl {
        font-size: 16px;
        margin-top: -2px;
      }
    }
    
    /* 导航栏右侧信息区 */
    .navbar-content {
      margin-right: 40px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      
      /* 消息铃铛 */
      .el-badge {
        margin-right: 20px;
        .navb-message {
          font-size: 21px;
          margin-right: 23px;
          cursor: pointer;
        }
        
        & /deep/ .el-badge__content.is-fixed {
          position: absolute;
          top: 36px;
          right: 30px;
        }
      }
      
      /* 用户名信息 */
      .navb-dropdown {
        margin-right: 28px;
        cursor: pointer;
        .navb-dropdown-content {
          height: 50px;
          display: flex;
          align-items: center;
          .navb-dropdown-photo {
            width: 30px;
            height: 30px;
            border-radius: 2px;
            margin-right: 4px;
          }
          
          .navb-username {
            font-size: 16px;
            margin-right: 3px;
          }
        }
      }
      
      /* 退出登录 */
      .navb-quit {
        margin-right: 5px;
        font-size: 18px;
      }
    }
  }
</style>

