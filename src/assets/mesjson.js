export const userpermission = [
  {
    path: '/user',
    show: true,
    children: [
      { path: 'info', name: '用户信息', show: true },
    ]
  },
  {
    path: '/auth',
    show: true,
    children: [
      { path: 'authconfig', name: '权限配置', show: true },
      { path: 'authdisplay', name: '当前权限', show: true }
    ]
  },
  {
    path: '/dataanalysis',
    name: '数据分析',
    show: true,
    children: [
      {
        path: 'oee',
        name: 'OEE分析',
        show: true,
        props: {}
      }, {
        path: 'oeerank',
        name: 'OEE排行榜',
        show: true,
        props: {}
      }, {
        path: 'quality',
        name: '质量分析',
        show: true,
        props: {}
      }, {
        path: 'qualitysingle',
        name: '单品质量分析',
        show: true,
        props: {}
      }]
  }
]
