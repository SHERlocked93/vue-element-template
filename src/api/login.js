/**
 * 封装 axios 请求
 */
import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: '/user/nameLogin',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}

export function getAuthTree() {
  return fetch({
    url: '/authtree',
    method: 'get'
  })
}
