/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import Homepage from '@/views/homepage.vue'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: _import('login'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/homepage',
    name: '首页',
    icon: 'zujian',
    hidden: false,
    noDropdown: true,
    children: [{ path: 'homepage', icon: 'zujian', component: _import('homepage'), name: '首页' }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    name: '用户',
    icon: 'zujian',
    noDropdown: true,
    children: [
      { path: 'info', name: '用户信息', icon: 'zujian', component: _import('userInfo'), props: { authDelete: false } }
    ]
  },
  {
    path: '/auth',
    component: Layout,
    name: '权限',
    redirect: '/auth/authconfig',
    icon: 'zujian',
    children: [
      { path: 'authconfig', name: '权限配置', icon: 'zujian', component: _import('authConfig'), props: { authDelete: false, authAdd: true } },
      { path: 'authdisplay', name: '当前权限', icon: 'zujian', component: _import('authState'), props: { authDelete: true, authAdd: false } }
    ]
  },
  {
    path: '/dataanalysis',
    component: Layout,
    name: '数据分析',
    redirect: '/dataanalysis/oeeanalysis',
    icon: 'zujian',
    children: [
      { path: 'oeeanalysis', name: 'OEE分析', icon: 'zujian', component: _import('oeeanalysis') },
      { path: 'qualityanalysis', name: '质量分析', icon: 'zujian', component: _import('qualityanalysis') }
    ]
  }
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = []
