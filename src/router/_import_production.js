module.exports = file => () => import('@/views/' + file + '.vue') // 懒加载
