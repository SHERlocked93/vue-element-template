import fetch from '@/utils/fetch'

// 获取条件查询的角色列表, roleName传空字符串或者null返回所有
export function roleList(roleName, type, page, rows) {
  return fetch({
    url: '/admin/role/list',
    method: 'get',
    params: {
      roleName, type, page, rows
    }
  })
}

// 删除角色
export function roleDelete(userId) {
  return fetch({
    url: '/admin/role/delete',
    method: 'get',
    params: { userId }
  })
}

// 新增角色
export function roleAdd(params) {
  return fetch({
    url: '/admin/role/add',
    method: 'post',
    data: params
  })
}

// 修改角色
export function roleEdit(params) {
  return fetch({
    url: '/admin/role/edit',
    method: 'post',
    data: params
  })
}

// 获取基本权限树,param: type=WEB/APP/HMI
export function menuTreeList(params) {
  return fetch({
    url: '/admin/menu/getbasemenutree',
    method: 'get',
    params
  })
}

// 根据角色id获取角色权限数组
export function getMenubyRole(roleId) {
  return fetch({
    url: '/admin/menu/getmenuarraybyrole',
    method: 'get',
    params: { roleId }
  })
}

// 根据用户名获取权限数组
export function getUserAuthArray(userId, type = 'WEB') {
  return fetch({
    url: '/admin/menu/getmenuarraybyuser',
    method: 'get',
    params: { userId, type }
  })
}
