import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/**
 * icon : the icon class show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` 则没有子菜单
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('Login/index'), hidden: true },
  { path: '/404', component: _import('404/index'), hidden: true },
  { path: '/noauth', component: _import('NoAuth/index'), hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: 'homepage',
    icon: 'el-icon-my-shouye',
    name: 'Home',
    noDropdown: true,
    children: [{ name: '首页', path: 'homepage', component: _import('Homepage/index') }]
  },
  {
    path: '/page1',
    component: Layout,
    redirect: 'userinfo',
    name: 'Page1',
    icon: 'el-icon-my-icon-admin',
    children: [
      { name: 'hehe', path: 'hehe', component: _import('Page1/Hehe') }
    ]
  },
  {
    path: '/sysconfig',
    component: Layout,
    redirect: 'userinfo',
    name: '系统配置',
    icon: 'el-icon-my-icon-admin',
    children: [
      { name: '我的信息', path: 'userinfo', component: _import('SysConfig/UserInfo') },
      { name: '修改密码', path: 'modifypassword', component: _import('SysConfig/ModifyPassword') },
      { name: '角色管理', path: 'rolemanage', component: _import('SysConfig/RoleManage') },
      { name: '用户管理', path: 'usermanage', component: _import('SysConfig/UserManage') }
    ]
  }
]
