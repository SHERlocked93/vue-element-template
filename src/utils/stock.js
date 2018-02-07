/**
 * 创建于 2018/1/15
 * 功能: cookie操作封装
 */

import Cookies from 'js-cookie'

const Uid = 'uid'                     // 本地Uid头
const Token = 'Admin-Token'           // 本地Token头
const Namestr = 'userName'            // 本地username头
const Photo = 'photo'                 // 本地photo头
const Realname = 'realName'           // 本地Realname头
const Mobile = 'mobile'               // 本地mobile头

/**
 * cookie.get方法偏函数
 * @returns {Function}
 */
function cookieGet(tar) {
  return function() {
    return Cookies.get(tar)
  }
}

/**
 * cookie.set方法偏函数
 * @param tar set的对象
 * @returns {Function} 接受一个参数
 */
function cookieSet(tar) {
  return function(param) {
    return Cookies.set(tar, param, { expires: 0.3 })
  }
}

/**
 * cookie.remove方法偏函数
 * @returns {Function}
 */
function cookieRemove(tar) {
  return function() {
    return Cookies.remove(tar)
  }
}

export const getToken = cookieGet(Token)
export const setToken = cookieSet(Token)
export const removeToken = cookieRemove(Token)

export const getUid = cookieGet(Uid)
export const setUid = cookieSet(Uid)
export const removeUid = cookieRemove(Uid)

export const getUsername = cookieGet(Namestr)
export const setUsername = cookieSet(Namestr)
export const removeUsername = cookieRemove(Namestr)

export const getPhoto = cookieGet(Photo)
export const setPhoto = cookieSet(Photo)
export const removePhoto = cookieRemove(Photo)

export const getRealname = cookieGet(Realname)
export const setRealname = cookieSet(Realname)
export const removeRealname = cookieRemove(Realname)

export const getMobile = cookieGet(Mobile)
export const setMobile = cookieSet(Mobile)
export const removeMobile = cookieRemove(Mobile)

/**
 * 移除全部cookie
 */
export function removeAll() {
  removeToken()
  removeUid()
  removeUsername()
  removePhoto()
  removeRealname()
  removeMobile()
}
