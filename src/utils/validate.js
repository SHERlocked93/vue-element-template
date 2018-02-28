/**
 * 创建于 2018/1/15
 * 功能: 验证工具封装
 */

/**
 * 合法uri
 * @param textval
 * @returns {boolean}
 */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/**
 * 小写字母
 * @param str
 * @returns {boolean}
 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 大写字母
 * @param str
 * @returns {boolean}
 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 大小写字母
 * @param str
 * @returns {boolean}
 */
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 大小写字母或数字
 * @param str
 * @returns {boolean}
 */
export function validateAlphabetsAndNum(str) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}

/**
 * 汉字、字母和数字
 * @param str
 * @returns {boolean}
 */
export function validateSpercialWords(str) {
  const reg = /^[\u9fa5a-zA-Z\d]+$/
  return reg.test(str)
}

/**
 * 按钮权限 -> 页面权限
 * 数字截取 6位数字  中间2位和后两位都不能为00  若满足返回后两位替换为00
 * @param num 数字
 */
export function num3To2(num) {
  const reg = /^((?:[1-9]\d){2})[1-9]\d$/
  return reg.test(num) && reg.exec(num)[1] * 100
}

/**
 * 页面权限 -> 模块权限
 * 数字截取 6位数字 前面2个两位都不能为00 后2位必须为0 若满足返回中间两位替换为00
 * @param num 数字
 */
export function num2To1(num) {
  const reg = /^([1-9]\d)[1-9]\d0{2}$/
  return reg.test(num) && reg.exec(num)[1] * 10000
}

/**
 * 密码校验 由6-16位字母、数字组成
 * @param str
 * @returns {boolean}
 */
export function validatePassword(str) {
  const reg = /^[\u9fa5a-zA-Z\d]{6,16}$/
  return reg.test(str)
}

/**
 * 姓名校验 由2-4位汉字组成
 * @param str
 * @returns {boolean}
 */
export function validateName(str) {
  const reg = /^[\u4E00-\u9FA5]{2,4}$/
  return reg.test(str)
}

/**
 * 手机号校验 由11位数字组成
 * @param str
 * @returns {boolean}
 */
export function validateMobile(str) {
  const reg = /^[1][0-9]{10}$/
  return reg.test(str)
}

/**
 * 角色名称校验 由2-9位字母、数字、汉字组成
 * @param str
 * @returns {boolean}
 */
export function validateRoleName(str) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z\d]{2,9}$/
  return reg.test(str)
}

/**
 * 用户名称校验 由1-12位字母、数字、汉字组成
 * @param str
 * @returns {boolean}
 */
export function validateUserName(str) {
  const reg = /^[0-9a-zA-Z\d]{1,12}$/
  return reg.test(str)
}

/**
 * 工序简称校验 由1-2位字符组成
 * @param str
 * @returns {boolean}
 */
export function validateProcedureShortname(str) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z]{1,2}$/
  return reg.test(str)
}
