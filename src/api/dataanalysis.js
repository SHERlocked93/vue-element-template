/**
 * Created by qianyu on 2017/10/31
 */
import fetch from '@/utils/fetch'

/**
 * 数据分析模块-获取设备列表
 */
export function getEqpList() {
  return fetch({
    url: '/dataaly/eqplist'
  })
}

/**
 * 数据分析-OEE分析-获取OEE分析表
 * @param rows:行数
 * @param page:页码
 */
export function getOeeTable(rows = '1', page = '1') {
  return fetch({
    url: '/dataaly/getoeealytable',
    params: { rows, page }
  })
}
