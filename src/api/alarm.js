/**
 * 创建于 2018/1/29
 * 功能: HMI相关api
 */

import fetch from '@/utils/fetch'
import store from 'store'

/**
 * 查询警报数据
 * @param keywords 内容关键字   非必填
 * @param isClose 是否关闭   0-未关闭 1-关闭  非必填
 * @param page 页数
 * @param rows 条数
 */
export function alarmInfo(keywords = null, isClose = null, page = 1, rows = 10) {
  return fetch({
    url: '/alarm-message/list-by-page',
    method: 'get',
    params: { keywords, isClose, page, rows }
  })
}

/**
 * 警报关闭
 * @param id 警报ID
 * @param closeUserId 关闭人ID
 * @param closeUserName 关闭人姓名
 * @returns {*} promise
 */
export function alarmClose(id,
                           closeUserId = store.getters.uid,
                           closeUserName = store.getters.realname) {
  return fetch({
    url: '/alarm-message/close',
    method: 'post',
    data: { id, closeUserId, closeUserName }
  })
}
