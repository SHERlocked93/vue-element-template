/**
 * 创建于 2018/1/11
 * 功能: 有关用户的API
 */
import fetch from '@/utils/fetch'

/**
 * 获取条件查询的用户列表, 用户名/姓名/角色名, 空为查询所有用户
 * @param keywords
 * @param page
 * @param rows
 */
export function userQueryList(keywords, page, rows) {
  return fetch({
    url: '/admin/user/list',
    method: 'get',
    params: { keywords, page, rows }
  })
}

/**
 * 查询用户详细信息
 * @param params
 */
export function userInfo(params) {
  return fetch({
    url: '/admin/user/checkuser',
    method: 'get',
    params
  })
}

/**
 * 删除用户
 * @param userId
 */
export function userDelete(userId) {
  return fetch({
    url: '/admin/user/delete',
    method: 'post',
    params: { userId }
  })
}

/**
 * 增加用户
 * @param param
 */
export function userAdd(param) {
  return fetch({
    url: '/admin/user/add',
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

/**
 * 修改用户
 * @param param
 */
export function userEdit(param) {
  return fetch({
    url: '/admin/user/edit',
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

/**
 * 修改用户密码
 * @param param
 */
export function editPwd(param) {
  return fetch({
    url: '/admin/user/passwordedit',
    method: 'post',
    data: param
  })
}

/**
 * 重置密码
 * @param userId
 */
export function userResetPassword(userId) {
  return fetch({
    url: '/admin/user/passwordreset',
    method: 'post',
    data: { userId }
  })
}
