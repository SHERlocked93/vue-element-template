/**
 * DllPlugin的配置文件
 * 需要打包的第三方包放在entry->vender下
 * Created by SHERlocked on 2017/10/11
 */
const path = require('path')
const webpack = require('webpack')
const config = require('../config')

module.exports = {
  entry: {
    vendor: [
      'vue-router',
      'vuex',
      'vue',
      'vue/dist/vue.common.js',
      'vue/dist/vue.js',
      'axios',
      'echarts',
      'element-ui',
      'mockjs'
    ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(config.build.assetsRoot, '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
