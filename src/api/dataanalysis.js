/**
 * Created by qianyu on 2017/10/31
 */
import fetch from '@/utils/fetch'

/**
 * 首页获取工单进度
 */
export function orderRate() {
  return fetch({
    url: '/homepage/orderrate'
  })
}

/**
 * 首页获取警报
 * @param rows
 * @param page
 * @param queryFuzzy:模糊访问
 */
export function alarmInfo(queryFuzzy = '', page = 1, rows = 15) {
  return fetch({
    url: '/homepage/alarminfo',
    params: { rows, page, queryFuzzy }
  })
}

/**
 * 首页的oee分析模块
 * @param timeSpan:时间间隔
 */
export function oeeAnalyze(timeSpan = 7) {
  return fetch({
    url: '/homepage/oeeanalyze',
    params: { timeSpan }
  })
}

/**
 * 数据分析模块-获取机台列表
 */
export function getEqpList() {
  return fetch({
    url: '/dataaly/equiplist'
  })
}

/**
 * 数据分析-OEE分析-获取OEE分析表
 * @param timeSpan 时间间隔
 * @param rows 行数
 * @param page 页码
 */
export function getOeeTable(timeSpan = 7, rows = '10', page = '1') {
  return fetch({
    url: '/dataaly/oeealytable',
    params: { timeSpan, rows, page }
  })
}

/**
 * 数据分析-OEE分析-获取单个设备OEE分析表
 * @param timeSpan 时间间隔
 * @param rows 行数
 * @param page 页码
 */
export function getSingleOeeTable(timeSpan = 7, rows = '10', page = '1') {
  return fetch({
    url: '/dataaly/singleoeealytable',
    params: { timeSpan, rows, page }
  })
}

/**
 * 数据分析-OEE分析-获取OEE排行榜
 */
export function oeeRankList(timeSpan = 7) {
  return fetch({
    url: '/oeealy/oeeranklist',
    params: { timeSpan }
  })
}

/**
 * 数据分析-质量分析
 * @param timeSpan
 * @param rows
 * @param page
 */
export function qualityAnalyze(timeSpan = 7, rows = '10', page = '1') {
  return fetch({
    url: '/dataaly/qualityaly',
    params: { timeSpan }
  })
}

/**
 * 数据分析-单品质量分析
 * @param timeSpan
 * @param rows
 * @param page
 */
export function singleQualityAnalyze(timeSpan = 7, rows = '10', page = '1') {
  return fetch({
    url: '/dataaly/singleproduct',
    params: { timeSpan }
  })
}

/**
 * 首页确认警报
 * @param alarmId 警报ID
 */
export function confirmAlarm(alarmId = '') {
  return fetch({
    url: '/dataaly/singleproduct',
    params: { alarmId }
  })
}
