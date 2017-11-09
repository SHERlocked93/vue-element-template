import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: _import('login'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/homepage',
    icon: 'zujian',
    hidden: false,
    noDropdown: true,
    children: [{ path: 'homepage', icon: 'zujian', component: _import('homepage'), name: '首页' }]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
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
      { path: 'oee', name: 'OEE分析', icon: 'zujian', component: _import('oeeAnalysis') },
      { path: 'oeerank', name: 'OEE排行榜', icon: 'zujian', component: _import('oeeRankList') },
      { path: 'quality', name: '质量分析', icon: 'zujian', component: _import('qualityAnalysis') },
      { path: 'qualitysingle', name: ' 单品质量分析', icon: 'zujian', component: _import('qualityAnalysisSingle') }
    ]
  },
  {
    path: '/chart',
    component: Layout,
    name: '图表信息',
    redirect: '/chart/bar',
    icon: 'zujian',
    children: [
      { path: 'bar', name: '柱形图', icon: 'zujian', component: _import('chart/bar') },
      { path: 'line', name: '折线图', icon: 'zujian', component: _import('chart/line') },
      { path: 'chart1', name: '图表1', icon: 'zujian', component: _import('chart/chart1') },
      { path: 'chart2', name: '图表2', icon: 'zujian', component: _import('chart/chart2') }
    ]
  }
]
