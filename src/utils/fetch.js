/**
 * 创建于 2018/1/15
 * 功能: axios封装
 */

import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/stock'
import { parseTime } from './index'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,  // api的base_url
  timeout: 5000                  // 请求超时时间改成了5s
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = getToken()                // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  config.data = handleData(config.data)                 // 拦截是''的查询条件并删除,处理时间格式化
  config.params = handleData(config.params)             // 拦截是''的查询条件并删除，处理时间格式化
  if (config.method.toLowerCase() === 'get') {          // 解决IE下ajax请求发送不出去的问题
    config.params = config.params || {}
    config.params.forStupidIE = +new Date()
  }
  
  return config
}, error => {
  console.err(error, ' in fetch.js') // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // code为非20000是抛错 可结合自己业务进行修改
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()       // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    // console.log('err' + error)// for debug
    // 因为后台没有作OPTIONS请求判断，导致这边的error.response为空，无法判断具体http的status来决定message的报错信息
    // 此时的error.message都是'net error'
    error.message = '网络通讯异常，请检查！'
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

function handleData(data) {
  if (data === undefined) return data
  if (data instanceof Array) return data
  if (data instanceof FormData) return data
  
  const result = {}
  for (const key of Object.keys(data)) {
    if (data[key] !== '' || key === 'defaultInfo') {
      if (data[key] instanceof Date) {
        result[key] = parseTime(data[key])
      } else result[key] = data[key]
    }
  }
  return result
}

export default service
