import fetch from '@/utils/fetch'

export function login(userName, password, type) {
  return fetch({
    url: '/admin/user/namelogin',
    method: 'post',
    data: {
      userName,
      password,
      type
    }
  })
}

export function logout(userName) {
  return fetch({
    url: '/admin/user/logout',
    method: 'post'
  })
}
